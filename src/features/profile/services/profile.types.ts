// User entity types for the auth and profile features.
//
// UserProfile is the application-level user record from the `users` table.
// It is distinct from Supabase's auth.User (the JWT identity).
// Both exist: auth.User is owned by Supabase Auth, UserProfile is owned by our database.

import type { DanceLevel, UserRole } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type UserProfile = {
  id: string; // matches auth.User.id
  fullName: string;
  email: string;
  avatarUrl: string | null;
  role: UserRole;
  danceLevel: DanceLevel | null;
  learningGoals: string[];
  interestedInMentorship: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

// Shape used when creating a user profile record after Supabase Auth sign-up.
export type CreateUserProfileDto = {
  id: string;
  fullName: string;
  email: string;
};

// Shape used when updating an existing profile.
// All fields optional — callers only send what changed.
export type UpdateUserProfileDto = {
  fullName?: string;
  avatarUrl?: string | null;
  danceLevel?: DanceLevel;
};
