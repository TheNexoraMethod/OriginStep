'use client'
import { useRouter } from 'next/navigation'
import { getClient } from '@/lib/supabase/browser'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    await getClient().auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={signOut}
      className="mt-6 text-sm text-[#c8860a] hover:underline"
    >
      Sign out
    </button>
  )
}
