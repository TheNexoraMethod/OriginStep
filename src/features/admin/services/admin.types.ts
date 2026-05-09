// Admin entity types.
//
// Admin operations act on existing entities — approving mentors, managing visibility,
// overseeing applications. These types represent the admin-specific views and actions.

import type { Mentor } from '@/features/mentors/services/mentors.types';
import type { UserProfile } from '@/features/profile/services/profile.types';

// ─── Pending mentor approval ──────────────────────────────────────────────────
// The admin approval queue shows mentor applications with the owning user's profile.

export type PendingMentorApproval = Mentor & {
  user: Pick<UserProfile, 'id' | 'fullName' | 'email' | 'createdAt'>;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

export type ApproveMentorDto = {
  mentorId: string;
  approved: boolean;
};
