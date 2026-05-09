// Notes form schema.
//
// Used in the video player screen for per-lesson note-taking.
// Deliberately minimal — just a textarea.

import { z } from 'zod';

export const videoNotesSchema = z.object({
  notes: z.string().trim().max(2000, 'Notes cannot exceed 2000 characters').nullable().optional(),
});

export type VideoNotesFormValues = z.infer<typeof videoNotesSchema>;
