// Admin — Administrative backend types for content and user management.

import { Database } from '@/types/supabase';

// ─── Editorial Content ────────────────────────────────────────────────────────

// Full editorial content row, matched with Supabase schema.
export type EditorialContent = Database['public']['Tables']['editorial_content']['Row'];

export type EditorialContentInsert = Database['public']['Tables']['editorial_content']['Insert'];
export type EditorialContentUpdate = Database['public']['Tables']['editorial_content']['Update'];

// Editorial content with author display name for the content list.
export type EditorialContentDetail = EditorialContent & {
  authorName?: string | null;
  styleName?: string | null;
};

// Admin form for creating/editing editorial content.
export type EditorialFormInput = {
  style_id?: string | null;
  slug: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
};

// Editorial content search/filter.
export type EditorialFilters = {
  status?: 'draft' | 'published' | 'archived';
  styleId?: string | null;
  search?: string;
  sortBy?: 'recent' | 'oldest' | 'title';
};

// ─── Admin Dashboard Stats ────────────────────────────────────────────────────

// Aggregate statistics for the admin dashboard.
export type AdminStats = {
  usersTotal: number;
  usersPendingOnboarding: number;
  mentorsApproved: number;
  mentorsPending: number;
  applicationsInReview: number;
  lessonsCount: number;
  stylesCount: number;
  contentPublished: number;
  contentDraft: number;
};

// Mentor approval workflow.
export type MentorApprovalAction = {
  mentorId: string;
  action: 'approve' | 'decline';
  notes?: string;
};

// ─── Audit / User Management ─────────────────────────────────────────────────

// Admin view of user profile for management (can see all fields, role, etc.).
export type AdminUserView = Database['public']['Tables']['users']['Row'] & {
  mentorCount?: number; // count of mentor applications
  applicationsSubmitted?: number;
};

// Bulk user actions.
export type UserBulkAction = {
  userIds: string[];
  action: 'changeRole' | 'resetProgress' | 'resetOnboarding';
  roleTo?: 'student' | 'mentor' | 'admin';
};
