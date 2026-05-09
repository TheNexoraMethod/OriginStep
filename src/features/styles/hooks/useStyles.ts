// Styles (dance styles) React Query hooks.

import type { StyleFormInput } from '@/features/styles/styles.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as stylesService from '../services/styles.service';

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useAllStyles() {
  return useQuery({
    queryKey: queryKeys.styles.all(),
    queryFn: () => stylesService.fetchAllStyles(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useStyleById(styleId: string | null) {
  return useQuery({
    queryKey: styleId ? queryKeys.styles.detail(styleId) : null,
    queryFn: () => (styleId ? stylesService.fetchStyleById(styleId) : null),
    enabled: !!styleId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useStyleBySlug(slug: string | null) {
  return useQuery({
    queryKey: slug ? queryKeys.styles.bySlug(slug) : null,
    queryFn: () => (slug ? stylesService.fetchStyleBySlug(slug) : null),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useStylesByCategory(category: string | null) {
  return useQuery({
    queryKey: category ? queryKeys.styles.list({ category }) : null,
    queryFn: () => (category ? stylesService.fetchStylesByCategory(category) : null),
    enabled: !!category,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateStyle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: StyleFormInput) => stylesService.createStyle(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.styles.all() });
    },
  });
}

export function useUpdateStyle(styleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<StyleFormInput>) => stylesService.updateStyle(styleId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.styles.detail(styleId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.styles.all() });
    },
  });
}

export function useDeleteStyle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (styleId: string) => stylesService.deleteStyle(styleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.styles.all() });
    },
  });
}
