// Mentors React Query hooks.

import type { MentorFormInput, OfferingFormInput } from '@/features/mentors/mentors.types';
import { queryKeys } from '@/lib/query/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as mentorsService from '../services/mentors.service';

// ─── Mentor Queries ───────────────────────────────────────────────────────────

export function useDiscoverableMentors() {
  return useQuery({
    queryKey: queryKeys.mentors.list(),
    queryFn: () => mentorsService.fetchDiscoverableMentors(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useAllMentors() {
  return useQuery({
    queryKey: queryKeys.admin.mentors.all(),
    queryFn: () => mentorsService.fetchAllMentors(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useMentorById(mentorId: string | null) {
  return useQuery({
    queryKey: mentorId ? queryKeys.mentors.detail(mentorId) : null,
    queryFn: () => (mentorId ? mentorsService.fetchMentorById(mentorId) : null),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUserMentorProfile(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.mentors.me(userId) : null,
    queryFn: () => (userId ? mentorsService.fetchUserMentorProfile(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePendingMentors() {
  return useQuery({
    queryKey: queryKeys.admin.mentors.pending(),
    queryFn: () => mentorsService.fetchPendingMentors(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMentorOfferings(mentorId: string | null) {
  return useQuery({
    queryKey: mentorId ? queryKeys.offerings.forMentor(mentorId) : null,
    queryFn: () => (mentorId ? mentorsService.fetchMentorOfferings(mentorId) : null),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMentorAllOfferings(mentorId: string | null) {
  return useQuery({
    queryKey: mentorId ? queryKeys.offerings.forMentor(mentorId) : null,
    queryFn: () => (mentorId ? mentorsService.fetchMentorAllOfferings(mentorId) : null),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useOfferingById(offeringId: string | null) {
  return useQuery({
    queryKey: offeringId ? queryKeys.offerings.forMentor(offeringId) : null,
    queryFn: () => (offeringId ? mentorsService.fetchOfferingById(offeringId) : null),
    enabled: !!offeringId,
  });
}

// ─── Mentor Mutations ─────────────────────────────────────────────────────────

export function useCreateMentorProfile(userId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: MentorFormInput) =>
      userId ? mentorsService.createMentorProfile(userId, input) : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.mentors.me(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors.all() });
      }
    },
  });
}

export function useUpdateMentorProfile(mentorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Parameters<typeof mentorsService.updateMentorProfile>[1]) =>
      mentorsService.updateMentorProfile(mentorId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.list() });
    },
  });
}

export function useApproveMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mentorId: string) => mentorsService.approveMentor(mentorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors.pending() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.list() });
    },
  });
}

export function useDeclineMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mentorId: string) => mentorsService.declineMentor(mentorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors.pending() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors.all() });
    },
  });
}

export function useToggleMentorVisibility(mentorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (visible: boolean) => mentorsService.toggleMentorVisibility(mentorId, visible),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.list() });
    },
  });
}

// ─── Offering Mutations ───────────────────────────────────────────────────────

export function useCreateOffering(mentorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: OfferingFormInput) => mentorsService.createOffering(mentorId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offerings.forMentor(mentorId) });
    },
  });
}

export function useUpdateOffering(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Parameters<typeof mentorsService.updateOffering>[1]) =>
      mentorsService.updateOffering(offeringId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offerings.forMentor(offeringId) });
    },
  });
}

export function useDeactivateOffering(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mentorsService.deactivateOffering(offeringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offerings.forMentor(offeringId) });
    },
  });
}

export function useDeleteOffering(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mentorsService.deleteOffering(offeringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offerings.forMentor(offeringId) });
    },
  });
}
