import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useMentorById } from '@/features/mentors/hooks/useMentors';
import { useUpsertDraftApplication } from '@/features/mentorship/hooks/useMentorship';
import { colors, spacing, textStyles } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Spacer, Card } from '@/components/ui';

export default function MentorDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { data: mentor, isLoading } = useMentorById(id || null);
  const { mutate: upsertApplication, isPending } = useUpsertDraftApplication(
    user?.id || null,
    id || null
  );

  const handleApply = () => {
    if (id) {
      upsertApplication({
        motivation: 'Interested in learning from you',
        experience_level: 'intermediate',
        goals: 'Improve technique',
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading mentor...</Text>
      </View>
    );
  }

  if (!mentor) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Mentor not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mentorName}>{mentor.display_name}</Text>
        <Text style={styles.specialisms}>
          {mentor.specialisms?.join(' • ') || 'Various styles'}
        </Text>
      </View>

      <Spacer size={4} />

      {mentor.bio && (
        <>
          <Card padding={4}>
            <Text style={styles.cardTitle}>About</Text>
            <Text style={styles.bio}>{mentor.bio}</Text>
          </Card>
          <Spacer size={4} />
        </>
      )}

      <View style={styles.statsRow}>
        <Card padding={3} gap={1}>
          <Text style={styles.statLabel}>Sessions</Text>
          <Text style={styles.statValue}>{mentor.offerings?.length || 0}</Text>
        </Card>
        <Card padding={3} gap={1}>
          <Text style={styles.statLabel}>Status</Text>
          <Text style={[styles.statValue, { color: colors.semantic.success }]}>
            Available
          </Text>
        </Card>
      </View>

      <Spacer size={4} />

      <Text style={styles.sectionTitle}>Session Offerings</Text>
      <Spacer size={3} />

      {mentor.offerings?.length ? (
        mentor.offerings.map((offering) => (
          <Card key={offering.id} padding={4}>
            <Text style={styles.offeringTitle}>{offering.format}</Text>
            <Text style={styles.offeringDetails}>
              ${offering.rate_per_session} • {offering.max_students} student
              {offering.max_students !== 1 ? 's' : ''}
            </Text>
            {offering.description && (
              <Text style={styles.offeringDescription}>{offering.description}</Text>
            )}
          </Card>
        ))
      ) : (
        <Text style={styles.noOfferings}>No offerings available</Text>
      )}

      <Spacer size={6} />

      <Button
        label="Apply for Mentorship"
        onPress={handleApply}
        fullWidth
        loading={isPending}
      />

      <Spacer size={4} />
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
  mentorName: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  specialisms: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  cardTitle: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  bio: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  statLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  statValue: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  offeringTitle: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  offeringDetails: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  offeringDescription: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    marginTop: spacing[2],
    fontStyle: 'italic',
  },
  noOfferings: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
});
