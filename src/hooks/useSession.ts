import { useAuth } from '@/providers/AuthProvider';
import type { Session } from '@supabase/supabase-js';

// Returns the current Supabase session, or null if unauthenticated.
// Components that need to check auth state should use this hook rather than
// accessing the Supabase client directly.
export function useSession(): Session | null {
  const { session } = useAuth();
  return session;
}
