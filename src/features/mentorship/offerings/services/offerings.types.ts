// Session offering entity types.
//
// A MentorSessionOffering is a reusable offering template configured by a mentor.
// It defines a format (online | in_person), base pricing, duration, and notes.
//
// Offerings are the building blocks that mentors attach to approved next steps.
// They are NOT directly sold — they are selected after an application is accepted.
//
// The discriminated union from src/types/domain.ts is the canonical type.
// This file adds DTOs and service-specific shapes.

import type { InPersonOffering, OnlineOffering, SessionOffering } from '@/types/domain';

export type { InPersonOffering, OnlineOffering, SessionOffering };

// ─── DTOs ────────────────────────────────────────────────────────────────────

// Used when a mentor creates a new online session offering.
export type CreateOnlineOfferingDto = {
  format: 'online';
  title: string;
  description: string;
  basePrice: number; // in minor currency units
  currency: string;
  durationMinutes: number;
  pricingNotes?: string | null;
};

// Used when a mentor creates a new in-person session offering.
// Travel and studio cost notes are surfaced to applicants for transparency.
export type CreateInPersonOfferingDto = {
  format: 'in_person';
  title: string;
  description: string;
  basePrice: number; // in minor currency units
  currency: string;
  durationMinutes: number;
  pricingNotes?: string | null;
  travelCostNotes?: string | null;
  studioCostNotes?: string | null;
};

export type CreateOfferingDto = CreateOnlineOfferingDto | CreateInPersonOfferingDto;

// Partial update — all fields optional. Format cannot be changed after creation.
export type UpdateOfferingDto = Partial<
  Omit<CreateOnlineOfferingDto | CreateInPersonOfferingDto, 'format'>
> & {
  active?: boolean;
};
