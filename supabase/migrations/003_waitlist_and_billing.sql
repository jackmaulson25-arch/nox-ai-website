-- Waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Add stripe_customer_id to profiles if not exists
DO $$ BEGIN
    ALTER TABLE public.profiles ADD COLUMN stripe_customer_id TEXT;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;

-- Add subscription tier tracking
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier_slug TEXT NOT NULL DEFAULT 'free_trial',
    stripe_subscription_id TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_subs_user ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subs_status ON public.user_subscriptions(status);
