import { colors } from '@/theme';
import { Stack } from 'expo-router';

// Onboarding layout — wraps the multi-step onboarding flow.
//
// Phase 6 adds: redirect away from onboarding if onboarding_completed is already true.
// The steps are intentionally a linear Stack (not tabs) to guide the user through a clear sequence.
export default function OnboardingLayout(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'slide_from_right',
      }}
    />
  );
}
