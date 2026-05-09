import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './sign-out-button'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  return (
    <main className="min-h-screen bg-[#1a1008] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#f5e6cc]">Dashboard</h1>
        <p className="text-[#b89060] mt-1 text-sm">{session.user.email}</p>
        <p className="text-[#7a5a30] mt-8 text-sm">
          Download the OriginStep app to access your lessons and mentors.
        </p>
        <SignOutButton />
      </div>
    </main>
  )
}
