import { Button, Spacer } from '@/components/ui';
import { useCompleteDanceLevelStep } from '@/features/onboarding/hooks/useOnboarding';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, textStyles } from '@/theme';
import type { DanceLevel } from '@/types/domain';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const DANCE_LEVELS: { label: string; value: DanceLevel; description: string }[] = [
  { label: 'Beginner', value: 'beginner', description: 'New to dancing' },
  { label: 'Intermediate', value: 'intermediate', description: 'Some experience' },
  { label: 'Advanced', value: 'advanced', description: 'Confident dancer' },
  { label: 'Expert', value: 'expert', description: 'Professional level' },
];

export default function DanceLevelScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { mutate: completeDanceLevel, isPending } = useCompleteDanceLevelStep(user?.id || null);
  const [selected, setSelected] = React.useState<DanceLevel | null>(null);

  const handleContinue = () => {
    if (selected) {
      completeDanceLevel(selected);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 1 of 3</Text>
        <Text style={styles.heading}>What's your dance level?</Text>
        <Text style={styles.subtitle}>Choose where you're starting from</Text>
      </View>

      <Spacer size={6} />

      <View style={styles.options}>
        {DANCE_LEVELS.map((level) => (
          <Pressable
            key={level.value}
            style={[styles.option, selected === level.value && styles.optionSelected]}
            onPress={() => setSelected(level.value)}
          >
            <Text style={styles.optionLabel}>{level.label}</Text>
            <Text style={styles.optionDescription}>{level.description}</Text>
          </Pressable>
        ))}
      </View>

      <Spacer size={8} />

      <Button
        label="Continue"
        onPress={handleContinue}
        disabled={!selected}
        fullWidth
        loading={isPending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[8],
  },
  header: {
    marginTop: spacing[4],
  },
  step: {
    ...textStyles.overline,
    color: colors.text.tertiary,
    marginBottom: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  options: {
    gap: spacing[3],
  },
  option: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.default,
    borderRadius: 12,
    padding: spacing[4],
    gap: spacing[1],
  },
  optionSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.primary,
  },
  optionLabel: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  optionDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
});
