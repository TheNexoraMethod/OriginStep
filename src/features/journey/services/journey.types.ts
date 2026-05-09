// Journey (saved items) entity types.
//
// A SavedItem is a user bookmark of any content type: style, video, or mentor.
// The `itemType` + `itemId` pattern avoids multiple junction tables and keeps
// the saved items list easy to query in a single request.

import type { SavedItemType } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type SavedItem = {
  id: string;
  userId: string;
  itemType: SavedItemType;
  itemId: string;
  createdAt: string;
};

// ─── With resolved content ────────────────────────────────────────────────────
// The journey screen resolves saved items into their actual content for display.
// These union types represent what a saved item looks like once resolved.

import type { MentorSummary } from '@/features/mentors/services/mentors.types';
import type { DanceStyleSummary } from '@/features/styles/services/styles.types';
import type { VideoLessonSummary } from '@/features/videos/services/videos.types';

export type ResolvedSavedStyle = SavedItem & {
  itemType: 'style';
  style: DanceStyleSummary;
};

export type ResolvedSavedVideo = SavedItem & {
  itemType: 'video';
  video: VideoLessonSummary;
};

export type ResolvedSavedMentor = SavedItem & {
  itemType: 'mentor';
  mentor: MentorSummary;
};

export type ResolvedSavedItem = ResolvedSavedStyle | ResolvedSavedVideo | ResolvedSavedMentor;

// ─── DTOs ────────────────────────────────────────────────────────────────────

export type SaveItemDto = {
  itemType: SavedItemType;
  itemId: string;
};
