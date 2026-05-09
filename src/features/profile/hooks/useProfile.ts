// Profile React Query hooks.

import type { UpdateProfileInput } from '@/features/profile/profile.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as profileService from './profile.service';

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile.me(userId),
    queryFn: () => profileService.fetchProfile(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAllProfiles() {
  return useQuery({
    queryKey: queryKeys.admin.users.all(),
    queryFn: () => profileService.fetchAllProfiles(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdateProfileInput) => profileService.updateProfile(userId, updates),
    onSuccess: (updated) => {
      // Update the cached profile
      queryClient.setQueryData(queryKeys.profile.me(userId), updated);
      // Invalidate admin profile list
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.all() });
    },
  });
}

export function useCompleteOnboarding(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileService.completeOnboarding(userId),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.profile.me(userId), updated);
    },
  });
}

export function useSetInterestedInMentorship(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interested: boolean) =>
      profileService.setInterestedInMentorship(userId, interested),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.profile.me(userId), updated);
    },
  });
}

export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      newRole,
    }: {
      userId: string;
      newRole: 'student' | 'mentor' | 'admin';
    }) => profileService.changeUserRole(userId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.all() });
    },
  });
}

export function useResetUserOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => profileService.resetUserOnboarding(userId),
    onSuccess: (_, userId) => {
      queryClient.setQueryData(queryKeys.profile.me(userId), undefined);
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.all() });
    },
  });
}
