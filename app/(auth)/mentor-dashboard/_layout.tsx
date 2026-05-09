import { useAuth } from '@/providers/AuthProvider';
import { colors } from '@/theme';
import { Redirect, Stack } from 'expo-router';

// Mentor dashboard layout — role guard for mentor and admin access.
//
// Current check: session guard only.
// Phase 6 adds: full role check against user profile from the database.
// The role check placeholder is included here as a reference point.
//
// TODO Phase 6: Replace session-only guard with:
//   const profile = useProfile();
//   if (profile.role !== 'mentor' && profile.role !== 'admin') {
//     return <Redirect href="/(auth)/(tabs)/home" />;
//   }
export default function MentorDashboardLayout(): React.JSX.Element {
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
      <Stack.Screen name="index" />
      <Stack.Screen name="applications/index" />
      <Stack.Screen name="applications/[id]" />
      <Stack.Screen name="offerings/index" />
      <Stack.Screen name="offerings/[id]" />
    </Stack>
  );
}
