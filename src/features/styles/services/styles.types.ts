// Dance style entity types.
//
// The dance_styles table is the archive foundation of the product.
// Each style is an editorial record representing a movement form with cultural context.

import type { StyleCategory } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type DanceStyle = {
  id: string;
  slug: string;
  name: string;
  category: StyleCategory;
  originRegion: string | null;
  era: string | null;
  summary: string;
  culturalContext: string | null;
  // Stored as a JSON array in the DB. Null until editorial content is added.
  keyFigures: string[] | null;
  practiceContext: string | null;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─── List/card variant ────────────────────────────────────────────────────────
// Lightweight shape used in cards and grids — avoids over-fetching full editorial content.

export type DanceStyleSummary = Pick<
  DanceStyle,
  'id' | 'slug' | 'name' | 'category' | 'originRegion' | 'era' | 'summary' | 'thumbnailUrl'
>;

// ─── Filter shape ─────────────────────────────────────────────────────────────
// Used by the explore screen and style list query hook.

export type StyleListFilters = {
  category?: StyleCategory;
  originRegion?: string;
  era?: string;
  search?: string;
};
