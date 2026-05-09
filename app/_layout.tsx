import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { colors } from '@/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout(): React.JSX.Element {
  return (
    <QueryProvider>
      <AuthProvider>
        <StatusBar style="light" backgroundColor={colors.background.primary} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
    </QueryProvider>
  );
}
