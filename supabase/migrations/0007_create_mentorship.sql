-- Origin Step — Supabase Migration 0007
-- Creates the mentorship_applications, mentor_session_offerings, and
-- mentorship_next_steps tables with their indexes and RLS policies.
--
-- Application lifecycle:
--   draft → submitted → in_review → accepted / declined / waitlisted /
--   needs_more_context / invited_to_next_step
--
-- Next steps are created by mentors after accepting an application.
-- They bridge approval → payment → booked session.

-- ─── mentorship_applications ──────────────────────────────────────────────────

create table public.mentorship_applications (
  id                  uuid                      primary key default gen_random_uuid(),
  user_id             uuid                      not null references public.users (id) on delete cascade,
  mentor_id           uuid                      not null references public.mentors (id) on delete cascade,
  status              public.application_status not null default 'draft',

  -- The seven application questions from the product brief.
  why_this_style      text                      not null,
  why_this_mentor     text                      not null,
  goals_3_to_6_months text                      not null,
  current_practice    text                      not null,
  support_needed      text                      not null,
  meaningful_outcome  text                      not null,
  optional_media_url  text,

  -- Review fields — populated by the reviewing mentor or admin.
  reviewer_notes      text,
  reviewed_by         uuid                      references public.users (id),
  reviewed_at         timestamptz,

  created_at          timestamptz               not null default now(),
  updated_at          timestamptz               not null default now()
);

create trigger set_updated_at
  before update on public.mentorship_applications
  for each row execute function public.set_updated_at();

create index mentorship_applications_user_id_idx   on public.mentorship_applications (user_id);
create index mentorship_applications_mentor_id_idx on public.mentorship_applications (mentor_id);
create index mentorship_applications_status_idx    on public.mentorship_applications (status);

alter table public.mentorship_applications enable row level security;

-- Students can read their own applications.
create policy "mentorship_applications: self select"
  on public.mentorship_applications for select
  using (auth.uid() = user_id);

-- Students can submit new applications.
-- One-application-per-mentor uniqueness is enforced at the service layer.
create policy "mentorship_applications: self insert"
  on public.mentorship_applications for insert
  with check (auth.uid() = user_id);

-- Students can update their own applications while still in draft.
create policy "mentorship_applications: self update draft"
  on public.mentorship_applications for update
  using (auth.uid() = user_id and status = 'draft')
  with check (auth.uid() = user_id);

-- Mentors can read applications addressed to them.
create policy "mentorship_applications: mentor select"
  on public.mentorship_applications for select
  using (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentorship_applications.mentor_id
    )
  );

-- Mentors can update review fields (status, reviewer_notes, reviewed_by, reviewed_at).
create policy "mentorship_applications: mentor update"
  on public.mentorship_applications for update
  using (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentorship_applications.mentor_id
    )
  );

-- Admins can read and update all applications.
create policy "mentorship_applications: admin select"
  on public.mentorship_applications for select
  using (public.is_admin());

create policy "mentorship_applications: admin update"
  on public.mentorship_applications for update
  using (public.is_admin());

-- ─── mentor_session_offerings ─────────────────────────────────────────────────

create table public.mentor_session_offerings (
  id                uuid                  primary key default gen_random_uuid(),
  mentor_id         uuid                  not null references public.mentors (id) on delete cascade,
  format            public.session_format not null,
  title             text                  not null,
  description       text                  not null,
  base_price        integer               not null check (base_price >= 0),
  currency          text                  not null default 'GBP',
  duration_minutes  integer               not null check (duration_minutes > 0),
  pricing_notes     text,
  travel_cost_notes text,  -- only meaningful when format = 'in_person'
  studio_cost_notes text,  -- only meaningful when format = 'in_person'
  active            boolean               not null default true,
  created_at        timestamptz           not null default now(),
  updated_at        timestamptz           not null default now()
);

create trigger set_updated_at
  before update on public.mentor_session_offerings
  for each row execute function public.set_updated_at();

create index mentor_session_offerings_mentor_id_idx on public.mentor_session_offerings (mentor_id);

alter table public.mentor_session_offerings enable row level security;

-- Authenticated users can read active offerings for approved and visible mentors
-- (displayed transparently on the mentor profile screen).
create policy "mentor_session_offerings: authenticated read active"
  on public.mentor_session_offerings for select
  to authenticated
  using (
    active = true
    and exists (
      select 1 from public.mentors
      where id = mentor_session_offerings.mentor_id
        and approved = true
        and visible = true
    )
  );

