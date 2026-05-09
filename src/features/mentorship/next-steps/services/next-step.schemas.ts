// Next step creation form schema.
//
// Used in the mentor dashboard when creating an approved next step for an applicant.
// The mentor selects an offering, optionally overrides costs, and sets the final price.

import { shortTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

const nextStepTypeValues = [
  'online_session',
  'in_person_session',
  'consultation',
  'mentorship_container',
  'other',
] as const;

export const createNextStepSchema = z.object({
  type: z.enum(nextStepTypeValues, { error: 'Select a session type' }),
  mentorSessionOfferingId: z.string().nullable().optional(),
  title: shortTextSchema('Title'),
  description: z.string().trim().max(1000).nullable().optional(),
  scheduledAt: z.string().nullable().optional(),
  durationMinutes: z
    .number()
    .int()
    .min(15, 'Sessions must be at least 15 minutes')
    .max(480)
    .nullable()
    .optional(),
  // In-person cost fields. Null for online sessions.
  travelCost: z.number().int().min(0).nullable().optional(),
  studioCost: z.number().int().min(0).nullable().optional(),
  finalPrice: z.number({ error: 'Enter the final price' }).int().min(0, 'Price cannot be negative'),
  paymentRequired: z.boolean(),
});

export type CreateNextStepFormValues = z.infer<typeof createNextStepSchema>;
