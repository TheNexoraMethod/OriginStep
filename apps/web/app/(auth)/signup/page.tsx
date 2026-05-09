'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { getClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await getClient().auth.signUp({ email, password })
    if (error) setError(error.message)
    else setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="text-4xl">✉️</div>
        <h2 className="text-xl font-semibold text-text-primary">Check your email</h2>
        <p className="text-text-secondary text-sm">
          We sent a confirmation link to <span className="text-text-primary">{email}</span>.
          Click it to activate your account.
        </p>
        <Link href="/login" className="block text-text-accent text-sm hover:underline mt-4">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">OriginStep</h1>
        <p className="text-text-secondary text-sm mt-1">Create your account</p>
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
        minLength={6}
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
      />

      <Button type="submit" loading={loading} size="lg" className="w-full">
        Create account
      </Button>

      <p className="text-text-secondary text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
