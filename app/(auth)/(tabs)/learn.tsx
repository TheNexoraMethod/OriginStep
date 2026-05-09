import React from 'react';
import { useAllStyles } from '@/features/styles/hooks/useStyles';
import { colors, spacing, textStyles } from '@/theme';
import { Spacer } from '@/components/ui';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LearnScreen(): React.JSX.Element {
  const { data: danceStyles = [], isLoading } = useAllStyles();

  if (isLoading) {
    return (
      <View style={s.loading}>
        <Text style={s.loadingText}>Loading styles...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={s.scrollView} contentContainerStyle={s.container}>
      <View style={s.header}>
        <Text style={s.heading}>Learn</Text>
        <Text style={s.subtitle}>Choose a style to explore lessons</Text>
      </View>

      <Spacer size={4} />

      <View style={s.grid}>
        {danceStyles.map((style) => (
          <Link key={style.id} href={`/(auth)/styles/${style.slug}`} asChild>
            <Pressable style={s.styleCard}>
              <Text style={s.styleIcon}>💃</Text>
              <Text style={s.styleName}>{style.name}</Text>
              <Text style={s.styleCategory}>{style.category}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Spacer size={8} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  header: {
    marginTop: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
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
    backgroundColor: colors.background.elevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    alignItems: 'center',
    gap: spacing[2],
  },
  styleIcon: {
    fontSize: 32,
  },
  styleName: {
    ...textStyles.label,
    color: colors.text.primary,
    textAlign: 'center',
  },
  styleCategory: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
