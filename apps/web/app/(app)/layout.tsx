import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/nav/sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar
        userName={profile?.full_name ?? ''}
        userEmail={user.email!}
        userRole={(profile?.role ?? 'student') as 'student' | 'mentor' | 'admin'}
      />
      {/* Offset for desktop sidebar / mobile top bar */}
      <div className="lg:pl-60 pt-14 lg:pt-0">
        <main className="p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
