// Journey service — saved items (bookmarks).

import type { SavedItem, SavedItemType } from '@/features/journey/journey.types';
import { supabase } from '@/lib/supabase/client';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all of a user's saved items.
 */
export async function fetchUserSavedItems(userId: string): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a user's saved items filtered by type.
 */
export async function fetchUserSavedItemsByType(
  userId: string,
  itemType: SavedItemType,
): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('*')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Check if a user has saved a specific item.
 */
export async function isItemSaved(
  userId: string,
  itemType: SavedItemType,
  itemId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

/**
 * Count a user's saved items by type.
 */
export async function countSavedItemsByType(
  userId: string,
): Promise<Record<SavedItemType, number>> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('item_type')
    .eq('user_id', userId);

  if (error) throw error;

  const counts = { style: 0, video: 0, mentor: 0 };
  data.forEach((item) => {
    counts[item.item_type as SavedItemType]++;
  });

  return counts;
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Save an item (add to bookmarks).
 * The unique constraint prevents duplicates.
 */
export async function saveItem(
  userId: string,
  itemType: SavedItemType,
  itemId: string,
): Promise<SavedItem> {
  const { data, error } = await supabase
    .from('saved_items')
    .insert([{ user_id: userId, item_type: itemType, item_id: itemId }])
    .select()
    .single();

  if (error) {
    // If it's a unique constraint violation, the item is already saved
    if (error.code === '23505') {
      const existing = await supabase
        .from('saved_items')
        .select('*')
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .single();

      if (existing.error) throw existing.error;
      return existing.data;
    }
    throw error;
  }

  return data;
}

/**
 * Remove a saved item (unbookmark).
 */
export async function removeSavedItem(
  userId: string,
  itemType: SavedItemType,
  itemId: string,
): Promise<void> {
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId);

  if (error) throw error;
}

/**
 * Clear all saved items of a specific type.
 */
export async function clearSavedItemsByType(
  userId: string,
  itemType: SavedItemType,
): Promise<void> {
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_id', userId)
    .eq('item_type', itemType);

  if (error) throw error;
}

/**
 * Clear all saved items.
 */
export async function clearAllSavedItems(userId: string): Promise<void> {
  const { error } = await supabase.from('saved_items').delete().eq('user_id', userId);

  if (error) throw error;
}
