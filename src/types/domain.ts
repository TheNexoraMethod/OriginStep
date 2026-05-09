// Shared domain types and enums for Origin Step.
//
// These types are the authoritative definitions for product-level concepts.
// Feature-level types (full entity shapes) are defined in their respective feature modules
// and are built from these primitives.
//
// Rules:
// - Use literal union types, not string enums, for better TypeScript ergonomics.
// - Keep enums grounded in the product language — not generic technical names.
// - Full entity types (with all fields) live in feature services, not here.

// ─── User and roles ───────────────────────────────────────────────────────────

export type UserRole = 'student' | 'mentor' | 'admin';

export type DanceLevel = 'non_dancer' | 'beginner' | 'intermediate' | 'experienced';

// ─── Dance styles ─────────────────────────────────────────────────────────────

export type StyleCategory =
  | 'hip_hop_foundation'
  | 'house'
  | 'locking'
  | 'popping'
  | 'breaking'
  | 'waacking'
  | 'voguing'
  | 'krump'
  | 'party_groove'
  | 'social_groove'
  | 'experimental'
  | 'contemporary'
  | 'other';

// ─── Video lessons ────────────────────────────────────────────────────────────

export type LessonType =
  | 'groove'
  | 'basics'
  | 'drill'
  | 'social_application'
  | 'practice_guidance'
  | 'cultural_context';

export type DifficultyLevel = 'entry' | 'beginner' | 'intermediate' | 'advanced';

// ─── Mentorship ───────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'accepted'
  | 'declined'
  | 'waitlisted'
  | 'needs_more_context'
  | 'invited_to_next_step';

// Session format is the core discriminator between online and in-person offerings.
// This distinction drives different pricing models, UI presentations, and copy.
export type SessionFormat = 'online' | 'in_person';

export type NextStepType =
  | 'online_session'
  | 'in_person_session'
  | 'consultation'
  | 'mentorship_container'
  | 'other';

export type PaymentStatus = 'pending' | 'paid' | 'waived' | 'refunded';

// ─── Session offerings ────────────────────────────────────────────────────────
//
// Discriminated union enforces which pricing fields are relevant per format.
// In-person sessions have travel and studio cost fields that online sessions do not.
// TypeScript will raise an error if code attempts to access in-person fields on an online offering.

type BaseOffering = {
  id: string;
  mentorId: string;
  title: string;
  description: string;
  basePrice: number; // in minor currency units (pence / cents)
  currency: string;
  durationMinutes: number;
  pricingNotes: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnlineOffering = BaseOffering & {
  format: 'online';
};

export type InPersonOffering = BaseOffering & {
  format: 'in_person';
  travelCostNotes: string | null;
  studioCostNotes: string | null;
};

// The union type used throughout the codebase when working with session offerings.
export type SessionOffering = OnlineOffering | InPersonOffering;

// ─── Next steps ───────────────────────────────────────────────────────────────
//
// A next step is created by a mentor after accepting an application.
// Online next steps have a fixed final price.
// In-person next steps may include travel and studio costs on top of the base price.

type BaseNextStep = {
  id: string;
  applicationId: string;
  type: NextStepType;
  mentorSessionOfferingId: string | null;
  title: string;
  description: string | null;
  scheduledAt: string | null;
  durationMinutes: number | null;
  finalPrice: number; // in minor currency units
  paymentRequired: boolean;
  paymentStatus: PaymentStatus;
  stripeReference: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnlineNextStep = BaseNextStep & {
  format: 'online';
  travelCost: null;
  studioCost: null;
};

export type InPersonNextStep = BaseNextStep & {
  format: 'in_person';
  travelCost: number | null; // in minor currency units
  studioCost: number | null; // in minor currency units
};

export type NextStep = OnlineNextStep | InPersonNextStep;

// ─── Content and saved items ──────────────────────────────────────────────────

export type SavedItemType = 'style' | 'video' | 'mentor';

export type ContentStatus = 'draft' | 'published' | 'archived';
