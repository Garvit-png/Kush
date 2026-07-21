import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Called on page load — checks if logged-in user has purchased the course
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const courseId = searchParams.get("course_id") || "aesthetic-mastery";

  if (!email) {
    return NextResponse.json({ hasPurchased: false });
  }

  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("user_email", email)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error) {
    console.error("Supabase check-access error:", error);
    return NextResponse.json({ hasPurchased: false });
  }

  return NextResponse.json({ hasPurchased: !!data });
}
