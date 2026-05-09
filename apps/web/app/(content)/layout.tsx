import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/nav/sidebar'
import { PublicNav } from '@/components/nav/public-nav'
import type { User } from '@supabase/supabase-js'

type Profile = { full_name: string | null; role: string | null } | null

async function getAuthState(): Promise<{ user: User | null; profile: Profile }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { user: null, profile: null }

    const { data: profile } = await supabase
      .from('users')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    return { user, profile }
  } catch {
    return { user: null, profile: null }
  }
}

export default async function ContentLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getAuthState()

  if (user) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Sidebar
          userName={profile?.full_name ?? ''}
          userEmail={user.email!}
          userRole={(profile?.role ?? 'student') as 'student' | 'mentor' | 'admin'}
        />
        <div className="lg:pl-60 pt-14 lg:pt-0">
          <main className="p-6 lg:p-8 max-w-6xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <PublicNav isLoggedIn={false} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
