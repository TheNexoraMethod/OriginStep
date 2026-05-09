// Mentorship application form schema.
//
// This schema encodes the seven application questions with appropriate validation.
//
// Validation philosophy:
// - Minimum lengths are set to encourage thoughtful, complete answers.
// - Maximum lengths prevent abuse while giving genuine applicants room to write.
// - Required fields have clear, human error messages — not engineering speak.
// - The optional media field accepts null or an empty string in addition to a URL
//   because we render it as an optional input that can be left blank.
//
// Copy philosophy: error messages should feel like a respectful prompt, not a constraint.

import { mediumTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

export const applicationFormSchema = z.object({
  // Q1
  whyThisStyle: mediumTextSchema('Your answer', 30).describe(
    'What draws you to this style right now?',
  ),

  // Q2
  whyThisMentor: mediumTextSchema('Your answer', 30).describe(
    'Why are you applying to learn from this mentor specifically?',
  ),

  // Q3
  goals3To6Months: mediumTextSchema('Your answer', 30).describe(
    'What are you hoping to develop over the next 3 to 6 months?',
  ),

  // Q4
  currentPractice: mediumTextSchema('Your answer', 20).describe(
    'How are you currently practicing, training, or engaging with dance?',
  ),

  // Q5
  supportNeeded: mediumTextSchema('Your answer', 20).describe(
    'What kind of support are you looking for?',
  ),

  // Q6
  meaningfulOutcome: mediumTextSchema('Your answer', 20).describe(
    'What would make this mentorship meaningful for you?',
  ),

  // Q7 — optional
  optionalMediaUrl: z
    .string()
    .trim()
    .max(2048, 'Link is too long')
    .nullable()
    .optional()
    .transform((val) => (val === '' ? null : (val ?? null))),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

// ─── Reviewer action schema ───────────────────────────────────────────────────
// Used in the mentor dashboard when updating an application status.

const reviewableStatuses = [
  'in_review',
  'accepted',
  'declined',
  'waitlisted',
  'needs_more_context',
  'invited_to_next_step',
] as const;

export const reviewApplicationSchema = z.object({
  status: z.enum(reviewableStatuses, { error: 'Select a review status' }),
  reviewerNotes: z.string().trim().max(1000, 'Notes are too long').nullable().optional(),
});

export type ReviewApplicationFormValues = z.infer<typeof reviewApplicationSchema>;
