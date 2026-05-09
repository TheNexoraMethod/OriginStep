import { createClient as _createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Base client — use this in React Native and simple browser contexts.
// For Next.js SSR with cookie-based session handling, @supabase/ssr wrappers are added in Phase 2.
export function createClient(url: string, anonKey: string) {
  return _createClient<Database>(url, anonKey)
}

export type SupabaseClient = ReturnType<typeof createClient>
