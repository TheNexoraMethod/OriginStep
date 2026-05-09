-- Origin Step — Supabase Migration 0005
-- Creates the video_lessons and user_video_progress tables, indexes, and RLS policies.
--
-- video_lessons: structured learning content tied to a dance style. Admin-managed.
-- user_video_progress: per-user engagement tracking per lesson (upsert pattern).

-- ─── video_lessons ────────────────────────────────────────────────────────────

create table public.video_lessons (
  id               uuid                    primary key default gen_random_uuid(),
  style_id         uuid                    not null references public.dance_styles (id) on delete cascade,
  title            text                    not null,
  slug             text                    not null unique,
  description      text,
  lesson_type      public.lesson_type      not null,
  difficulty       public.difficulty_level not null,
  duration_seconds integer                 not null check (duration_seconds > 0),
  video_url        text                    not null,
  thumbnail_url    text,
  instructor_name  text                    not null,
  order_index      integer                 not null default 0,
  created_at       timestamptz             not null default now(),
  updated_at       timestamptz             not null default now()
);

create trigger set_updated_at
  before update on public.video_lessons
  for each row execute function public.set_updated_at();

create index video_lessons_style_id_idx    on public.video_lessons (style_id);
create index video_lessons_lesson_type_idx on public.video_lessons (lesson_type);
create index video_lessons_difficulty_idx  on public.video_lessons (difficulty);
create index video_lessons_order_style_idx on public.video_lessons (style_id, order_index);

alter table public.video_lessons enable row level security;

-- Any authenticated user can read the full lesson catalog.
create policy "video_lessons: authenticated read"
  on public.video_lessons for select
  to authenticated
  using (true);

-- Only admins can create or modify lesson records.
create policy "video_lessons: admin insert"
  on public.video_lessons for insert
  with check (public.is_admin());

create policy "video_lessons: admin update"
  on public.video_lessons for update
  using (public.is_admin());

create policy "video_lessons: admin delete"
  on public.video_lessons for delete
  using (public.is_admin());

-- ─── user_video_progress ──────────────────────────────────────────────────────

create table public.user_video_progress (
  id                 uuid        primary key default gen_random_uuid(),
  user_id            uuid        not null references public.users (id) on delete cascade,
  video_id           uuid        not null references public.video_lessons (id) on delete cascade,
  watched_at         timestamptz not null default now(),
  completed          boolean     not null default false,
  completion_percent smallint    not null default 0 check (completion_percent between 0 and 100),
  notes              text,
  updated_at         timestamptz not null default now(),
  unique (user_id, video_id)
);

create trigger set_updated_at
  before update on public.user_video_progress
  for each row execute function public.set_updated_at();

create index user_video_progress_user_id_idx  on public.user_video_progress (user_id);
create index user_video_progress_video_id_idx on public.user_video_progress (video_id);

alter table public.user_video_progress enable row level security;

-- Users can read, insert, and update their own progress records.
create policy "user_video_progress: self select"
  on public.user_video_progress for select
  using (auth.uid() = user_id);

create policy "user_video_progress: self insert"
  on public.user_video_progress for insert
  with check (auth.uid() = user_id);

create policy "user_video_progress: self update"
  on public.user_video_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins can read all progress records (for analytics and content improvement).
create policy "user_video_progress: admin select"
  on public.user_video_progress for select
  using (public.is_admin());
