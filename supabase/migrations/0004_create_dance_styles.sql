-- Origin Step — Supabase Migration 0004
-- Creates the dance_styles and user_interests tables, indexes, and RLS policies.
--
-- dance_styles: the editorial catalog of movement forms. Admin-managed content.
-- user_interests: junction table linking users to their preferred dance styles.
--   Created during onboarding and editable by the user at any time.

-- ─── dance_styles ─────────────────────────────────────────────────────────────

create table public.dance_styles (
  id               uuid                  primary key default gen_random_uuid(),
  slug             text                  not null unique,
  name             text                  not null,
  category         public.style_category not null,
  origin_region    text,
  era              text,
  summary          text                  not null,
  cultural_context text,
  key_figures      text[],
  practice_context text,
  thumbnail_url    text,
  created_at       timestamptz           not null default now(),
  updated_at       timestamptz           not null default now()
);

create trigger set_updated_at
  before update on public.dance_styles
  for each row execute function public.set_updated_at();

create index dance_styles_category_idx on public.dance_styles (category);
create index dance_styles_slug_idx     on public.dance_styles (slug);

alter table public.dance_styles enable row level security;

-- Any authenticated user can read the full style catalog.
create policy "dance_styles: authenticated read"
  on public.dance_styles for select
  to authenticated
  using (true);

-- Only admins can create or modify style catalog entries.
create policy "dance_styles: admin insert"
  on public.dance_styles for insert
  with check (public.is_admin());

create policy "dance_styles: admin update"
  on public.dance_styles for update
  using (public.is_admin());

create policy "dance_styles: admin delete"
  on public.dance_styles for delete
  using (public.is_admin());

-- ─── user_interests ───────────────────────────────────────────────────────────

create table public.user_interests (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references public.users (id) on delete cascade,
  style_id   uuid        not null references public.dance_styles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, style_id)
);

create index user_interests_user_id_idx  on public.user_interests (user_id);
create index user_interests_style_id_idx on public.user_interests (style_id);

alter table public.user_interests enable row level security;

-- Users may read their own interests.
create policy "user_interests: self select"
  on public.user_interests for select
  using (auth.uid() = user_id);

-- Users may add interests (duplicate prevention via unique constraint).
create policy "user_interests: self insert"
  on public.user_interests for insert
  with check (auth.uid() = user_id);

-- Users may remove their own interests.
create policy "user_interests: self delete"
  on public.user_interests for delete
  using (auth.uid() = user_id);

-- Admins may read all interests (e.g. for analytics).
create policy "user_interests: admin select"
  on public.user_interests for select
  using (public.is_admin());
