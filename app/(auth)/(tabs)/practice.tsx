import { colors, spacing, textStyles } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function PracticeScreen(): React.JSX.Element {
  return (
    <View style={s.container}>
      <Text style={s.heading}>Practice</Text>
      <Text style={s.subtitle}>AI movement tracking — coming in a future update</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[12],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.tertiary,
    marginTop: spacing[2],
  },
});
