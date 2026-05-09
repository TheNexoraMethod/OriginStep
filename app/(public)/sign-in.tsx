import { Button, Spacer, TextInput } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, textStyles } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as z from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen(): React.JSX.Element {
  const { signInWithEmail, isLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signInWithEmail(data.email, data.password);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue your journey</Text>

      <Spacer size={6} />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            placeholder="your@email.com"
            value={value || ''}
            onChangeText={onChange}
            type="email"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            placeholder="••••••"
            value={value || ''}
            onChangeText={onChange}
            type="password"
            error={errors.password?.message}
          />
        )}
      />

      <Spacer size={4} />

      <Button label="Sign In" onPress={handleSubmit(onSubmit)} fullWidth loading={isLoading} />

      <Spacer size={4} />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Link href="/(public)/sign-up" asChild>
          <Text style={styles.signupLink}>Sign up here</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[8],
    justifyContent: 'center',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  signupLink: {
    ...textStyles.bodyMedium,
    color: colors.brand.primary,
    fontWeight: '600',
  },
});
