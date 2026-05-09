import { Button, Spacer, TextInput } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, textStyles } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as z from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen(): React.JSX.Element {
  const { signUpWithEmail, isLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUpWithEmail(data.email, data.password, data.name);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Join Origin Step</Text>
      <Text style={styles.subtitle}>Start your dance journey today</Text>

      <Spacer size={6} />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Full Name"
            placeholder="Your name"
            value={value || ''}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Confirm Password"
            placeholder="••••••"
            value={value || ''}
            onChangeText={onChange}
            type="password"
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Spacer size={4} />

      <Button
        label="Create Account"
        onPress={handleSubmit(onSubmit)}
        fullWidth
        loading={isLoading}
      />

      <Spacer size={4} />

      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <Link href="/(public)/sign-in" asChild>
          <Text style={styles.signinLink}>Sign in here</Text>
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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signinText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  signinLink: {
    ...textStyles.bodyMedium,
    color: colors.brand.primary,
    fontWeight: '600',
  },
});
