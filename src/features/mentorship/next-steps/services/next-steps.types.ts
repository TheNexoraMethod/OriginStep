// Next step entity types.
//
// A MentorshipNextStep is created by a mentor after accepting an application.
// It represents a concrete offer: a specific session format, price, and schedule.
//
// This is the entity that bridges approval → payment → session.
// Payment is only created AFTER a next step exists and the user has been notified.
//
// The discriminated union from src/types/domain.ts is the canonical type.
// This file adds the WithContext join and DTOs for mentor creation.

import type { NextStep, NextStepType, PaymentStatus, SessionOffering } from '@/types/domain';

export type { NextStep };

// ─── With context ─────────────────────────────────────────────────────────────
// Used on the student-facing approved next-step screen.
// Includes the session offering template the mentor selected, for transparent pricing display.

export type NextStepWithOffering = NextStep & {
  offering: SessionOffering | null;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

// Payload when a mentor creates a next step for an accepted applicant.
// For in-person sessions, travel_cost and studio_cost may be set explicitly
// on top of the offering's base_price to produce the final_price.
export type CreateNextStepDto = {
  applicationId: string;
  type: NextStepType;
  mentorSessionOfferingId?: string | null;
  title: string;
  description?: string | null;
  scheduledAt?: string | null;
  durationMinutes?: number | null;
  // For online sessions: finalPrice = offering.basePrice
  // For in-person sessions: finalPrice = basePrice + travelCost + studioCost
  travelCost?: number | null;
  studioCost?: number | null;
  finalPrice: number; // in minor currency units — always explicitly set by mentor
  paymentRequired: boolean;
};

// Payload for updating payment status — called after Stripe webhook confirms payment.
export type UpdateNextStepPaymentDto = {
  paymentStatus: PaymentStatus;
  stripeReference?: string | null;
};
