import { colors, spacing } from '@/theme';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  onPress,
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps): React.JSX.Element {
  const variantStyles =
    variant === 'primary'
      ? styles.primary
      : variant === 'secondary'
        ? styles.secondary
        : styles.outline;

  const sizeStyles =
    size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variantStyles,
        sizeStyles,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant === 'outline' ? styles.outlineText : styles.primaryText]}>
        {loading ? 'Loading...' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.brand.primary,
  },
  small: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  medium: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  large: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: colors.text.inverted,
  },
  outlineText: {
    color: colors.brand.primary,
  },
});
