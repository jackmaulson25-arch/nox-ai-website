import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Get or create Stripe customer
  let customerId: string;
  const { data: existing } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (existing?.stripe_customer_id) {
    customerId = existing.stripe_customer_id;
  } else {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${request.headers.get("origin")}/dashboard/billing?success=true`,
    cancel_url: `${request.headers.get("origin")}/dashboard/billing?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
