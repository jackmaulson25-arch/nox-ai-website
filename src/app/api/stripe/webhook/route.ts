import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" as any });
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: getStripe().Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as getStripe().Checkout.Session;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      // Find user by Stripe customer ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (profile) {
        // Get subscription details
        const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        // Map price to tier
        const tierMap: Record<string, string> = {
          price_standard: "standard",
          price_pro: "pro",
          price_max: "max",
        };

        const item = subscription.items.data[0];
        await supabase.from("user_subscriptions").upsert({
          user_id: profile.id,
          tier_slug: tierMap[priceId] || "standard",
          stripe_subscription_id: subscriptionId,
          status: "active",
          current_period_start: new Date(item.current_period_start * 1000).toISOString(),
          current_period_end: new Date(item.current_period_end * 1000).toISOString(),
        });
      }
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as getStripe().Subscription;
      await supabase
        .from("user_subscriptions")
        .update({ status: subscription.status })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as getStripe().Subscription;
      await supabase
        .from("user_subscriptions")
        .update({ status: "cancelled" })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
