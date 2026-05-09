// Videos (lessons and progress) React Query hooks.

import type { VideoProgressInput } from '@/features/videos/videos.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as videosService from '../services/videos.service';

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useAllLessons() {
  return useQuery({
    queryKey: queryKeys.videos.all(),
    queryFn: () => videosService.fetchAllLessons(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useLessonsByStyle(styleId: string | null) {
  return useQuery({
    queryKey: styleId ? queryKeys.videos.byStyle(styleId) : null,
    queryFn: () => (styleId ? videosService.fetchLessonsByStyle(styleId) : null),
    enabled: !!styleId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useLessonById(lessonId: string | null) {
  return useQuery({
    queryKey: lessonId ? queryKeys.videos.detail(lessonId) : null,
    queryFn: () => (lessonId ? videosService.fetchLessonById(lessonId) : null),
    enabled: !!lessonId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useVideoProgress(userId: string | null, videoId: string | null) {
  return useQuery({
    queryKey: userId && videoId ? queryKeys.videos.progress.detail(userId, videoId) : null,
    queryFn: () => (userId && videoId ? videosService.fetchVideoProgress(userId, videoId) : null),
    enabled: !!(userId && videoId),
  });
}

export function useAllUserProgress(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.videos.progress.all(userId) : null,
    queryFn: () => (userId ? videosService.fetchAllUserProgress(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useProgressStats(userId: string | null, styleId: string | null) {
  return useQuery({
    queryKey: userId && styleId ? queryKeys.videos.list({ userId, styleId }) : null,
    queryFn: () => (userId && styleId ? videosService.getProgressStats(userId, styleId) : null),
    enabled: !!(userId && styleId),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useUpdateVideoProgress(userId: string, videoId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: VideoProgressInput) =>
      videosService.updateVideoProgress(userId, videoId, updates),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.videos.progress.detail(userId, videoId), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.progress.all(userId) });
    },
  });
}

export function useCompleteLesson(userId: string, videoId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => videosService.completeLesson(userId, videoId),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.videos.progress.detail(userId, videoId), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.progress.all(userId) });
    },
  });
}

export function useClearLessonProgress(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId }: { videoId: string }) =>
      userId ? videosService.clearLessonProgress(userId, videoId) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.videos.progress.all(userId) });
      }
    },
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Parameters<typeof videosService.createLesson>[0]) =>
      videosService.createLesson(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() });
    },
  });
}

export function useUpdateLesson(lessonId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Parameters<typeof videosService.updateLesson>[1]) =>
      videosService.updateLesson(lessonId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.detail(lessonId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() });
    },
  });
}
