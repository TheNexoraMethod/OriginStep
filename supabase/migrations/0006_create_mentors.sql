-- Origin Step — Supabase Migration 0006
-- Creates the mentors table, indexes, and RLS policies.
--
-- A mentor profile is created by a user who wants to offer mentorship.
-- Profiles are undiscoverable until an admin sets approved = true.
-- Mentors control their own discoverability with the visible flag.

create table public.mentors (
  id                uuid                    primary key default gen_random_uuid(),
  user_id           uuid                    not null unique references public.users (id) on delete cascade,
  display_name      text                    not null,
  bio               text                    not null,
  city              text,
  country           text,
  specialisms       public.style_category[] not null default '{}',
  teaching_values   text,
  intro_video_url   text,
  profile_image_url text,
  approved          boolean                 not null default false,
  visible           boolean                 not null default true,
  created_at        timestamptz             not null default now(),
  updated_at        timestamptz             not null default now()
);

create trigger set_updated_at
  before update on public.mentors
  for each row execute function public.set_updated_at();

create index mentors_user_id_idx          on public.mentors (user_id);
create index mentors_approved_visible_idx on public.mentors (approved, visible);

alter table public.mentors enable row level security;

-- Any authenticated user can discover approved and visible mentor profiles.
create policy "mentors: public discovery"
  on public.mentors for select
  to authenticated
  using (approved = true and visible = true);

-- Mentors can always read their own profile regardless of approval state.
create policy "mentors: self select"
  on public.mentors for select
  using (auth.uid() = user_id);

-- Mentors can create their own profile (one per user, enforced by unique constraint on user_id).
create policy "mentors: self insert"
  on public.mentors for insert
  with check (auth.uid() = user_id);

-- Mentors can update their editorial fields.
-- The approved column must only be changed by admins — enforced at the service layer.
create policy "mentors: self update"
  on public.mentors for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins can read all mentor profiles regardless of approval or visibility state.
create policy "mentors: admin select"
  on public.mentors for select
  using (public.is_admin());

-- Admins can update mentor profiles, including setting approved = true/false.
create policy "mentors: admin update"
  on public.mentors for update
  using (public.is_admin());
