// Mentorship — Mentorship application and session types.

import { ApplicationStatus, NextStepType, PaymentStatus } from '@/types/domain';
import { Database } from '@/types/supabase';

// ─── Mentorship Applications ──────────────────────────────────────────────────

// Full application row, matched with Supabase schema.
export type MentorshipApplication = Database['public']['Tables']['mentorship_applications']['Row'];

export type MentorshipApplicationInsert =
  Database['public']['Tables']['mentorship_applications']['Insert'];
export type MentorshipApplicationUpdate =
  Database['public']['Tables']['mentorship_applications']['Update'];

// Application with denormalized mentor details for display.
export type MentorshipApplicationDetail = MentorshipApplication & {
  mentorName?: string;
  mentorImage?: string | null;
};

// Application status flow visualization data.
export type ApplicationStatusInfo = {
  status: ApplicationStatus;
  label: string;
  description: string;
  displayColor: 'success' | 'warning' | 'error' | 'info';
  isTerminal: boolean; // true if no further action possible
};

// Form for applying to a mentor (the 7 questions).
export type ApplicationFormInput = {
  why_this_style: string;
  why_this_mentor: string;
  goals_3_to_6_months: string;
  current_practice: string;
  support_needed: string;
  meaningful_outcome: string;
  optional_media_url?: string | null;
};

// Form for mentor reviewing an application.
export type ApplicationReviewInput = {
  status: ApplicationStatus;
  reviewer_notes?: string | null;
};

// ─── Mentorship Next Steps ────────────────────────────────────────────────────

// Full next step row, matched with Supabase schema.
export type MentorshipNextStep = Database['public']['Tables']['mentorship_next_steps']['Row'];

export type MentorshipNextStepInsert =
  Database['public']['Tables']['mentorship_next_steps']['Insert'];
export type MentorshipNextStepUpdate =
  Database['public']['Tables']['mentorship_next_steps']['Update'];

// Next step with computed derived fields for display.
export type MentorshipNextStepDetail = MentorshipNextStep & {
  applicationId?: string;
  mentorName?: string;
  displayCost?: string; // formatted: "£150 + £50 travel"
};

// Form for creating a next step after accepting an application.
// Uses discriminated union to enforce format-specific fields.
type BaseNextStepFormInput = {
  type: NextStepType;
  title: string;
  description?: string | null;
  scheduled_at?: string | null;
  duration_minutes?: number | null;
  final_price: number;
  payment_required?: boolean;
  stripe_reference?: string | null;
};

export type OnlineNextStepFormInput = BaseNextStepFormInput & {
  format: 'online';
};

export type InPersonNextStepFormInput = BaseNextStepFormInput & {
  format: 'in_person';
  travel_cost?: number | null;
  studio_cost?: number | null;
};

export type NextStepFormInput = OnlineNextStepFormInput | InPersonNextStepFormInput;

// Payment tracking.
export type PaymentInfo = {
  status: PaymentStatus;
  nextStepId: string;
  amount: number;
  currency: string;
  stripeReference?: string | null;
};
