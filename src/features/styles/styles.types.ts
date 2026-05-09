// Styles — Dance style catalog types.

import { StyleCategory } from '@/types/domain';
import { Database } from '@/types/supabase';

// Full dance style row, matched with Supabase schema.
export type DanceStyle = Database['public']['Tables']['dance_styles']['Row'];

export type DanceStyleInsert = Database['public']['Tables']['dance_styles']['Insert'];
export type DanceStyleUpdate = Database['public']['Tables']['dance_styles']['Update'];

// Style with additional display fields for cards and detail screens.
export type StyleCard = DanceStyle & {
  lessonCount?: number; // derived from lessons count
  savedByUser?: boolean; // derived from saved_items query
};

// Style filters/search.
export type StyleFilters = {
  category?: StyleCategory;
  search?: string;
  saved?: boolean; // true = only show user's saved styles
};

// Admin form for creating/editing styles.
export type StyleFormInput = {
  slug: string;
  name: string;
  category: StyleCategory;
  origin_region?: string | null;
  era?: string | null;
  summary: string;
  cultural_context?: string | null;
  key_figures?: string[] | null;
  practice_context?: string | null;
  thumbnail_url?: string | null;
};
