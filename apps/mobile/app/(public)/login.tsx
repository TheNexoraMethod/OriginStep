import { useState } from 'react'
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { supabase } from '../../lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSignIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) Alert.alert('Sign in failed', error.message)
    setLoading(false)
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>OriginStep</Text>
      <TextInput
        style={s.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#7a5a30"
      />
      <TextInput
        style={s.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#7a5a30"
      />
      <Pressable style={[s.btn, loading && s.btnDisabled]} onPress={onSignIn} disabled={loading}>
        <Text style={s.btnText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
      </Pressable>
      <Link href="/(public)/signup" asChild>
        <Pressable style={s.linkRow}>
          <Text style={s.linkText}>No account? Sign up</Text>
        </Pressable>
      </Link>
    </View>
  )
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#1a1008', justifyContent: 'center', padding: 24 },
  title:      { color: '#f5e6cc', fontSize: 32, fontWeight: '700', marginBottom: 32, textAlign: 'center' },
  input:      { backgroundColor: '#2a1c0f', color: '#f5e6cc', borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#5c3a1a' },
  btn:        { backgroundColor: '#c8860a', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled:{ opacity: 0.6 },
  btnText:    { color: '#1a1008', fontWeight: '700', fontSize: 16 },
  linkRow:    { marginTop: 24, alignItems: 'center' },
  linkText:   { color: '#b89060' },
})
