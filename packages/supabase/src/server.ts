import { createServerClient as _createServerClient } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'
import type { Database } from './types'

export function createServerClient(url: string, anonKey: string, cookies: CookieMethodsServer) {
  return _createServerClient<Database>(url, anonKey, { cookies })
}
