import { colors, spacing } from '@/theme';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  gap?: number;
}

export function Card({ children, padding = 4, gap = 3 }: CardProps): React.JSX.Element {
  return (
    <View style={[styles.card, { padding: spacing[padding], gap: spacing[gap] }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
});
