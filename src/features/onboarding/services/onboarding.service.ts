// Onboarding service — user interests and step progression.

import type { UserInterest } from '@/features/onboarding/onboarding.types';
import { updateProfile } from '@/features/profile/services/profile.service';
import { supabase } from '@/lib/supabase/client';
import type { DanceLevel } from '@/types/domain';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch a user's selected dance styles (interests).
 */
export async function fetchUserInterests(userId: string): Promise<UserInterest[]> {
  const { data, error } = await supabase.from('user_interests').select('*').eq('user_id', userId);

  if (error) throw error;
  return data;
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Add a dance style to a user's interests.
 * The unique constraint prevents duplicates.
 */
export async function addUserInterest(userId: string, styleId: string): Promise<UserInterest> {
  const { data, error } = await supabase
    .from('user_interests')
    .insert([{ user_id: userId, style_id: styleId }])
    .select()
    .single();

  if (error) {
    // If it's a unique constraint violation, ignore it
    if (error.code === '23505') {
      const existing = await supabase
        .from('user_interests')
        .select('*')
        .eq('user_id', userId)
        .eq('style_id', styleId)
        .single();

      if (existing.error) throw existing.error;
      return existing.data;
    }
    throw error;
  }

  return data;
}

/**
 * Remove a dance style from a user's interests.
 */
export async function removeUserInterest(userId: string, styleId: string): Promise<void> {
  const { error } = await supabase
    .from('user_interests')
    .delete()
    .eq('user_id', userId)
    .eq('style_id', styleId);

  if (error) throw error;
}

/**
 * Replace a user's entire interests list (for bulk update during onboarding).
 */
export async function setUserInterests(
  userId: string,
  styleIds: string[],
): Promise<UserInterest[]> {
  // Delete existing interests
  await supabase.from('user_interests').delete().eq('user_id', userId);

  // If no styles selected, return empty
  if (styleIds.length === 0) return [];

  // Insert new interests
  const { data, error } = await supabase
    .from('user_interests')
    .insert(styleIds.map((styleId) => ({ user_id: userId, style_id: styleId })))
    .select();

  if (error) throw error;
  return data;
}

/**
 * Complete a step of onboarding: dance level.
 */
export async function completeDanceLevelStep(userId: string, danceLevel: DanceLevel) {
  return updateProfile(userId, { dance_level: danceLevel });
}

/**
 * Complete a step of onboarding: learning goals.
 */
export async function completeLearningGoalsStep(
  userId: string,
  learningGoals: string[],
  interestedInMentorship: boolean,
) {
  return updateProfile(userId, {
    learning_goals: learningGoals,
    interested_in_mentorship: interestedInMentorship,
  });
}
