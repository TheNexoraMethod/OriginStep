'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await getClient().auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">OriginStep</h1>
        <p className="text-text-secondary text-sm mt-1">Sign in to your account</p>
      </div>

      {error && (
        <p className="text-status-error text-sm text-center bg-status-error-subtle rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      <Input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <Button type="submit" loading={loading} size="lg" className="w-full">
        Sign in
      </Button>

      <p className="text-text-secondary text-center text-sm">
        No account?{' '}
        <Link href="/signup" className="text-text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}
