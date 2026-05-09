import { env } from '@/lib/env';
import type { Database } from '@/types/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Single typed Supabase client instance for the entire app.
//
// Security notes:
// - Uses the public anon key only. The service role key never touches this client.
// - All access control is enforced server-side via Row Level Security policies.
// - Session is persisted to AsyncStorage so users stay logged in across app restarts.
// - detectSessionInUrl is false — not relevant for native apps and avoids token leakage via deep links.
export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
