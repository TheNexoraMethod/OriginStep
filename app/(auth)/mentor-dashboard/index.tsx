import { colors, spacing, textStyles } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

// Mentor dashboard overview — placeholder.
// Full implementation in Phase 12 (Mentor Review Flow).
export default function MentorDashboardScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Mentor</Text>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.note}>Application review and offerings — Phase 12</Text>
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
  note: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[2],
  },
});
