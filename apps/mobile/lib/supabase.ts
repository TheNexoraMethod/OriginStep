import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeClient } from '@originstep/supabase/native'

export const supabase = createNativeClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  AsyncStorage,
)
