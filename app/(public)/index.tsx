import { Button, Spacer } from '@/components/ui';
import { colors, spacing, textStyles } from '@/theme';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LandingScreen(): React.JSX.Element {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Origin Step</Text>
        <Text style={styles.tagline}>Master any dance style, from home</Text>
      </View>

      <Spacer size={8} />

      <View style={styles.features}>
        <FeatureCard
          icon="🎓"
          title="Learn"
          description="Video lessons from beginner to advanced"
        />
        <FeatureCard icon="👨‍🏫" title="Mentor" description="Get personalized guidance from pros" />
        <FeatureCard
          icon="🎯"
          title="Track"
          description="Monitor your progress and celebrate wins"
        />
      </View>

      <Spacer size={8} />

      <View style={styles.cta}>
        <Link href="/(public)/sign-up" asChild>
          <Button label="Get Started" fullWidth />
        </Link>

        <Spacer size={3} />

        <Link href="/(public)/sign-in" asChild>
          <Button label="Sign In" variant="outline" fullWidth />
        </Link>
      </View>
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}): React.JSX.Element {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
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
  },
  header: {
    marginTop: spacing[8],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.brand.primary,
    fontSize: 40,
  },
  tagline: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  features: {
    gap: spacing[4],
  },
  featureCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing[4],
    gap: spacing[2],
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  featureDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  cta: {
    marginTop: spacing[6],
  },
});
