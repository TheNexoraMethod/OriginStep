import React from 'react';
import { useDiscoverableMentors } from '@/features/mentors/hooks/useMentors';
import { colors, spacing, textStyles } from '@/theme';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Spacer } from '@/components/ui';

export default function MentorsIndexScreen(): React.JSX.Element {
  const { data: mentors = [], isLoading } = useDiscoverableMentors();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading mentors...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Find a Mentor</Text>
        <Text style={styles.subtitle}>Learn from experienced dancers</Text>
      </View>

      <Spacer size={4} />

      <View style={styles.mentorsList}>
        {mentors.map((mentor) => (
          <Link key={mentor.id} href={`/(auth)/mentors/${mentor.id}`} asChild>
            <Pressable style={styles.mentorCard}>
              <View style={styles.cardContent}>
                <Text style={styles.mentorName}>{mentor.display_name}</Text>
                <Text style={styles.specialisms}>
                  {mentor.specialisms?.join(', ') || 'Various styles'}
                </Text>
                <Text style={styles.offeringsCount}>
                  {mentor.offerings?.length || 0} session offering{mentor.offerings?.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {mentors.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No mentors available yet</Text>
        </View>
      )}
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
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  mentorsList: {
    gap: spacing[3],
  },
  mentorCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    gap: spacing[1],
  },
  mentorName: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  specialisms: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  offeringsCount: {
    ...textStyles.bodySmall,
    color: colors.brand.primary,
    fontWeight: '600',
    marginTop: spacing[1],
  },
  arrow: {
    ...textStyles.bodyLarge,
    color: colors.text.tertiary,
  },
  empty: {
    alignItems: 'center',
    marginTop: spacing[8],
  },
  emptyText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
});
