import { createClient } from '@/lib/supabase/server'
import { PublicNav } from '@/components/nav/public-nav'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let isLoggedIn = false

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    isLoggedIn = !!session
  } catch {
    // Treat as guest if Supabase is unavailable
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <PublicNav isLoggedIn={isLoggedIn} />
      {children}
    </div>
  )
}
