import { Button, Spacer } from '@/components/ui';
import { useSetUserInterests } from '@/features/onboarding/hooks/useOnboarding';
import { useAllStyles } from '@/features/styles/hooks/useStyles';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, textStyles } from '@/theme';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function InterestsScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { data: danceStyles = [] } = useAllStyles();
  const { mutate: setUserInterests, isPending } = useSetUserInterests(user?.id || null);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (styleId: string) => {
    setSelected((prev) =>
      prev.includes(styleId) ? prev.filter((s) => s !== styleId) : [...prev, styleId],
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      setUserInterests(selected);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 2 of 3</Text>
        <Text style={styles.heading}>What dance styles interest you?</Text>
        <Text style={styles.subtitle}>Choose at least one style</Text>
      </View>

      <Spacer size={6} />

      <View style={styles.grid}>
        {danceStyles.map((style) => (
          <Pressable
            key={style.id}
            style={[styles.styleCard, selected.includes(style.id) && styles.styleCardSelected]}
            onPress={() => handleToggle(style.id)}
          >
            <Text style={styles.styleName}>{style.name}</Text>
          </Pressable>
        ))}
      </View>

      <Spacer size={8} />

      <Button
        label="Continue"
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'space-between',
  },
  styleCard: {
    width: '48%',
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.default,
    borderRadius: 12,
    padding: spacing[4],
    alignItems: 'center',
  },
  styleCardSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.primary,
  },
  styleName: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
