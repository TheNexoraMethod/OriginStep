// Journey (bookmarks) React Query hooks.

import type { SavedItemType } from '@/features/journey/journey.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as journeyService from '../services/journey.service';

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useUserSavedItems(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.journey.savedItems(userId) : null,
    queryFn: () => (userId ? journeyService.fetchUserSavedItems(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUserSavedItemsByType(userId: string | null, itemType: SavedItemType) {
  return useQuery({
    queryKey: userId ? queryKeys.journey.savedByType(userId, itemType) : null,
    queryFn: () => (userId ? journeyService.fetchUserSavedItemsByType(userId, itemType) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useIsItemSaved(
  userId: string | null,
  itemType: SavedItemType | null,
  itemId: string | null,
) {
  return useQuery({
    queryKey: userId && itemType && itemId ? queryKeys.journey.savedItems(userId) : null,
    queryFn: () =>
      userId && itemType && itemId ? journeyService.isItemSaved(userId, itemType, itemId) : null,
    enabled: !!(userId && itemType && itemId),
  });
}

export function useSavedItemsCounts(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.journey.savedItems(userId) : null,
    queryFn: () => (userId ? journeyService.countSavedItemsByType(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useSaveItem(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { itemType: SavedItemType; itemId: string }) =>
      userId ? journeyService.saveItem(userId, input.itemType, input.itemId) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.journey.savedItems(userId) });
      }
    },
  });
}

export function useRemoveSavedItem(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { itemType: SavedItemType; itemId: string }) =>
      userId
        ? journeyService.removeSavedItem(userId, input.itemType, input.itemId)
        : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.journey.savedItems(userId) });
      }
    },
  });
}

export function useClearSavedItemsByType(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemType: SavedItemType) =>
      userId ? journeyService.clearSavedItemsByType(userId, itemType) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.journey.savedItems(userId) });
      }
    },
  });
}

export function useClearAllSavedItems(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (userId ? journeyService.clearAllSavedItems(userId) : Promise.reject()),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.journey.savedItems(userId) });
      }
    },
  });
}
