import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

type StorageAdapter = {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

export function createNativeClient(url: string, anonKey: string, storage: StorageAdapter) {
  return createClient<Database>(url, anonKey, {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
}
