import { colors, spacing, textStyles } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Mentorship application form — placeholder.
// Full implementation in Phase 11 (Mentors and Applications).
export default function MentorshipApplyScreen(): React.JSX.Element {
  const { mentorId } = useLocalSearchParams<{ mentorId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Mentorship Application</Text>
      <Text style={styles.heading}>Apply</Text>
      <Text style={styles.id}>Mentor: {mentorId}</Text>
      <Text style={styles.note}>Application form — Phase 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[12],
  },
  overline: {
    ...textStyles.overline,
    color: colors.text.tertiary,
    marginBottom: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  id: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
  note: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[4],
  },
});
