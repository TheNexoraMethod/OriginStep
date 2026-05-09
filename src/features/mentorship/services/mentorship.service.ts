// Mentorship service — applications and next steps.

import type {
  ApplicationFormInput,
  ApplicationReviewInput,
  MentorshipApplication,
  MentorshipNextStep,
  NextStepFormInput,
} from '@/features/mentorship/mentorship.types';
import { supabase } from '@/lib/supabase/client';
import { ApplicationStatus } from '@/types/domain';

// ─── Application Queries ──────────────────────────────────────────────────────

/**
 * Fetch a user's mentorship applications.
 */
export async function fetchUserApplications(userId: string): Promise<MentorshipApplication[]> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single application by ID.
 */
export async function fetchApplicationById(
  applicationId: string,
): Promise<MentorshipApplication | null> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .select('*')
    .eq('id', applicationId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch applications received by a mentor.
 */
export async function fetchMentorApplications(mentorId: string): Promise<MentorshipApplication[]> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .select('*')
    .eq('mentor_id', mentorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch applications by status (for admin/mentor review).
 */
export async function fetchApplicationsByStatus(
  status: ApplicationStatus,
): Promise<MentorshipApplication[]> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ─── Application Mutations ────────────────────────────────────────────────────

/**
 * Create or update a draft application.
 * If one already exists in draft status for this user+mentor pair, update it.
 * Otherwise, create a new one.
 */
export async function upsertDraftApplication(
  userId: string,
  mentorId: string,
  input: ApplicationFormInput,
): Promise<MentorshipApplication> {
  // Check if draft exists
  const { data: existing } = await supabase
    .from('mentorship_applications')
    .select('id')
    .eq('user_id', userId)
    .eq('mentor_id', mentorId)
    .eq('status', 'draft')
    .single();

  if (existing) {
    // Update existing draft
    const { data, error } = await supabase
      .from('mentorship_applications')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Create new application
  const { data, error } = await supabase
    .from('mentorship_applications')
    .insert([
      {
        user_id: userId,
        mentor_id: mentorId,
        status: 'draft',
        ...input,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Submit a draft application (change status to submitted).
 */
export async function submitApplication(applicationId: string): Promise<MentorshipApplication> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .update({
      status: 'submitted',
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .eq('status', 'draft') // Only allow if in draft
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mentor reviews an application (changes status and adds review notes).
 */
export async function reviewApplication(
  applicationId: string,
  reviewerId: string,
  review: ApplicationReviewInput,
): Promise<MentorshipApplication> {
  const { data, error } = await supabase
    .from('mentorship_applications')
    .update({
      status: review.status,
      reviewer_notes: review.reviewer_notes || null,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Next Steps Queries ───────────────────────────────────────────────────────

/**
 * Fetch all next steps for an application.
 */
export async function fetchApplicationNextSteps(
  applicationId: string,
): Promise<MentorshipNextStep[]> {
  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single next step by ID.
 */
export async function fetchNextStepById(nextStepId: string): Promise<MentorshipNextStep | null> {
  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .select('*')
    .eq('id', nextStepId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch all next steps for a user (across all their applications).
 */
export async function fetchUserNextSteps(userId: string): Promise<MentorshipNextStep[]> {
  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .select(
      `
        *,
        application_id: mentorship_applications!inner(user_id)
      `,
    )
    .eq('mentorship_applications.user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ─── Next Steps Mutations ─────────────────────────────────────────────────────

/**
 * Create a new next step after accepting an application.
 */
export async function createNextStep(
  applicationId: string,
  input: NextStepFormInput,
): Promise<MentorshipNextStep> {
  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .insert([
      {
        application_id: applicationId,
        ...input,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a next step.
 */
export async function updateNextStep(
  nextStepId: string,
  updates: Partial<NextStepFormInput>,
): Promise<MentorshipNextStep> {
  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', nextStepId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update payment status on a next step.
 */
export async function updateNextStepPaymentStatus(
  nextStepId: string,
  paymentStatus: 'pending' | 'paid' | 'waived' | 'refunded',
  stripeReference?: string,
): Promise<MentorshipNextStep> {
  const updates: Record<string, unknown> = { payment_status: paymentStatus };
  if (stripeReference) updates.stripe_reference = stripeReference;

  const { data, error } = await supabase
    .from('mentorship_next_steps')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', nextStepId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Cancel/delete a next step.
 */
export async function cancelNextStep(nextStepId: string): Promise<void> {
  const { error } = await supabase.from('mentorship_next_steps').delete().eq('id', nextStepId);

  if (error) throw error;
}
