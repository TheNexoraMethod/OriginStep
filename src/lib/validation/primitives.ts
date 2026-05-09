// Shared Zod primitives.
//
// Reusable schema fragments used across multiple feature schemas.
// Keep these small and composable. Do not import application types here —
// this file must remain dependency-free so it can be used anywhere.

import { z } from 'zod';

// ─── String primitives ────────────────────────────────────────────────────────

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long');

// Named URL — only used for optional media links where we want to accept relative or
// social URLs (e.g. /instagram/...) as well as full https:// URLs.
export const optionalUrlSchema = z
  .string()
  .trim()
  .max(2048, 'URL is too long')
  .nullable()
  .optional();

// Short free-text: names, titles, labels
export const shortTextSchema = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`).max(200, `${fieldName} is too long`);

// Long free-text: bios, descriptions, application answers
export const longTextSchema = (fieldName: string, minLength = 20) =>
  z
    .string()
    .trim()
    .min(minLength, `${fieldName} must be at least ${minLength} characters`)
    .max(2000, `${fieldName} is too long`);

// Medium free-text: goals, context answers (shorter than bio, longer than title)
export const mediumTextSchema = (fieldName: string, minLength = 10) =>
  z
    .string()
    .trim()
    .min(minLength, `${fieldName} must be at least ${minLength} characters`)
    .max(800, `${fieldName} is too long`);
