-- Power Node: distributed compute network
CREATE TABLE IF NOT EXISTS public.power_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    node_name TEXT,
    status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'suspended')),
    cpu_cores INTEGER DEFAULT 0,
    ram_gb DECIMAL(5,1) DEFAULT 0,
    gpu_model TEXT,
    total_compute_hours DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_tasks_processed INTEGER NOT NULL DEFAULT 0,
    uptime_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
    contribution_score INTEGER NOT NULL DEFAULT 0,
    is_founder BOOLEAN NOT NULL DEFAULT FALSE,
    founder_tier TEXT CHECK (founder_tier IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_power_nodes_user ON public.power_nodes(user_id);
CREATE INDEX idx_power_nodes_status ON public.power_nodes(status);
CREATE INDEX idx_power_nodes_score ON public.power_nodes(contribution_score DESC);

-- Leaderboard profiles (opt-in public profile)
CREATE TABLE IF NOT EXISTS public.leaderboard_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    story TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    total_contributions INTEGER NOT NULL DEFAULT 0,
    rank_title TEXT DEFAULT 'Newcomer',
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leaderboard_contributions ON public.leaderboard_profiles(total_contributions DESC);
CREATE INDEX idx_leaderboard_public ON public.leaderboard_profiles(is_public) WHERE is_public = TRUE;

-- Compute job log
CREATE TABLE IF NOT EXISTS public.compute_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES public.power_nodes(id) ON DELETE CASCADE,
    job_type TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    tokens_processed INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    reward_points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_compute_jobs_node ON public.compute_jobs(node_id);
CREATE INDEX idx_compute_jobs_created ON public.compute_jobs(created_at DESC);

-- Discount tiers based on contribution
CREATE TABLE IF NOT EXISTS public.contribution_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    min_points INTEGER NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    badge_text TEXT NOT NULL,
    badge_color TEXT NOT NULL,
    perks JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert contribution tiers
INSERT INTO public.contribution_tiers (name, min_points, discount_percentage, badge_text, badge_color, perks) VALUES
('Supporter', 0, 5, '🤝 Supporter', '#6B7280', '["5% discount", "Community access"]'),
('Contributor', 1000, 10, '⚡ Contributor', '#3B82F6', '["10% discount", "Priority support", "Founder badge"]'),
('Champion', 5000, 20, '🏆 Champion', '#8B5CF6', '["20% discount", "Early access", "Leaderboard featured"]'),
('Legend', 25000, 35, '👑 Legend', '#F59E0B', '["35% discount", "Custom features", "Direct line to team"]'),
('Founder', 100000, 50, '🔥 OG Founder', '#EF4444', '["50% discount", "Lifetime access", "Name in credits", "Exclusive merch"]')
ON CONFLICT (name) DO NOTHING;
