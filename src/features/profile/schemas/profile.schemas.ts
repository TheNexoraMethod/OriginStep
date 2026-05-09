// Profile update form schema.

import { shortTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: shortTextSchema('Full name').max(100, 'Name is too long'),
  avatarUrl: z.string().url('Avatar must be a valid URL').nullable().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
