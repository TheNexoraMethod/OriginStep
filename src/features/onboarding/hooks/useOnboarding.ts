// Onboarding React Query hooks.

import { queryKeys } from '@/lib/query/keys';
import type { DanceLevel } from '@/types/domain';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as onboardingService from '../services/onboarding.service';

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useUserInterests(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.interests.mine(userId) : null,
    queryFn: () => (userId ? onboardingService.fetchUserInterests(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useAddUserInterest(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (styleId: string) =>
      userId ? onboardingService.addUserInterest(userId, styleId) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.interests.mine(userId) });
      }
    },
  });
}

export function useRemoveUserInterest(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (styleId: string) =>
      userId ? onboardingService.removeUserInterest(userId, styleId) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.interests.mine(userId) });
      }
    },
  });
}

export function useSetUserInterests(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (styleIds: string[]) =>
      userId ? onboardingService.setUserInterests(userId, styleIds) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.interests.mine(userId) });
      }
    },
  });
}

export function useCompleteDanceLevelStep(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (danceLevel: DanceLevel) =>
      userId ? onboardingService.completeDanceLevelStep(userId, danceLevel) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.profile.me(userId) });
      }
    },
  });
}

export function useCompleteLearningGoalsStep(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { goals: string[]; interested: boolean }) =>
      userId
        ? onboardingService.completeLearningGoalsStep(userId, input.goals, input.interested)
        : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.profile.me(userId) });
      }
    },
  });
}
