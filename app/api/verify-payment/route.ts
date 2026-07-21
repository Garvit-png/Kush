import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_email,  // passed from frontend after login
      course_id,
    } = await req.json();

    // 1. Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2. Save purchase to Supabase
    const { error } = await supabaseAdmin
      .from("purchases")
      .upsert({
        user_email,
        course_id: course_id || "aesthetic-mastery",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        purchased_at: new Date().toISOString(),
      }, {
        onConflict: "user_email,course_id", // prevent duplicate rows
      });

    if (error) {
      console.error("Supabase insert error:", error);
      // Payment was valid — don't block user even if DB write fails
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
