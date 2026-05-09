// Profile — User account and personal data types.

import { DanceLevel } from '@/types/domain';
import { Database } from '@/types/supabase';

// Full user profile row, matched with Supabase schema.
export type UserProfile = Database['public']['Tables']['users']['Row'];

export type UserProfileInsert = Database['public']['Tables']['users']['Insert'];
export type UserProfileUpdate = Database['public']['Tables']['users']['Update'];

// Shape returned by the useCurrentUser() hook for display and decisions.
export type CurrentUser = UserProfile & {
  isAuthenticated: boolean;
  isMentor: boolean;
  isAdmin: boolean;
};

// Partial profile update (subset of mutable fields).
// Omits id, role (role changes via service functions only), created_at/updated_at.
export type UpdateProfileInput = {
  full_name?: string;
  avatar_url?: string | null;
  dance_level?: DanceLevel | null;
  learning_goals?: string[];
  interested_in_mentorship?: boolean;
  onboarding_completed?: boolean;
};

// Avatar upload form state.
export type AvatarUploadState = {
  file: File | null;
  uploading: boolean;
  error: string | null;
  url: string | null;
};
