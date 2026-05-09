// Base client — use for type-level imports and non-platform-specific code.
// Platform clients live in sub-paths to prevent cross-bundle leakage:
//   @originstep/supabase/native  → React Native (AsyncStorage)
//   @originstep/supabase/server  → Next.js Server Components / Route Handlers
//   @originstep/supabase/browser → Next.js Client Components
export { createClient } from './client'
export type { SupabaseClient } from './client'
export type { Database } from './types'
