-- Origin Step — Supabase Migration 0010
-- Creates Supabase Storage buckets and their RLS policies.
--
-- Buckets:
--   avatars         — user profile images.  Path: {user_id}/{filename}
--   mentor-profiles — mentor card images.   Path: {mentor_id}/{filename}
--   intro-videos    — mentor intro clips.   Path: {mentor_id}/{filename}
--   lesson-videos   — lesson video files.   Path: {style_slug}/{lesson_id}/{filename}
--   thumbnails      — lesson/style images.  Path: {style_slug}/{filename}
--
-- All buckets are private. Access is controlled by the RLS policies below.
-- storage.foldername(name)[1] extracts the first path segment (owner identifier).

-- ─── Bucket definitions ───────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values
  ('avatars',         'avatars',         false),
  ('mentor-profiles', 'mentor-profiles', false),
  ('intro-videos',    'intro-videos',    false),
  ('lesson-videos',   'lesson-videos',   false),
  ('thumbnails',      'thumbnails',      false)
on conflict (id) do nothing;

-- ─── avatars ──────────────────────────────────────────────────────────────────

-- Any authenticated user can read avatars (shown in mentor cards, comments, etc.)
create policy "avatars: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'avatars');

-- Users can upload files only within their own folder.
create policy "avatars: self insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can overwrite existing files in their own folder.
create policy "avatars: self update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete files in their own folder.
create policy "avatars: self delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ─── mentor-profiles ─────────────────────────────────────────────────────────

create policy "mentor-profiles: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'mentor-profiles');

-- Mentors can upload to their own folder (keyed by mentor.id, not user.id).
create policy "mentor-profiles: mentor self insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'mentor-profiles'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

create policy "mentor-profiles: mentor self update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'mentor-profiles'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

create policy "mentor-profiles: mentor self delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'mentor-profiles'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

-- Admins can manage all mentor profile images.
create policy "mentor-profiles: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'mentor-profiles' and public.is_admin());

create policy "mentor-profiles: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'mentor-profiles' and public.is_admin());

create policy "mentor-profiles: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'mentor-profiles' and public.is_admin());

-- ─── intro-videos ─────────────────────────────────────────────────────────────

create policy "intro-videos: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'intro-videos');

create policy "intro-videos: mentor self insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'intro-videos'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

create policy "intro-videos: mentor self update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'intro-videos'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

create policy "intro-videos: mentor self delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'intro-videos'
    and exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id::text = (storage.foldername(name))[1]
    )
  );

create policy "intro-videos: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'intro-videos' and public.is_admin());

create policy "intro-videos: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'intro-videos' and public.is_admin());

create policy "intro-videos: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'intro-videos' and public.is_admin());

-- ─── lesson-videos ────────────────────────────────────────────────────────────
-- Admin-managed content only.

create policy "lesson-videos: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'lesson-videos');

create policy "lesson-videos: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'lesson-videos' and public.is_admin());

create policy "lesson-videos: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'lesson-videos' and public.is_admin());

create policy "lesson-videos: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'lesson-videos' and public.is_admin());

-- ─── thumbnails ───────────────────────────────────────────────────────────────
-- Admin-managed content only.

create policy "thumbnails: authenticated read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'thumbnails');

create policy "thumbnails: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'thumbnails' and public.is_admin());

create policy "thumbnails: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'thumbnails' and public.is_admin());

create policy "thumbnails: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'thumbnails' and public.is_admin());
