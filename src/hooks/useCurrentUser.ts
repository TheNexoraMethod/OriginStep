import { useAuth } from '@/providers/AuthProvider';
import type { User } from '@supabase/supabase-js';

// Returns the authenticated Supabase auth user (from the JWT), or null.
// Note: this is the Supabase Auth user, not the application user profile from the `users` table.
// For the full application profile (role, dance_level, onboarding status, etc.),
// use useProfile() from src/features/profile/hooks/useProfile.ts — available from Phase 6.
export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}
