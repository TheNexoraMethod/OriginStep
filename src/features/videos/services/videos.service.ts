// Videos (video lessons and progress tracking) service.

import type {
  ProgressStats,
  VideoLesson,
  VideoProgress,
  VideoProgressInput,
} from '@/features/videos/videos.types';
import { supabase } from '@/lib/supabase/client';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all video lessons (admin view).
 */
export async function fetchAllLessons(): Promise<VideoLesson[]> {
  const { data, error } = await supabase
    .from('video_lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Fetch video lessons for a specific dance style.
 */
export async function fetchLessonsByStyle(styleId: string): Promise<VideoLesson[]> {
  const { data, error } = await supabase
    .from('video_lessons')
    .select('*')
    .eq('style_id', styleId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single video lesson by ID.
 */
export async function fetchLessonById(lessonId: string): Promise<VideoLesson | null> {
  const { data, error } = await supabase
    .from('video_lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch a user's progress on a specific lesson.
 */
export async function fetchVideoProgress(
  userId: string,
  videoId: string,
): Promise<VideoProgress | null> {
  const { data, error } = await supabase
    .from('user_video_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch all of a user's video progress records.
 */
export async function fetchAllUserProgress(userId: string): Promise<VideoProgress[]> {
  const { data, error } = await supabase
    .from('user_video_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

/**
 * Calculate progress statistics for a user across a style.
 */
export async function getProgressStats(userId: string, styleId: string): Promise<ProgressStats> {
  // Fetch all lessons in the style
  const { data: lessons, error: lessonsError } = await supabase
    .from('video_lessons')
    .select('id')
    .eq('style_id', styleId);

  if (lessonsError) throw lessonsError;

  const lessonIds = lessons.map((l) => l.id);
  if (lessonIds.length === 0) {
    return {
      totalLessons: 0,
      totalWatched: 0,
      totalCompleted: 0,
      completionPercent: 0,
      averageCompletionPercent: 0,
    };
  }

  // Fetch user's progress for those lessons
  const { data: progress, error: progressError } = await supabase
    .from('user_video_progress')
    .select('*')
    .eq('user_id', userId)
    .in('video_id', lessonIds);

  if (progressError) throw progressError;

  const totalWatched = progress.filter((p) => p.watched_at).length;
  const totalCompleted = progress.filter((p) => p.completed).length;
  const averageCompletionPercent =
    progress.length > 0
      ? progress.reduce((sum, p) => sum + p.completion_percent, 0) / progress.length
      : 0;

  return {
    totalLessons: lessonIds.length,
    totalWatched,
    totalCompleted,
    completionPercent:
      totalCompleted > 0 ? Math.round((totalCompleted / lessonIds.length) * 100) : 0,
    averageCompletionPercent: Math.round(averageCompletionPercent),
  };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Update or create a user's progress on a video lesson (upsert pattern).
 */
export async function updateVideoProgress(
  userId: string,
  videoId: string,
  updates: VideoProgressInput,
): Promise<VideoProgress> {
  const { data, error } = await supabase
    .from('user_video_progress')
    .upsert(
      {
        user_id: userId,
        video_id: videoId,
        ...updates,
        watched_at: new Date().toISOString(),
      },
      { onConflict: 'user_id, video_id' },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark a lesson as completed.
 */
export async function completeLesson(userId: string, videoId: string): Promise<VideoProgress> {
  return updateVideoProgress(userId, videoId, {
    completion_percent: 100,
    completed: true,
  });
}

/**
 * Clear a user's progress on a lesson.
 */
export async function clearLessonProgress(userId: string, videoId: string): Promise<void> {
  const { error } = await supabase
    .from('user_video_progress')
    .delete()
    .eq('user_id', userId)
    .eq('video_id', videoId);

  if (error) throw error;
}

/**
 * Create a new video lesson (admin only).
 */
export async function createLesson(
  input: Omit<VideoLesson, 'id' | 'created_at' | 'updated_at'>,
): Promise<VideoLesson> {
  const { data, error } = await supabase.from('video_lessons').insert([input]).select().single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing video lesson (admin only).
 */
export async function updateLesson(
  lessonId: string,
  updates: Partial<Omit<VideoLesson, 'id' | 'created_at' | 'updated_at'>>,
): Promise<VideoLesson> {
  const { data, error } = await supabase
    .from('video_lessons')
    .update(updates)
    .eq('id', lessonId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
