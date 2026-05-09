import { z } from 'zod';

const envSchema = z.object({
  supabaseUrl: z.string().url('EXPO_PUBLIC_SUPABASE_URL must be a valid URL'),
  supabaseAnonKey: z.string().min(1, 'EXPO_PUBLIC_SUPABASE_ANON_KEY is required'),
});

type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse({
    supabaseUrl: process.env['EXPO_PUBLIC_SUPABASE_URL'],
    supabaseAnonKey: process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'],
  });

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Environment configuration error:\n${issues}`);
  }

  return result.data;
}

// Validated at module load time. A missing or malformed env variable will throw
// immediately on app start rather than producing a cryptic runtime error later.
export const env = parseEnv();
