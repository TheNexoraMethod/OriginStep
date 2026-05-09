// Video lesson entity types.
//
// video_lessons are structured learning content associated with a dance style.
// user_video_progress tracks an individual user's engagement with each lesson.

import type { DifficultyLevel, LessonType } from '@/types/domain';

// ─── Core entity ──────────────────────────────────────────────────────────────

export type VideoLesson = {
  id: string;
  styleId: string;
  title: string;
  slug: string;
  description: string | null;
  lessonType: LessonType;
  difficulty: DifficultyLevel;
  durationSeconds: number;
  videoUrl: string; // abstract URL — points to Supabase Storage or a CDN; never hardcoded
  thumbnailUrl: string | null;
  instructorName: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

// ─── Card/list variant ────────────────────────────────────────────────────────
// Lightweight shape used in lesson lists and video cards — omits the full video URL
// until the user opens the detail screen.

export type VideoLessonSummary = Pick<
  VideoLesson,
  | 'id'
  | 'styleId'
  | 'title'
  | 'slug'
  | 'lessonType'
  | 'difficulty'
  | 'durationSeconds'
  | 'thumbnailUrl'
  | 'instructorName'
  | 'orderIndex'
>;

// ─── Progress tracking ────────────────────────────────────────────────────────

export type VideoProgress = {
  id: string;
  userId: string;
  videoId: string;
  watchedAt: string;
  completed: boolean;
  completionPercent: number; // 0–100
  notes: string | null;
  updatedAt: string;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

export type UpsertVideoProgressDto = {
  videoId: string;
  completed: boolean;
  completionPercent: number;
  notes?: string | null;
};

// ─── Filter shape ─────────────────────────────────────────────────────────────

export type VideoListFilters = {
  styleId?: string;
  lessonType?: LessonType;
  difficulty?: DifficultyLevel;
};
