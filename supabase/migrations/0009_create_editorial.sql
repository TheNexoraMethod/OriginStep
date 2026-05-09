-- Origin Step — Supabase Migration 0009
-- Creates the editorial_content table for long-form style articles and cultural context.
--
-- Content is authored and managed exclusively by admins.
-- Published content is readable by all authenticated users.
-- style_id is nullable — some articles may be standalone rather than style-specific.

create table public.editorial_content (
  id           uuid                  primary key default gen_random_uuid(),
  style_id     uuid                  references public.dance_styles (id) on delete set null,
  slug         text                  not null unique,
  title        text                  not null,
  content      text                  not null,
  status       public.content_status not null default 'draft',
  author_id    uuid                  references public.users (id) on delete set null,
  published_at timestamptz,
  created_at   timestamptz           not null default now(),
  updated_at   timestamptz           not null default now()
);

create trigger set_updated_at
  before update on public.editorial_content
  for each row execute function public.set_updated_at();

create index editorial_content_style_id_idx on public.editorial_content (style_id);
create index editorial_content_status_idx   on public.editorial_content (status);
create index editorial_content_slug_idx     on public.editorial_content (slug);

alter table public.editorial_content enable row level security;

-- Any authenticated user can read published editorial content.
create policy "editorial_content: authenticated read published"
  on public.editorial_content for select
  to authenticated
  using (status = 'published');

-- Admins can read all content regardless of status (draft review, archival).
create policy "editorial_content: admin select"
  on public.editorial_content for select
  using (public.is_admin());

-- Only admins can create, update, or delete editorial content records.
create policy "editorial_content: admin insert"
  on public.editorial_content for insert
  with check (public.is_admin());

create policy "editorial_content: admin update"
  on public.editorial_content for update
  using (public.is_admin());

create policy "editorial_content: admin delete"
  on public.editorial_content for delete
  using (public.is_admin());
