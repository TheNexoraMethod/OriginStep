import { useAuth } from '@/providers/AuthProvider';
import { colors } from '@/theme';
import { Redirect, Stack } from 'expo-router';

// Auth layout — the root guard for all authenticated screens.
//
// Checks performed in order:
//   1. If loading: render nothing (prevents flash of protected screen before session resolves).
//   2. If no session: redirect to sign-in.
//   3. If session exists: render the stack.
//
// Phase 6 adds: if session exists but onboarding is not complete, redirect to onboarding.
// That check is not here yet because it requires the user profile query from the database.
export default function AuthLayout(): React.JSX.Element {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <></>;
  }

  if (session === null) {
    return <Redirect href="/(public)/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="styles" />
      <Stack.Screen name="videos" />
      <Stack.Screen name="mentors" />
      <Stack.Screen name="mentorship" />
      <Stack.Screen name="mentor-dashboard" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}
