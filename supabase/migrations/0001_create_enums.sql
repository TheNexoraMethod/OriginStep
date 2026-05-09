-- Origin Step — Supabase Migration 0001
-- Creates all application-level PostgreSQL enum types.
--
-- Enum values MUST match the literal union types in src/types/domain.ts exactly.
-- Adding or removing values requires a new migration; never edit these in-place.

create type public.user_role as enum (
  'student',
  'mentor',
  'admin'
);

create type public.dance_level as enum (
  'non_dancer',
  'beginner',
  'intermediate',
  'experienced'
);

create type public.style_category as enum (
  'hip_hop_foundation',
  'house',
  'locking',
  'popping',
  'breaking',
  'waacking',
  'voguing',
  'krump',
  'party_groove',
  'social_groove',
  'experimental',
  'contemporary',
  'other'
);

create type public.lesson_type as enum (
  'groove',
  'basics',
  'drill',
  'social_application',
  'practice_guidance',
  'cultural_context'
);

create type public.difficulty_level as enum (
  'entry',
  'beginner',
  'intermediate',
  'advanced'
);

create type public.application_status as enum (
  'draft',
  'submitted',
  'in_review',
  'accepted',
  'declined',
  'waitlisted',
  'needs_more_context',
  'invited_to_next_step'
);

create type public.session_format as enum (
  'online',
  'in_person'
);

create type public.next_step_type as enum (
  'online_session',
  'in_person_session',
  'consultation',
  'mentorship_container',
  'other'
);

create type public.payment_status as enum (
  'pending',
  'paid',
  'waived',
  'refunded'
);

create type public.saved_item_type as enum (
  'style',
  'video',
  'mentor'
);

create type public.content_status as enum (
  'draft',
  'published',
  'archived'
);
