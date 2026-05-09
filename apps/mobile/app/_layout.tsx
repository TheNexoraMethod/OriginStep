import { useEffect, useState } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null)
  const [loaded, setLoaded] = useState(false)
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoaded(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!loaded) return
    const inPublic = segments[0] === '(public)'
    if (!session && !inPublic) router.replace('/(public)/login')
    if (session && inPublic) router.replace('/(tabs)/home')
  }, [session, loaded, segments])

  if (!loaded) return null

  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1008" />
      <Slot />
    </>
  )
}
