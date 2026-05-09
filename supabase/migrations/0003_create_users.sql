-- Origin Step — Supabase Migration 0003
-- Creates the public.users table, its auth trigger, indexes, and RLS policies.
--
-- public.users is the application-level user profile, distinct from auth.users.
-- Both records share the same UUID primary key. The handle_new_auth_user() trigger
-- automatically creates a public.users row when a Supabase Auth sign-up occurs.
--
-- Role changes must only be performed via server-side RPC functions using service-role
-- context. The RLS self-update policy does not validate the role column; application
-- layer and service functions are responsible for preventing self-elevation.

create table public.users (
  id                       uuid              primary key references auth.users (id) on delete cascade,
  full_name                text              not null default '',
  email                    text              not null,
  avatar_url               text,
  role                     public.user_role  not null default 'student',
  dance_level              public.dance_level,
  learning_goals           text[]            not null default '{}',
  interested_in_mentorship boolean           not null default false,
  onboarding_completed     boolean           not null default false,
  created_at               timestamptz       not null default now(),
  updated_at               timestamptz       not null default now()
);

-- ─── Trigger: auto-update updated_at ─────────────────────────────────────────

create trigger set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ─── Trigger: create profile on sign-up ──────────────────────────────────────
-- Fires after Supabase Auth inserts a new row into auth.users.
-- Function definition lives in migration 0002.

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ─── Indexes ──────────────────────────────────────────────────────────────────

create index users_role_idx on public.users (role);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

alter table public.users enable row level security;

-- Authenticated users may read their own profile row.
create policy "users: self select"
  on public.users for select
  using (auth.uid() = id);

-- Admins may read all user profile rows.
-- Uses is_admin() (security definer) to avoid RLS recursion on public.users.
create policy "users: admin select"
  on public.users for select
  using (public.is_admin());

-- Users may update their own profile fields (full_name, avatar_url, dance_level, etc.).
-- Role mutations are excluded at the application and service layers.
create policy "users: self update"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins may update any user row, including changing the role column.
create policy "users: admin update"
  on public.users for update
  using (public.is_admin());

-- Direct inserts are intentionally blocked. All public.users rows originate from
-- the on_auth_user_created trigger running with security definer context.
