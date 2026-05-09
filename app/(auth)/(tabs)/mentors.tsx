import { useDiscoverableMentors } from '@/features/mentors/hooks/useMentors';
import { colors, spacing, textStyles } from '@/theme';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Spacer } from '@/components/ui';

export default function MentorsTabScreen(): React.JSX.Element {
  const { data: mentors = [], isLoading } = useDiscoverableMentors();

  return (
    <ScrollView style={s.scrollView} contentContainerStyle={s.container}>
      <View style={s.header}>
        <Text style={s.heading}>Mentors</Text>
        <Text style={s.subtitle}>1-to-1 sessions with experienced dancers</Text>
      </View>

      <Spacer size={4} />

      {isLoading ? (
        <Text style={s.loadingText}>Loading mentors...</Text>
      ) : mentors.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyText}>No mentors available yet</Text>
        </View>
      ) : (
        <View style={s.list}>
          {mentors.map((mentor) => (
            <Link key={mentor.id} href={`/(auth)/mentors/${mentor.id}`} asChild>
              <Pressable style={s.card}>
                <View style={s.cardContent}>
                  <Text style={s.mentorName}>{mentor.display_name}</Text>
                  <Text style={s.specialisms}>
                    {mentor.specialisms?.join(', ') || 'Various styles'}
                  </Text>
                </View>
                <Text style={s.arrow}>→</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      )}

      <Spacer size={8} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
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
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing[4],
  },
  list: {
    gap: spacing[3],
  },
  card: {
    backgroundColor: colors.background.elevated,
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
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  specialisms: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
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
    ...textStyles.body,
    color: colors.text.secondary,
  },
});
