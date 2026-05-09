// Videos — Video lesson types and progress tracking.

import { DifficultyLevel, LessonType } from '@/types/domain';
import { Database } from '@/types/supabase';

// ─── Video Lessons ────────────────────────────────────────────────────────────

// Full video lesson row, matched with Supabase schema.
export type VideoLesson = Database['public']['Tables']['video_lessons']['Row'];

export type VideoLessonInsert = Database['public']['Tables']['video_lessons']['Insert'];
export type VideoLessonUpdate = Database['public']['Tables']['video_lessons']['Update'];

// Lesson with progress state (for displaying watch status in lists).
export type LessonWithProgress = VideoLesson & {
  progress?: VideoProgress | null;
};

// Filters for lesson catalog queries.
export type LessonFilters = {
  styleId?: string;
  lessonType?: LessonType;
  difficulty?: DifficultyLevel;
  search?: string;
  watched?: boolean; // true = filter to lessons user has started
  completed?: boolean; // true = filter to completed lessons only
};

// ─── User Video Progress ──────────────────────────────────────────────────────

// User's progress on a single lesson (watched_at, completion_percent, etc.)
export type VideoProgress = Database['public']['Tables']['user_video_progress']['Row'];

export type VideoProgressInsert = Database['public']['Tables']['user_video_progress']['Insert'];
export type VideoProgressUpdate = Database['public']['Tables']['user_video_progress']['Update'];

// Shape for updating progress from the video player.
export type VideoProgressInput = {
  completion_percent: number; // 0-100
  completed?: boolean;
  notes?: string | null;
};

// Aggregated stats about user's progress across all lessons.
export type ProgressStats = {
  totalLessons: number;
  totalWatched: number;
  totalCompleted: number;
  completionPercent: number;
  averageCompletionPercent: number;
};

// Video player state (for persistence across navigation).
export type VideoPlayerState = {
  videoId: string;
  currentTime: number;
  completionPercent: number;
  playbackRate: number;
  autoplay: boolean;
};
