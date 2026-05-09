// Styles (dance styles catalog) service.

import type { DanceStyle, StyleFormInput } from '@/features/styles/styles.types';
import { supabase } from '@/lib/supabase/client';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all active dance styles.
 * RLS policy: all authenticated users can read styles.
 */
export async function fetchAllStyles(): Promise<DanceStyle[]> {
  const { data, error } = await supabase
    .from('dance_styles')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single style by ID.
 */
export async function fetchStyleById(styleId: string): Promise<DanceStyle | null> {
  const { data, error } = await supabase
    .from('dance_styles')
    .select('*')
    .eq('id', styleId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch a style by slug.
 */
export async function fetchStyleBySlug(slug: string): Promise<DanceStyle | null> {
  const { data, error } = await supabase.from('dance_styles').select('*').eq('slug', slug).single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch styles by category.
 */
export async function fetchStylesByCategory(category: string): Promise<DanceStyle[]> {
  const { data, error } = await supabase
    .from('dance_styles')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

// ─── Mutations (Admin) ────────────────────────────────────────────────────────

/**
 * Create a new dance style (admin only).
 */
export async function createStyle(input: StyleFormInput): Promise<DanceStyle> {
  const { data, error } = await supabase.from('dance_styles').insert([input]).select().single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing dance style (admin only).
 */
export async function updateStyle(
  styleId: string,
  updates: Partial<StyleFormInput>,
): Promise<DanceStyle> {
  const { data, error } = await supabase
    .from('dance_styles')
    .update(updates)
    .eq('id', styleId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a dance style (admin only).
 */
export async function deleteStyle(styleId: string): Promise<void> {
  const { error } = await supabase.from('dance_styles').delete().eq('id', styleId);

  if (error) throw error;
}
