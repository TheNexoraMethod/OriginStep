// Admin React Query hooks.

import type { EditorialFormInput } from '@/features/admin/admin.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as adminService from '../services/admin.service';

// ─── Editorial Content Queries ────────────────────────────────────────────────

export function usePublishedContent() {
  return useQuery({
    queryKey: queryKeys.editorial.published(),
    queryFn: () => adminService.fetchPublishedContent(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useContentByStyle(styleId: string | null) {
  return useQuery({
    queryKey: styleId ? queryKeys.editorial.byStyle(styleId) : null,
    queryFn: () => (styleId ? adminService.fetchContentByStyle(styleId) : null),
    enabled: !!styleId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useContentBySlug(slug: string | null) {
  return useQuery({
    queryKey: slug ? queryKeys.editorial.bySlug(slug) : null,
    queryFn: () => (slug ? adminService.fetchContentBySlug(slug) : null),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useAllEditorialContent() {
  return useQuery({
    queryKey: queryKeys.admin.editorialContent.all(),
    queryFn: () => adminService.fetchAllEditorialContent(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useEditorialContentById(contentId: string | null) {
  return useQuery({
    queryKey: contentId ? queryKeys.admin.editorialContent.detail(contentId) : null,
    queryFn: () => (contentId ? adminService.fetchEditorialContentById(contentId) : null),
    enabled: !!contentId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ─── Editorial Content Mutations ──────────────────────────────────────────────

export function useCreateEditorialContent(authorId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: EditorialFormInput) =>
      authorId ? adminService.createEditorialContent(authorId, input) : Promise.reject(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.editorialContent.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.editorial.published() });
    },
  });
}

export function useUpdateEditorialContent(contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<EditorialFormInput>) =>
      adminService.updateEditorialContent(contentId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.editorialContent.detail(contentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.editorialContent.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.editorial.published() });
    },
  });
}

export function usePublishContent(contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => adminService.publishContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.editorialContent.detail(contentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.editorialContent.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.editorial.published() });
    },
  });
}

export function useArchiveContent(contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => adminService.archiveContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.editorialContent.detail(contentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.editorialContent.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.editorial.published() });
    },
  });
}

export function useDeleteEditorialContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: string) => adminService.deleteEditorialContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.editorialContent.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.editorial.published() });
    },
  });
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: () => adminService.fetchAdminStats(),
    staleTime: 1000 * 60, // 1 minute
  });
}
