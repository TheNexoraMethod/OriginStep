// Mentor profile form schemas.
//
// Used in the mentor dashboard profile editor.
// Separate from the user profile schema — mentor profile data lives in the mentors table.

import { longTextSchema, shortTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

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

export const mentorProfileSchema = z.object({
  displayName: shortTextSchema('Display name').max(100, 'Display name is too long'),
  bio: longTextSchema('Bio', 50),
  city: z.string().trim().max(100).nullable().optional(),
  country: z.string().trim().max(100).nullable().optional(),
  specialisms: z.array(z.enum(styleCategoryValues)).min(1, 'Add at least one style specialism'),
  teachingValues: z.string().trim().max(1000, 'Teaching values are too long').nullable().optional(),
});

export type MentorProfileFormValues = z.infer<typeof mentorProfileSchema>;
