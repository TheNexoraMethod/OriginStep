import { colors, spacing, textStyles } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Application status screen (student-facing) — placeholder.
// Full implementation in Phase 11 (Mentors and Applications).
export default function ApplicationDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Application</Text>
      <Text style={styles.heading}>Status</Text>
      <Text style={styles.id}>{id}</Text>
      <Text style={styles.note}>Application status view — Phase 11</Text>
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
