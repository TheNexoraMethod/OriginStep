import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useProfile, useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { colors, spacing, textStyles } from '@/theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Spacer, Card } from '@/components/ui';

export default function ProfileScreen(): React.JSX.Element {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile(user?.id || '');
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile(user?.id || '');

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Profile</Text>
      </View>

      <Spacer size={6} />

      <Card padding={4} gap={3}>
        <View>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile?.display_name || 'Not set'}</Text>
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Unknown'}</Text>
        </View>
        <View>
          <Text style={styles.label}>Dance Level</Text>
          <Text style={styles.value}>{profile?.dance_level || 'Not set'}</Text>
        </View>
        <View>
          <Text style={styles.label}>Onboarding Status</Text>
          <Text style={styles.value}>
            {profile?.onboarding_completed ? '✓ Complete' : '○ Incomplete'}
          </Text>
        </View>
      </Card>

      <Spacer size={6} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Button
          label="Sign Out"
          onPress={handleSignOut}
          variant="secondary"
          fullWidth
          loading={isUpdating}
        />
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  header: {
    marginTop: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  label: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  value: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    marginTop: spacing[1],
    textTransform: 'capitalize',
  },
  section: {
    gap: spacing[3],
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
});
