import { colors, spacing, textStyles } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

// Admin overview — placeholder.
// Full implementation in Phase 14 (Admin Foundations).
export default function AdminIndexScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Admin</Text>
      <Text style={styles.heading}>Overview</Text>
      <Text style={styles.note}>Moderation and content tools — Phase 14</Text>
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
