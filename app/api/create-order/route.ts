import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {
  // Lazy init — Razorpay only instantiated at request time, not module load
  // This prevents build errors when env vars are not yet set
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local" },
      { status: 500 }
    );
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: 199900, // ₹1,999 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseId: "aesthetic-mastery",
        courseName: "Aesthetic Mastery",
      },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
