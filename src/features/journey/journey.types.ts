// Journey — Bookmarking and saved items types.

import { StyleCategory } from '@/types/domain';
import { Database } from '@/types/supabase';

// ─── Saved Items ──────────────────────────────────────────────────────────────

// Full saved item row, matched with Supabase schema.
export type SavedItem = Database['public']['Tables']['saved_items']['Row'];

export type SavedItemInsert = Database['public']['Tables']['saved_items']['Insert'];

// Saved item type discriminator for polymorphic queries.
export type SavedItemType = 'style' | 'video' | 'mentor';

// Saved item with denormalized content details for display.
export type SavedItemDetail = SavedItem & {
  content: SavedItemContent;
};

// Content can be one of several types based on item_type discriminator.
export type SavedItemContent =
  | {
      type: 'style';
      id: string;
      name: string;
      slug: string;
      thumbnail_url: string | null;
      category: StyleCategory;
    }
  | {
      type: 'video';
      id: string;
      title: string;
      slug: string;
      thumbnail_url: string | null;
      duration_seconds: number;
      style_name: string;
    }
  | {
      type: 'mentor';
      id: string;
      display_name: string;
      profile_image_url: string | null;
      bio: string;
      specialisms: StyleCategory[];
    };

// Journey page filters.
export type JourneyFilters = {
  itemType?: SavedItemType;
  search?: string;
  sortBy?: 'recent' | 'oldest';
};

// Aggregate stats about user's journey/bookmarks.
export type JourneyStats = {
  totalSaved: number;
  stylesSaved: number;
  videosSaved: number;
  mentorsSaved: number;
};
