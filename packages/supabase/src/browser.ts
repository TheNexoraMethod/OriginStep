import { createBrowserClient as _createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createBrowserClient(url: string, anonKey: string) {
  return _createBrowserClient<Database>(url, anonKey)
}