-- Mentors can read all their own offerings including inactive ones.
create policy "mentor_session_offerings: mentor self select"
  on public.mentor_session_offerings for select
  using (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentor_session_offerings.mentor_id
    )
  );

-- Mentors can create offerings for themselves.
create policy "mentor_session_offerings: mentor self insert"
  on public.mentor_session_offerings for insert
  with check (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentor_session_offerings.mentor_id
    )
  );

-- Mentors can update their own offerings.
-- format cannot change after creation — enforced at the service layer.
create policy "mentor_session_offerings: mentor self update"
  on public.mentor_session_offerings for update
  using (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentor_session_offerings.mentor_id
    )
  );

-- Mentors can delete their own offerings.
create policy "mentor_session_offerings: mentor self delete"
  on public.mentor_session_offerings for delete
  using (
    exists (
      select 1 from public.mentors
      where user_id = auth.uid()
        and id = mentor_session_offerings.mentor_id
    )
  );

-- Admins can read all offerings.
create policy "mentor_session_offerings: admin select"
  on public.mentor_session_offerings for select
  using (public.is_admin());

-- ─── mentorship_next_steps ────────────────────────────────────────────────────
-- Created by a mentor after accepting an application.
-- Bridges the gap between approval and a booked, potentially paid session.
--
-- format is denormalized from the selected offering at creation time.
-- This saves a join on the student-facing next-step screen and correctly
-- preserves the format even if the offering is later modified.

create table public.mentorship_next_steps (
  id                         uuid                  primary key default gen_random_uuid(),
  application_id             uuid                  not null references public.mentorship_applications (id) on delete cascade,
  mentor_session_offering_id uuid                  references public.mentor_session_offerings (id),
  type                       public.next_step_type not null,
  format                     public.session_format not null,  -- denormalized from offering
  title                      text                  not null,
  description                text,
  scheduled_at               timestamptz,
  duration_minutes           integer               check (duration_minutes > 0),
  travel_cost                integer               check (travel_cost >= 0),  -- minor currency units; in_person only
  studio_cost                integer               check (studio_cost >= 0),  -- minor currency units; in_person only
  final_price                integer               not null check (final_price >= 0),
  payment_required           boolean               not null default false,
  payment_status             public.payment_status not null default 'pending',
  stripe_reference           text,
  created_at                 timestamptz           not null default now(),
  updated_at                 timestamptz           not null default now()
);

create trigger set_updated_at
  before update on public.mentorship_next_steps
  for each row execute function public.set_updated_at();

create index mentorship_next_steps_application_id_idx on public.mentorship_next_steps (application_id);

alter table public.mentorship_next_steps enable row level security;

-- Students can view next steps attached to their own applications.
create policy "mentorship_next_steps: applicant select"
  on public.mentorship_next_steps for select
  using (
    exists (
      select 1 from public.mentorship_applications
      where id = mentorship_next_steps.application_id
        and user_id = auth.uid()
    )
  );

-- Mentors can view, create, and update next steps on applications addressed to them.
create policy "mentorship_next_steps: mentor select"
  on public.mentorship_next_steps for select
  using (
    exists (
      select 1
      from public.mentorship_applications ma
      join public.mentors m on m.id = ma.mentor_id
      where ma.id = mentorship_next_steps.application_id
        and m.user_id = auth.uid()
    )
  );

create policy "mentorship_next_steps: mentor insert"
  on public.mentorship_next_steps for insert
  with check (
    exists (
      select 1
      from public.mentorship_applications ma
      join public.mentors m on m.id = ma.mentor_id
      where ma.id = mentorship_next_steps.application_id
        and m.user_id = auth.uid()
    )
  );

create policy "mentorship_next_steps: mentor update"
  on public.mentorship_next_steps for update
  using (
    exists (
      select 1
      from public.mentorship_applications ma
      join public.mentors m on m.id = ma.mentor_id
      where ma.id = mentorship_next_steps.application_id
        and m.user_id = auth.uid()
    )
  );

-- Admins can read and update all next steps (e.g. for dispute resolution).
create policy "mentorship_next_steps: admin select"
  on public.mentorship_next_steps for select
  using (public.is_admin());

create policy "mentorship_next_steps: admin update"
  on public.mentorship_next_steps for update
  using (public.is_admin());
