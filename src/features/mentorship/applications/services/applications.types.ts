// Mentorship application entity types.
//
// An application is the primary document of the mentorship process.
// It moves through the ApplicationStatus lifecycle as mentors and admins review it.
// The seven application questions are the core of this entity.

import type { ApplicationStatus } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type MentorshipApplication = {
  id: string;
  userId: string;
  mentorId: string;
  status: ApplicationStatus;

  // The seven application questions. Each maps to the product brief's question set.
  whyThisStyle: string; // Q1: What draws you to this style right now?
  whyThisMentor: string; // Q2: Why are you applying to learn from this mentor specifically?
  goals3To6Months: string; // Q3: What are you hoping to develop over the next 3–6 months?
  currentPractice: string; // Q4: How are you currently practicing or engaging with dance?
  supportNeeded: string; // Q5: What kind of support are you looking for?
  meaningfulOutcome: string; // Q6: What would make this mentorship meaningful for you?
  optionalMediaUrl: string | null; // Q7: Optional media link (video, social, reel, etc.)

  // Review fields — set by mentor or admin
  reviewerNotes: string | null;
  reviewedBy: string | null; // user_id of the reviewer
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─── With context joins ───────────────────────────────────────────────────────
// Used in the student-facing application status view.

import type { MentorSummary } from '@/features/mentors/services/mentors.types';

export type ApplicationWithMentor = MentorshipApplication & {
  mentor: MentorSummary;
};

// Used in the mentor dashboard — includes the applicant's basic profile.
import type { UserProfile } from '@/features/profile/services/profile.types';

export type ApplicationWithApplicant = MentorshipApplication & {
  applicant: Pick<UserProfile, 'id' | 'fullName' | 'avatarUrl' | 'danceLevel'>;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

// Payload sent when a student submits a new application.
export type SubmitApplicationDto = {
  mentorId: string;
  whyThisStyle: string;
  whyThisMentor: string;
  goals3To6Months: string;
  currentPractice: string;
  supportNeeded: string;
  meaningfulOutcome: string;
  optionalMediaUrl?: string | null;
};

// Payload sent when a mentor updates an application's review status.
export type ReviewApplicationDto = {
  status: ApplicationStatus;
  reviewerNotes?: string | null;
};
