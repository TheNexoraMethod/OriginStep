// Mentorship React Query hooks.

import type {
  ApplicationFormInput,
  ApplicationReviewInput,
  NextStepFormInput,
} from '@/features/mentorship/mentorship.types';
import { queryKeys } from '@/lib/query/keys';
import { ApplicationStatus } from '@/types/domain';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as mentorshipService from '../services/mentorship.service';

// ─── Application Queries ──────────────────────────────────────────────────────

export function useUserApplications(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.mentorship.applications.mine(userId) : null,
    queryFn: () => (userId ? mentorshipService.fetchUserApplications(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useApplicationById(applicationId: string | null) {
  return useQuery({
    queryKey: applicationId ? queryKeys.mentorship.applications.detail(applicationId) : null,
    queryFn: () => (applicationId ? mentorshipService.fetchApplicationById(applicationId) : null),
    enabled: !!applicationId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMentorApplications(mentorId: string | null) {
  return useQuery({
    queryKey: mentorId ? queryKeys.mentorship.applications.forMentor(mentorId) : null,
    queryFn: () => (mentorId ? mentorshipService.fetchMentorApplications(mentorId) : null),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useApplicationsByStatus(status: ApplicationStatus | null) {
  return useQuery({
    queryKey: status ? queryKeys.mentorship.applications.all() : null,
    queryFn: () => (status ? mentorshipService.fetchApplicationsByStatus(status) : null),
    enabled: !!status,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ─── Application Mutations ────────────────────────────────────────────────────

export function useUpsertDraftApplication(userId: string | null, mentorId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ApplicationFormInput) =>
      userId && mentorId
        ? mentorshipService.upsertDraftApplication(userId, mentorId, input)
        : Promise.reject(),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.mentorship.applications.mine(userId) });
      }
    },
  });
}

export function useSubmitApplication(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mentorshipService.submitApplication(applicationId),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.mentorship.applications.detail(applicationId), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.mentorship.applications.all() });
    },
  });
}

export function useReviewApplication(applicationId: string, mentorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewerId, review }: { reviewerId: string; review: ApplicationReviewInput }) =>
      mentorshipService.reviewApplication(applicationId, reviewerId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.applications.detail(applicationId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.applications.forMentor(mentorId),
      });
    },
  });
}

// ─── Next Steps Queries ───────────────────────────────────────────────────────

export function useApplicationNextSteps(applicationId: string | null) {
  return useQuery({
    queryKey: applicationId ? queryKeys.mentorship.nextSteps.forApplication(applicationId) : null,
    queryFn: () =>
      applicationId ? mentorshipService.fetchApplicationNextSteps(applicationId) : null,
    enabled: !!applicationId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useNextStepById(nextStepId: string | null) {
  return useQuery({
    queryKey: nextStepId ? queryKeys.mentorship.nextSteps.forApplication(nextStepId) : null,
    queryFn: () => (nextStepId ? mentorshipService.fetchNextStepById(nextStepId) : null),
    enabled: !!nextStepId,
  });
}

export function useUserNextSteps(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.mentorship.nextSteps.mine(userId) : null,
    queryFn: () => (userId ? mentorshipService.fetchUserNextSteps(userId) : null),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ─── Next Steps Mutations ─────────────────────────────────────────────────────

export function useCreateNextStep(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NextStepFormInput) =>
      mentorshipService.createNextStep(applicationId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.nextSteps.forApplication(applicationId),
      });
    },
  });
}

export function useUpdateNextStep(nextStepId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<NextStepFormInput>) =>
      mentorshipService.updateNextStep(nextStepId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.nextSteps.forApplication(nextStepId),
      });
    },
  });
}

export function useUpdateNextStepPaymentStatus(nextStepId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      status: 'pending' | 'paid' | 'waived' | 'refunded';
      stripeRef?: string;
    }) => mentorshipService.updateNextStepPaymentStatus(nextStepId, input.status, input.stripeRef),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.nextSteps.forApplication(nextStepId),
      });
    },
  });
}

export function useCancelNextStep(nextStepId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mentorshipService.cancelNextStep(nextStepId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorship.nextSteps.forApplication(nextStepId),
      });
    },
  });
}
