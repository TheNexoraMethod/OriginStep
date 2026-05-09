import { createClient } from '@/lib/supabase/server'
import { PublicNav } from '@/components/nav/public-nav'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen bg-bg-primary">
      <PublicNav isLoggedIn={!!session} />
      {children}
    </div>
  )
}
