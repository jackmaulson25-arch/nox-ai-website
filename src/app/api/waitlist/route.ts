import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const supabase = await createClient();

  // Store in Supabase
  const { error } = await supabase.from("waitlist").insert({ email, source: "website" });

  if (error && error.code !== "23505") { // 23505 = duplicate
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "You're on the list!" });
}
