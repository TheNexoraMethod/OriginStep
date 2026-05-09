import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useAllUserProgress } from '@/features/videos/hooks/useVideos';
import { colors, spacing, textStyles } from '@/theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Spacer } from '@/components/ui';

export default function HomeScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id || '');
  const { data: progress, isLoading: progressLoading } = useAllUserProgress(user?.id || '');

  const isLoading = profileLoading || progressLoading;
  const completedCount = progress?.filter((p) => p.completed).length || 0;
  const totalCount = progress?.length || 0;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {profile?.display_name || 'Dancer'}! 👋</Text>
      </View>

      <Spacer size={6} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Progress</Text>
        <Text style={styles.progressStat}>
          {completedCount} of {totalCount} lessons completed
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
              },
            ]}
          />
        </View>
      </View>

      <Spacer size={4} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dance Level</Text>
        <Text style={styles.levelBadge}>{profile?.dance_level || 'Not set'}</Text>
      </View>

      <Spacer size={4} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mentorship</Text>
        <Text style={styles.mentorshipStatus}>
          {profile?.interested_in_mentorship ? '✓ Interested' : '○ Not interested'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  header: {
    marginTop: spacing[2],
  },
  greeting: {
    ...textStyles.headingMedium,
    color: colors.text.primary,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    gap: spacing[2],
  },
  cardTitle: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  progressStat: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.primary,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: spacing[2],
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.primary,
  },
  levelBadge: {
    ...textStyles.labelLarge,
    color: colors.brand.primary,
    textTransform: 'capitalize',
  },
  mentorshipStatus: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
  },
});
