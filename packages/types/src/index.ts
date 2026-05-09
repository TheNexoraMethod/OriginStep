// ─── User ─────────────────────────────────────────────────────────────────────

export type Profile = {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  is_premium: boolean
  premium_expires_at: string | null
  stripe_customer_id: string | null
  created_at: string
}

// ─── Dance Styles ─────────────────────────────────────────────────────────────

export type DanceStyle = {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image_url: string | null
  display_order: number | null
  is_active: boolean
}

export type DanceLevel = {
  id: string
  style_id: string
  name: string
  display_order: number | null
  is_premium: boolean
}

// ─── Lessons ──────────────────────────────────────────────────────────────────

export type Lesson = {
  id: string
  level_id: string
  title: string
  description: string | null
  video_url: string
  pose_data_url: string | null
  duration_seconds: number | null
  display_order: number | null
  is_premium: boolean
  is_active: boolean
  created_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  last_watched_at: string | null
}

// ─── Practice ─────────────────────────────────────────────────────────────────

export type BodyPartScores = {
  leftArm?: number
  rightArm?: number
  leftLeg?: number
  rightLeg?: number
  hips?: number
  torso?: number
  head?: number
}

export type PracticeRecording = {
  id: string
  user_id: string
  lesson_id: string
  similarity_score: number | null
  body_part_scores: BodyPartScores | null
  recorded_at: string
}

// ─── Mentors ──────────────────────────────────────────────────────────────────

export type CredentialTier = 'verified' | 'master' | 'world_champion'

export type Mentor = {
  id: string
  user_id: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  credential_tier: CredentialTier | null
  style_specialisms: string[]
  hourly_rate_gbp: number | null
  intro_video_url: string | null
  is_active: boolean
  is_featured: boolean
  created_at: string
}

export type MentorAvailability = {
  id: string
  mentor_id: string
  available_from: string
  available_to: string
  is_booked: boolean
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  user_id: string
  mentor_id: string
  availability_id: string
  stripe_payment_intent_id: string | null
  status: BookingStatus
  session_notes_user: string | null
  session_notes_mentor: string | null
  recording_id: string | null
  created_at: string
}

// ─── Plans ────────────────────────────────────────────────────────────────────

export type BillingPeriod = 'monthly' | 'annual'

export type Plan = {
  id: string
  name: string
  stripe_price_id: string | null
  price_gbp: number | null
  billing_period: BillingPeriod | null
  features: string[] | null
  is_active: boolean
}

// ─── Platform Content ─────────────────────────────────────────────────────────

export type Perk = {
  id: string
  title: string
  description: string | null
  partner_name: string | null
  discount_percent: number | null
  promo_code: string | null
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  premium_only: boolean
}

export type Challenge = {
  id: string
  title: string
  description: string | null
  style_id: string | null
  starts_at: string | null
  ends_at: string | null
  is_active: boolean
}

export type AppConfig = {
  key: string
  value: unknown
  description: string | null
}

export type AppConfigKey =
  | 'pose_tracking_enabled'
  | 'featured_styles'
  | 'web_checkout_url'
