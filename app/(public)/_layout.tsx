import { useAuth } from '@/providers/AuthProvider';
import { colors } from '@/theme';
import { Redirect, Stack } from 'expo-router';

// Public layout — screens accessible to unauthenticated users (sign in, sign up, landing).
//
// If the user already has an active session, they are redirected to the main app immediately.
// This prevents authenticated users from landing back on the sign-in screen after app restart.
export default function PublicLayout(): React.JSX.Element {
  const { session, isLoading } = useAuth();

  // During initial session hydration, render nothing to prevent a flash of the public screen.
  if (isLoading) {
    return <></>;
  }

  if (session !== null) {
    return <Redirect href="/(auth)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
