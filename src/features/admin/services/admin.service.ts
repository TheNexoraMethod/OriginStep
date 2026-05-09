// Admin service — editorial content and platform management.

import type {
  AdminStats,
  EditorialContent,
  EditorialFormInput,
} from '@/features/admin/admin.types';
import { supabase } from '@/lib/supabase/client';

// ─── Editorial Content Queries ────────────────────────────────────────────────

/**
 * Fetch published editorial content (for public viewing).
 */
export async function fetchPublishedContent(): Promise<EditorialContent[]> {
  const { data, error } = await supabase
    .from('editorial_content')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch editorial content by style.
 */
export async function fetchContentByStyle(styleId: string): Promise<EditorialContent[]> {
  const { data, error } = await supabase
    .from('editorial_content')
    .select('*')
    .eq('style_id', styleId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single piece of content by slug.
 */
export async function fetchContentBySlug(slug: string): Promise<EditorialContent | null> {
  const { data, error } = await supabase
    .from('editorial_content')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

/**
 * Fetch all editorial content including drafts (admin view).
 */
export async function fetchAllEditorialContent(): Promise<EditorialContent[]> {
  const { data, error } = await supabase
    .from('editorial_content')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single editorial content by ID (admin view).
 */
export async function fetchEditorialContentById(
  contentId: string,
): Promise<EditorialContent | null> {
  const { data, error } = await supabase
    .from('editorial_content')
    .select('*')
    .eq('id', contentId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

// ─── Editorial Content Mutations ──────────────────────────────────────────────

/**
 * Create a new editorial content piece (admin only).
 */
export async function createEditorialContent(
  authorId: string,
  input: EditorialFormInput,
): Promise<EditorialContent> {
  const publishedAt = input.status === 'published' ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from('editorial_content')
    .insert([
      {
        ...input,
        author_id: authorId,
        published_at: publishedAt,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update editorial content (admin only).
 */
export async function updateEditorialContent(
  contentId: string,
  updates: Partial<EditorialFormInput>,
): Promise<EditorialContent> {
  let publishedAt: string | null = null;
  if (updates.status === 'published') {
    // Get current content to check if it's already published
    const current = await fetchEditorialContentById(contentId);
    publishedAt = current?.published_at || new Date().toISOString();
  } else if (updates.status === 'draft' || updates.status === 'archived') {
    publishedAt = null;
  }

  const updateData: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };
  if (publishedAt !== undefined) updateData.published_at = publishedAt;

  const { data, error } = await supabase
    .from('editorial_content')
    .update(updateData)
    .eq('id', contentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Publish draft content.
 */
export async function publishContent(contentId: string): Promise<EditorialContent> {
  return updateEditorialContent(contentId, { status: 'published' });
}

/**
 * Archive published content.
 */
export async function archiveContent(contentId: string): Promise<EditorialContent> {
  return updateEditorialContent(contentId, { status: 'archived' });
}

/**
 * Delete editorial content (admin only).
 */
export async function deleteEditorialContent(contentId: string): Promise<void> {
  const { error } = await supabase.from('editorial_content').delete().eq('id', contentId);

  if (error) throw error;
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

/**
 * Gather admin dashboard statistics.
 * This is a client-side aggregation; in production, consider using a Supabase RPC.
 */
export async function fetchAdminStats(): Promise<AdminStats> {
  const [usersRes, mentorsRes, applicationsRes, lessonsRes, stylesRes, editorialRes] =
    await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('mentors').select('id, approved', { count: 'exact' }),
      supabase
        .from('mentorship_applications')
        .select('id, status', { count: 'exact' })
        .eq('status', 'in_review'),
      supabase.from('video_lessons').select('id', { count: 'exact' }),
      supabase.from('dance_styles').select('id', { count: 'exact' }),
      supabase.from('editorial_content').select('id, status', { count: 'exact' }),
    ]);

  const usersTotal = usersRes.count || 0;
  const mentorsAll = mentorsRes.data || [];
  const mentorsApproved = mentorsAll.filter((m) => m.approved).length;
  const mentorsPending = mentorsAll.filter((m) => !m.approved).length;
  const editorialAll = editorialRes.data || [];
  const contentPublished = editorialAll.filter((c) => c.status === 'published').length;
  const contentDraft = editorialAll.filter((c) => c.status === 'draft').length;

  // Fetch users awaiting onboarding
  const { data: pendingOnboarding, error: onboardingError } = await supabase
    .from('users')
    .select('id', { count: 'exact' })
    .eq('onboarding_completed', false);

  if (onboardingError) throw onboardingError;

  return {
    usersTotal,
    usersPendingOnboarding: pendingOnboarding?.length || 0,
    mentorsApproved,
    mentorsPending,
    applicationsInReview: applicationsRes.count || 0,
    lessonsCount: lessonsRes.count || 0,
    stylesCount: stylesRes.count || 0,
    contentPublished,
    contentDraft,
  };
}
