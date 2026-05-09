// Session offering form schemas.
//
// Used in the mentor dashboard when creating or editing session offerings.
// Online and in-person formats have different fields, so they use separate schemas.
// A discriminated union schema handles both cases for create.

import { SUPPORTED_CURRENCIES } from '@/lib/constants';
import { longTextSchema, shortTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

// ─── Shared base ──────────────────────────────────────────────────────────────

const baseOfferingSchema = z.object({
  title: shortTextSchema('Session title'),
  description: longTextSchema('Description', 15),
  // Price in minor currency units (pence / cents). UI handles the conversion.
  basePrice: z
    .number({ error: 'Enter a price' })
    .int('Price must be a whole number in pence or cents')
    .min(0, 'Price cannot be negative')
    .max(1_000_000, 'Price is too high'),
  currency: z.enum(SUPPORTED_CURRENCIES, { error: 'Select a currency' }),
  durationMinutes: z
    .number({ error: 'Enter a duration' })
    .int()
    .min(15, 'Sessions must be at least 15 minutes')
    .max(480, 'Sessions cannot exceed 8 hours'),
  pricingNotes: z.string().trim().max(500, 'Pricing notes are too long').nullable().optional(),
});

// ─── Online offering schema ───────────────────────────────────────────────────

export const onlineOfferingSchema = baseOfferingSchema.extend({
  format: z.literal('online'),
});

export type OnlineOfferingFormValues = z.infer<typeof onlineOfferingSchema>;

// ─── In-person offering schema ────────────────────────────────────────────────

export const inPersonOfferingSchema = baseOfferingSchema.extend({
  format: z.literal('in_person'),
  travelCostNotes: z.string().trim().max(500, 'Travel notes are too long').nullable().optional(),
  studioCostNotes: z.string().trim().max(500, 'Studio notes are too long').nullable().optional(),
});

export type InPersonOfferingFormValues = z.infer<typeof inPersonOfferingSchema>;

// ─── Combined discriminated union schema ──────────────────────────────────────

export const offeringSchema = z.discriminatedUnion('format', [
  onlineOfferingSchema,
  inPersonOfferingSchema,
]);

export type OfferingFormValues = z.infer<typeof offeringSchema>;
