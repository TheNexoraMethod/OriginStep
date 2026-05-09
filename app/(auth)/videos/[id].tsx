import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useLessonById, useVideoProgress, useUpdateVideoProgress, useCompleteLesson } from '@/features/videos/hooks/useVideos';
import { colors, spacing, textStyles } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Spacer, Card } from '@/components/ui';

export default function VideoDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { data: lesson, isLoading: lessonLoading } = useLessonById(id || null);
  const { data: progress, isLoading: progressLoading } = useVideoProgress(
    user?.id || null,
    id || null
  );
  const { mutate: updateProgress, isPending: isUpdating } = useUpdateVideoProgress(
    user?.id || '',
    id || ''
  );
  const { mutate: completeLesson, isPending: isCompleting } = useCompleteLesson(
    user?.id || '',
    id || ''
  );

  const isLoading = lessonLoading || progressLoading;

  const handleUpdateProgress = () => {
    updateProgress({
      completion_percent: Math.min((progress?.completion_percent || 0) + 25, 100),
    });
  };

  const handleComplete = () => {
    completeLesson();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading video...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Video not found</Text>
      </View>
    );
  }

  const progressPercent = progress?.completion_percent || 0;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoIcon}>▶️</Text>
          <Text style={styles.videoText}>Video Player</Text>
        </View>
      </View>

      <Spacer size={4} />

      <View style={styles.header}>
        <Text style={styles.heading}>{lesson.title}</Text>
        <Text style={styles.difficulty}>{lesson.difficulty_level}</Text>
      </View>

      {lesson.description && (
        <>
          <Spacer size={4} />
          <Text style={styles.description}>{lesson.description}</Text>
        </>
      )}

      <Spacer size={6} />

      <Card padding={4} gap={3}>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>{lesson.duration_minutes}m</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={[styles.metaValue, progress?.completed ? styles.completed : {}]}>
              {progress?.completed ? '✓ Complete' : 'In Progress'}
            </Text>
          </View>
        </View>
      </Card>

      <Spacer size={6} />

      {!progress?.completed ? (
        <>
          <Button
            label="+ 25% Progress"
            onPress={handleUpdateProgress}
            fullWidth
            loading={isUpdating}
          />
          <Spacer size={3} />
          <Button
            label="Mark Complete"
            onPress={handleComplete}
            variant="secondary"
            fullWidth
            loading={isCompleting}
          />
        </>
      ) : (
        <Card padding={4}>
          <Text style={styles.completedText}>✓ You have completed this lesson!</Text>
        </Card>
      )}

      <Spacer size={6} />
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
  videoContainer: {
    marginTop: spacing[2],
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoPlaceholder: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 12,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[2],
  },
  videoIcon: {
    fontSize: 48,
  },
  videoText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  header: {
    gap: spacing[2],
  },
  heading: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  difficulty: {
    ...textStyles.labelMedium,
    color: colors.brand.primary,
    textTransform: 'capitalize',
  },
  description: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  progressContainer: {
    gap: spacing[3],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  progressPercent: {
    ...textStyles.labelLarge,
    color: colors.brand.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.primary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  metaItem: {
    flex: 1,
    gap: spacing[1],
  },
  metaLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  metaValue: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  completed: {
    color: colors.semantic.success,
  },
  completedText: {
    ...textStyles.bodyMedium,
    color: colors.semantic.success,
    textAlign: 'center',
  },
});
