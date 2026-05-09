// Auth form schemas.
//
// These schemas are the single source of truth for form field types and validation
// in the sign-in and sign-up screens. React Hook Form uses them via zodResolver.

import { emailSchema, passwordSchema, shortTextSchema } from '@/lib/validation/primitives';
import { z } from 'zod';

// ─── Sign in ──────────────────────────────────────────────────────────────────

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// ─── Sign up ──────────────────────────────────────────────────────────────────

export const signUpSchema = z
  .object({
    fullName: shortTextSchema('Full name').max(100, 'Name is too long'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
