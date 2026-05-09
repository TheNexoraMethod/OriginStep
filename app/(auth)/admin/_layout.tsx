import { useAuth } from '@/providers/AuthProvider';
import { colors } from '@/theme';
import { Redirect, Stack } from 'expo-router';

// Admin layout — role guard for admin-only access.
//
// Current check: session guard only.
// Phase 14 adds: full admin role check against user profile from the database.
//
// TODO Phase 14: Replace session-only guard with:
//   const profile = useProfile();
//   if (profile.role !== 'admin') {
//     return <Redirect href="/(auth)/(tabs)/home" />;
//   }
export default function AdminLayout(): React.JSX.Element {
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
      <Stack.Screen name="mentors/index" />
      <Stack.Screen name="content/index" />
    </Stack>
  );
}
