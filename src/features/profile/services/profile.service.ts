// Profile service — profile queries and mutations.

import type { UpdateProfileInput, UserProfile } from '@/features/profile/profile.types';
import { supabase } from '@/lib/supabase/client';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch the current user's profile by ID.
 * RLS policy: users can only read their own profile.
 */
export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }

  return data;
}

/**
 * Fetch all user profiles (admin only).
 * RLS policy: admins can read all profiles.
 */
export async function fetchAllProfiles(): Promise<UserProfile[]> {
  const { data, error } = await supabase.from('users').select('*');

  if (error) throw error;
  return data;
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Update a user's mutable profile fields.
 * Does NOT allow role mutations — enforced at the service layer.
 * RLS policy: users can only update their own profile.
 */
export async function updateProfile(
  userId: string,
  updates: UpdateProfileInput,
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark a user's onboarding as complete.
 */
export async function completeOnboarding(userId: string): Promise<UserProfile> {
  return updateProfile(userId, { onboarding_completed: true });
}

/**
 * Mark a user as interested in mentorship.
 */
export async function setInterestedInMentorship(
  userId: string,
  interested: boolean,
): Promise<UserProfile> {
  return updateProfile(userId, { interested_in_mentorship: interested });
}

// ─── Admin Mutations ──────────────────────────────────────────────────────────

/**
 * Change a user's role (admin only).
 * This is a privileged operation not exposed to the user themselves.
 * In production, this would go through a service function with auth checks.
 */
export async function changeUserRole(
  userId: string,
  newRole: 'student' | 'mentor' | 'admin',
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Reset a user's onboarding status.
 */
export async function resetUserOnboarding(userId: string): Promise<UserProfile> {
  return updateProfile(userId, {
    onboarding_completed: false,
    learning_goals: [],
    dance_level: null,
  });
}
