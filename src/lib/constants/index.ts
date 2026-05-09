export const APP_NAME = 'Origin Step';
export const APP_TAGLINE = 'Foundation. Groove. Lineage.';

// Supported currencies for session pricing
export const SUPPORTED_CURRENCIES = ['GBP', 'USD', 'EUR'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export const DEFAULT_CURRENCY: SupportedCurrency = 'GBP';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;

// Supabase Storage bucket names.
// Centralised here so they can be referenced consistently across all services.
// These must be created in the Supabase dashboard before use.
export const STORAGE_BUCKETS = {
  avatars: 'avatars',
  mentorProfiles: 'mentor-profiles',
  introVideos: 'intro-videos',
  lessonVideos: 'lesson-videos',
  thumbnails: 'thumbnails',
} as const;

// Human-readable labels for application status values.
// Used in UI badges and status displays.
export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  in_review: 'In Review',
  accepted: 'Accepted',
  declined: 'Declined',
  waitlisted: 'Waitlisted',
  needs_more_context: 'More Context Needed',
  invited_to_next_step: 'Next Step Ready',
};

// Human-readable labels for session formats
export const SESSION_FORMAT_LABELS: Record<string, string> = {
  online: 'Online Session',
  in_person: 'In-Person Session',
};
