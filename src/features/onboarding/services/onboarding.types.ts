// Onboarding entity types and DTOs.
//
// The onboarding flow saves a user's dance level, style interests, learning goals,
// and mentorship interest in a single commit to the database.

import type { DanceLevel, StyleCategory } from '@/types/domain';

// ─── Supporting entities ──────────────────────────────────────────────────────

// A single user_interests row linking a user to a dance style.
export type UserInterest = {
  id: string;
  userId: string;
  styleId: string;
  createdAt: string;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

// The combined payload that is persisted when a user completes onboarding.
// Wraps the profile update and the style interest records into one logical operation.
export type CompleteOnboardingDto = {
  danceLevel: DanceLevel;
  styleCategories: StyleCategory[]; // used to look up style IDs from dance_styles table
  learningGoals: string[]; // stored in the user profile as a text array
  interestedInMentorship: boolean;
};
