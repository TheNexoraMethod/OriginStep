// Mentor entity types.
//
// A Mentor is a user with role='mentor' who has been approved by an admin.
// The mentors table extends the users table — mentor.userId references users.id.
// Mentors are not discoverable until approved=true AND visible=true.

import type { StyleCategory } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type Mentor = {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  city: string | null;
  country: string | null;
  specialisms: StyleCategory[];
  teachingValues: string | null;
  introVideoUrl: string | null;
  profileImageUrl: string | null;
  approved: boolean; // set to true by admin — required before the mentor is discoverable
  visible: boolean; // mentor-controlled — allows them to pause discoverability
  createdAt: string;
  updatedAt: string;
};

// ─── Card/list variant ────────────────────────────────────────────────────────
// Lightweight shape used in mentor cards and discovery grids.

export type MentorSummary = Pick<
  Mentor,
  'id' | 'userId' | 'displayName' | 'city' | 'country' | 'specialisms' | 'profileImageUrl'
>;

// ─── Profile with offerings ───────────────────────────────────────────────────
// Used on the mentor detail screen — includes session formats available after approval.
// Offerings are joined from the mentor_session_offerings table.

import type { SessionOffering } from '@/types/domain';

export type MentorWithOfferings = Mentor & {
  offerings: SessionOffering[];
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

export type UpdateMentorProfileDto = {
  displayName?: string;
  bio?: string;
  city?: string | null;
  country?: string | null;
  specialisms?: StyleCategory[];
  teachingValues?: string | null;
  introVideoUrl?: string | null;
  profileImageUrl?: string | null;
  visible?: boolean;
};

// ─── Filter shape ─────────────────────────────────────────────────────────────

export type MentorListFilters = {
  specialism?: StyleCategory;
  country?: string;
  search?: string;
};
