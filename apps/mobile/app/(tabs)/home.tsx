import { View, Text, Pressable, StyleSheet } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <Text style={s.heading}>OriginStep</Text>
      <Pressable style={s.btn} onPress={() => supabase.auth.signOut()}>
        <Text style={s.btnText}>Sign out</Text>
      </Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1008', justifyContent: 'center', alignItems: 'center', gap: 24 },
  heading:   { color: '#f5e6cc', fontSize: 24, fontWeight: '700' },
  btn:       { backgroundColor: '#2a1c0f', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 12, borderWidth: 1, borderColor: '#5c3a1a' },
  btnText:   { color: '#b89060', fontWeight: '600' },
})
