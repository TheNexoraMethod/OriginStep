// Mentors — Mentor profile and discovery types.

import { SessionFormat, StyleCategory } from '@/types/domain';
import { Database } from '@/types/supabase';

// ─── Mentor Profiles ──────────────────────────────────────────────────────────

// Full mentor profile row, matched with Supabase schema.
export type Mentor = Database['public']['Tables']['mentors']['Row'];

export type MentorInsert = Database['public']['Tables']['mentors']['Insert'];
export type MentorUpdate = Database['public']['Tables']['mentors']['Update'];

// Mentor profile with related offerings for the discovery/detail screen.
export type MentorDetail = Mentor & {
  offerings: MentorSessionOffering[];
  userCount?: number; // derived: count of active applications
};

// Mentor card for list display (minimal subset).
export type MentorCard = Pick<
  Mentor,
  'id' | 'display_name' | 'bio' | 'specialisms' | 'profile_image_url' | 'approved' | 'visible'
> & {
  offerings: MentorSessionOffering[];
};

// Mentor discovery/search filters.
export type MentorFilters = {
  specialisms?: StyleCategory[];
  priceMin?: number;
  priceMax?: number;
  sessionFormat?: SessionFormat;
  country?: string;
  approved?: boolean;
  visible?: boolean;
};

// Admin form for mentor profile edits.
export type MentorFormInput = {
  display_name: string;
  bio: string;
  city?: string | null;
  country?: string | null;
  specialisms: StyleCategory[];
  teaching_values?: string | null;
  intro_video_url?: string | null;
  profile_image_url?: string | null;
};

// ─── Mentor Session Offerings ─────────────────────────────────────────────────

// Full session offering row, matched with Supabase schema.
export type MentorSessionOffering = Database['public']['Tables']['mentor_session_offerings']['Row'];

export type MentorSessionOfferingInsert =
  Database['public']['Tables']['mentor_session_offerings']['Insert'];
export type MentorSessionOfferingUpdate =
  Database['public']['Tables']['mentor_session_offerings']['Update'];

// Offering with pricing details computed for display.
export type MentorSessionOfferingDisplay = MentorSessionOffering & {
  displayPrice: string; // formatted: "£99.99"
  formatted: {
    durationLabel: string; // "60 mins"
    pricePerMinute: number;
  };
};

// Form for creating/editing an offering. Uses discriminated union
// to enforce format-specific fields.
type BaseOfferingFormInput = {
  title: string;
  description: string;
  base_price: number;
  currency?: string;
  duration_minutes: number;
  pricing_notes?: string | null;
  active?: boolean;
};

export type OnlineOfferingFormInput = BaseOfferingFormInput & {
  format: 'online';
};

export type InPersonOfferingFormInput = BaseOfferingFormInput & {
  format: 'in_person';
  travel_cost_notes?: string | null;
  studio_cost_notes?: string | null;
};

export type OfferingFormInput = OnlineOfferingFormInput | InPersonOfferingFormInput;
