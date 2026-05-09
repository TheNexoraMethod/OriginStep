import { Button, Spacer } from '@/components/ui';
import { useCompleteLearningGoalsStep } from '@/features/onboarding/hooks/useOnboarding';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, textStyles } from '@/theme';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const GOALS = [
  { id: 'fitness', label: '💪 Fitness & Health', description: 'Get in shape' },
  { id: 'social', label: '👥 Social & Fun', description: 'Meet new people' },
  { id: 'performance', label: '🎭 Performance', description: 'Show off on stage' },
  { id: 'learning', label: '📚 Learning', description: 'Master technique' },
];

export default function GoalsScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { mutate: completeLearningGoals, isPending } = useCompleteLearningGoalsStep(
    user?.id || null,
  );
  const [selected, setSelected] = React.useState<string[]>([]);
  const [interested, setInterested] = React.useState(false);

  const handleToggle = (goalId: string) => {
    setSelected((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId],
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      completeLearningGoals({ goals: selected, interested });
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 3 of 3</Text>
        <Text style={styles.heading}>What are your goals?</Text>
        <Text style={styles.subtitle}>Select at least one goal</Text>
      </View>

      <Spacer size={6} />

      <View style={styles.options}>
        {GOALS.map((goal) => (
          <Pressable
            key={goal.id}
            style={[styles.option, selected.includes(goal.id) && styles.optionSelected]}
            onPress={() => handleToggle(goal.id)}
          >
            <Text style={styles.optionLabel}>{goal.label}</Text>
            <Text style={styles.optionDescription}>{goal.description}</Text>
          </Pressable>
        ))}
      </View>

      <Spacer size={6} />

      <Pressable
        style={[styles.checkboxContainer, interested && styles.checkboxSelected]}
        onPress={() => setInterested(!interested)}
      >
        <Text style={interested ? styles.checkboxLabelSelected : styles.checkboxLabel}>
          {interested ? '✓' : '○'} Interested in mentorship
        </Text>
      </Pressable>

      <Spacer size={8} />

      <Button
        label="Complete Onboarding"
        onPress={handleContinue}
        disabled={selected.length === 0}
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
  checkboxContainer: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.default,
    borderRadius: 12,
    padding: spacing[4],
  },
  checkboxSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.primary,
  },
  checkboxLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
  },
  checkboxLabelSelected: {
    ...textStyles.bodyMedium,
    color: colors.brand.primary,
    fontWeight: '600',
  },
});
