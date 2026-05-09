import { createBrowserClient as _createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/db.types'

let client: ReturnType<typeof _createBrowserClient<Database>> | null = null

export function getClient() {
  if (!client) {
    client = _createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return client
}
