// Mentors service — mentor profiles and offerings.

import type {
  Mentor,
  MentorFormInput,
  MentorSessionOffering,
  OfferingFormInput,
} from '@/features/mentors/mentors.types';
import { supabase } from '@/lib/supabase/client';

// ─── Mentor Queries ───────────────────────────────────────────────────────────

/**
 * Fetch all approved and visible mentors (for discovery).
 */
export async function fetchDiscoverableMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('approved', true)
    .eq('visible', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch all mentors (admin view).
 */
export async function fetchAllMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single mentor by ID.
 */
export async function fetchMentorById(mentorId: string): Promise<Mentor | null> {
  const { data, error } = await supabase.from('mentors').select('*').eq('id', mentorId).single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch a user's mentor profile (if they have one).
 */
export async function fetchUserMentorProfile(userId: string): Promise<Mentor | null> {
  const { data, error } = await supabase.from('mentors').select('*').eq('user_id', userId).single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch pending mentor approvals (admin only).
 */
export async function fetchPendingMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('approved', false)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

// ─── Mentor Mutations ─────────────────────────────────────────────────────────

/**
 * Create a new mentor profile for a user.
 * One mentor profile per user (enforced by unique constraint on user_id).
 */
export async function createMentorProfile(userId: string, input: MentorFormInput): Promise<Mentor> {
  const { data, error } = await supabase
    .from('mentors')
    .insert([{ user_id: userId, ...input }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a mentor's profile (editable by the mentor themselves).
 * Does NOT allow changes to approved field — that's admin only.
 */
export async function updateMentorProfile(
  mentorId: string,
  updates: Partial<Omit<MentorFormInput, 'approved'>>,
): Promise<Mentor> {
  const { data, error } = await supabase
    .from('mentors')
    .update(updates)
    .eq('id', mentorId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Approve a mentor profile (admin only).
 */
export async function approveMentor(mentorId: string): Promise<Mentor> {
  const { data, error } = await supabase
    .from('mentors')
    .update({ approved: true })
    .eq('id', mentorId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Decline a mentor profile (admin only).
 */
export async function declineMentor(mentorId: string): Promise<Mentor> {
  const { data, error } = await supabase
    .from('mentors')
    .update({ approved: false })
    .eq('id', mentorId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Toggle a mentor's visibility (discoverable or hidden).
 */
export async function toggleMentorVisibility(mentorId: string, visible: boolean): Promise<Mentor> {
  const { data, error } = await supabase
    .from('mentors')
    .update({ visible })
    .eq('id', mentorId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Offering Queries ─────────────────────────────────────────────────────────

/**
 * Fetch all active offerings for a mentor (for discovery).
 */
export async function fetchMentorOfferings(mentorId: string): Promise<MentorSessionOffering[]> {
  const { data, error } = await supabase
    .from('mentor_session_offerings')
    .select('*')
    .eq('mentor_id', mentorId)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch all offerings for a mentor including inactive ones (mentor view).
 */
export async function fetchMentorAllOfferings(mentorId: string): Promise<MentorSessionOffering[]> {
  const { data, error } = await supabase
    .from('mentor_session_offerings')
    .select('*')
    .eq('mentor_id', mentorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single offering by ID.
 */
export async function fetchOfferingById(offeringId: string): Promise<MentorSessionOffering | null> {
  const { data, error } = await supabase
    .from('mentor_session_offerings')
    .select('*')
    .eq('id', offeringId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

// ─── Offering Mutations ───────────────────────────────────────────────────────

/**
 * Create a new session offering.
 */
export async function createOffering(
  mentorId: string,
  input: OfferingFormInput,
): Promise<MentorSessionOffering> {
  const { data, error } = await supabase
    .from('mentor_session_offerings')
    .insert([{ mentor_id: mentorId, ...input }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an offering.
 * Note: format cannot be changed after creation (enforced at service layer).
 */
export async function updateOffering(
  offeringId: string,
  updates: Partial<Omit<OfferingFormInput, 'format'>>,
): Promise<MentorSessionOffering> {
  const { data, error } = await supabase
    .from('mentor_session_offerings')
    .update(updates)
    .eq('id', offeringId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Deactivate an offering (soft delete).
 */
export async function deactivateOffering(offeringId: string): Promise<MentorSessionOffering> {
  return updateOffering(offeringId, { active: false });
}

/**
 * Delete an offering completely.
 */
export async function deleteOffering(offeringId: string): Promise<void> {
  const { error } = await supabase.from('mentor_session_offerings').delete().eq('id', offeringId);

  if (error) throw error;
}
