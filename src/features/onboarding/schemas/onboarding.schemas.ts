// Onboarding form schemas.
//
// The onboarding flow is multi-step. Each step has its own schema for per-step validation.
// The combined schema is also exported for the final submit call.

import { z } from 'zod';

// ─── Supported values ─────────────────────────────────────────────────────────

const danceLevelValues = ['non_dancer', 'beginner', 'intermediate', 'experienced'] as const;

const styleCategoryValues = [
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
  'other',
] as const;

const learningGoalValues = [
  'cultural_education',
  'groove_training',
  'freestyle_development',
  'mentorship',
  'foundations',
  'social_practice',
  'performance',
  'accountability',
] as const;

// ─── Step schemas ─────────────────────────────────────────────────────────────

export const onboardingLevelSchema = z.object({
  danceLevel: z.enum(danceLevelValues, { error: 'Select your current level' }),
});

export const onboardingInterestsSchema = z.object({
  styleCategories: z
    .array(z.enum(styleCategoryValues))
    .min(1, 'Select at least one style that interests you'),
});

export const onboardingGoalsSchema = z.object({
  learningGoals: z.array(z.enum(learningGoalValues)).min(1, 'Select at least one learning focus'),
  interestedInMentorship: z.boolean(),
});

// ─── Combined schema ──────────────────────────────────────────────────────────
// Used for the final onboarding persistence — merges all step values.

export const onboardingSchema = onboardingLevelSchema
  .merge(onboardingInterestsSchema)
  .merge(onboardingGoalsSchema);

export type OnboardingLevelValues = z.infer<typeof onboardingLevelSchema>;
export type OnboardingInterestsValues = z.infer<typeof onboardingInterestsSchema>;
export type OnboardingGoalsValues = z.infer<typeof onboardingGoalsSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
