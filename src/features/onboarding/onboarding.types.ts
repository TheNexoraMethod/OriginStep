// Onboarding — Multi-step form types for user setup.

import { DanceLevel } from '@/types/domain';
import { Database } from '@/types/supabase';

// ─── Core Onboarding Types ────────────────────────────────────────────────────

// Current step in the multi-step flow.
export type OnboardingStep = 'level' | 'interests' | 'goals' | 'complete';

// Full onboarding form state (all steps combined).
export type OnboardingFormInput = {
  danceLevel: DanceLevel | null;
  interestedStyles: string[]; // array of dance_styles.id
  learningGoals: string[];
  interestedInMentorship: boolean;
};

// Per-step form inputs as collected by the UI.
export type DanceLevelInput = {
  danceLevel: DanceLevel;
};

export type InterestsInput = {
  selectedStyleIds: string[]; // UUIDs of dance_styles
};

export type GoalsInput = {
  learningGoals: string[];
  interestedInMentorship: boolean;
};

// ─── Related Domain Types ─────────────────────────────────────────────────────

// Dance style with user's selection state (for Interests step).
export type StyleOption = Database['public']['Tables']['dance_styles']['Row'] & {
  selected?: boolean;
};

// User interest junction record.
export type UserInterest = Database['public']['Tables']['user_interests']['Row'];
export type UserInterestInsert = Database['public']['Tables']['user_interests']['Insert'];
