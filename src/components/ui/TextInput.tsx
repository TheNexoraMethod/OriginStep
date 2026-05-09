import { colors, spacing, textStyles } from '@/theme';
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export function TextInput({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  type = 'text',
  disabled = false,
  multiline = false,
  numberOfLines = 1,
}: TextInputProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.error]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        secureTextEntry={type === 'password'}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  input: {
    ...textStyles.bodyMedium,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
  },
  error: {
    borderColor: colors.semantic.error,
  },
  errorText: {
    ...textStyles.bodySmall,
    color: colors.semantic.error,
    marginTop: spacing[1],
  },
});
