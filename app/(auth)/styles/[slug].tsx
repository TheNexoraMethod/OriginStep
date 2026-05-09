import React from 'react';
import { useStyleBySlug } from '@/features/styles/hooks/useStyles';
import { useLessonsByStyle } from '@/features/videos/hooks/useVideos';
import { colors, spacing, textStyles } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Spacer, Card } from '@/components/ui';

export default function StyleDetailScreen(): React.JSX.Element {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data: style, isLoading: styleLoading } = useStyleBySlug(slug || null);
  const { data: lessons = [], isLoading: lessonsLoading } = useLessonsByStyle(style?.id || null);

  const isLoading = styleLoading || lessonsLoading;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading style...</Text>
      </View>
    );
  }

  if (!style) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Style not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{style.name}</Text>
        <Text style={styles.category}>{style.category}</Text>
        {style.description && <Text style={styles.description}>{style.description}</Text>}
      </View>

      <Spacer size={6} />

      <Text style={styles.lessonsTitle}>Lessons ({lessons.length})</Text>
      <Spacer size={3} />

      {lessons.length > 0 ? (
        <View style={styles.lessonsList}>
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/(auth)/videos/${lesson.id}`} asChild>
              <Pressable style={styles.lessonCard}>
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <View style={styles.lessonMeta}>
                    <Text style={styles.lessonDifficulty}>
                      {lesson.difficulty_level}
                    </Text>
                    <Text style={styles.lessonDuration}>
                      {lesson.duration_minutes}m
                    </Text>
                  </View>
                </View>
                <Text style={styles.arrow}>→</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      ) : (
        <Text style={styles.noLessons}>No lessons available yet</Text>
      )}

      <Spacer size={8} />
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
    gap: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  category: {
    ...textStyles.labelMedium,
    color: colors.brand.primary,
    textTransform: 'capitalize',
  },
  description: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  lessonsTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  lessonsList: {
    gap: spacing[3],
  },
  lessonCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
    gap: spacing[2],
  },
  lessonTitle: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  lessonDifficulty: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  lessonDuration: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  arrow: {
    ...textStyles.bodyLarge,
    color: colors.text.tertiary,
  },
  noLessons: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: spacing[6],
  },
});
