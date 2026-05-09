import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PlayCircle, Clock, BookOpen } from 'lucide-react'
import { FilterBar } from '@/components/learn/filter-bar'
import { Suspense } from 'react'

const DIFFICULTY_LABELS: Record<string, string> = {
  entry: 'Entry',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const DIFFICULTY_COLORS: Record<string, string> = {
  entry: 'text-status-success bg-status-success-subtle',
  beginner: 'text-status-info bg-status-info-subtle',
  intermediate: 'text-status-warning bg-status-warning-subtle',
  advanced: 'text-status-error bg-status-error-subtle',
}

const LESSON_TYPE_LABELS: Record<string, string> = {
  groove: 'Groove',
  basics: 'Basics',
  drill: 'Drill',
  social_application: 'Social',
  practice_guidance: 'Guidance',
  cultural_context: 'Cultural Context',
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}m`
  return `${m}m`
}

type PageProps = {
  searchParams: Promise<{ style?: string; difficulty?: string }>
}

export default async function LearnPage({ searchParams }: PageProps) {
  const { style: styleFilter, difficulty: difficultyFilter } = await searchParams
  const supabase = await createClient()

  let lessonsQuery = supabase
    .from('video_lessons')
    .select('id, title, slug, description, lesson_type, difficulty, duration_seconds, thumbnail_url, instructor_name, style_id')
    .order('order_index', { ascending: true })

  if (styleFilter) lessonsQuery = lessonsQuery.eq('style_id', styleFilter)
  if (difficultyFilter) lessonsQuery = lessonsQuery.eq('difficulty', difficultyFilter)

  const [{ data: stylesData }, { data: lessonsData }] = await Promise.all([
    supabase.from('dance_styles').select('id, name').order('name'),
    lessonsQuery,
  ])

  const styles = (stylesData ?? []) as { id: string; name: string }[]
  const lessons = (lessonsData ?? []) as {
    id: string
    title: string
    slug: string
    description: string | null
    lesson_type: string
    difficulty: string
    duration_seconds: number
    thumbnail_url: string | null
    instructor_name: string
    style_id: string
  }[]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">Learn</h1>
        <p className="text-text-secondary mt-1">
          {lessons.length > 0
            ? `${lessons.length} lesson${lessons.length === 1 ? '' : 's'}${styleFilter || difficultyFilter ? ' matching your filters' : ''}`
            : 'Video lessons from world-class instructors'}
        </p>
      </div>

      {/* Filters */}
      {styles.length > 0 && (
        <Suspense>
          <FilterBar
            styles={styles}
            activeStyle={styleFilter ?? ''}
            activeDifficulty={difficultyFilter ?? ''}
          />
        </Suspense>
      )}

      {/* Lesson grid */}
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map(lesson => (
            <Link
              key={lesson.id}
              href={`/learn/${lesson.slug}`}
              className="group bg-bg-elevated rounded-2xl overflow-hidden border border-border hover:border-accent-primary transition-colors flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-bg-subtle flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                {lesson.thumbnail_url ? (
                  <img
                    src={lesson.thumbnail_url}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <PlayCircle size={36} className="text-text-tertiary" />
                )}
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock size={10} />
                  {formatDuration(lesson.duration_seconds)}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[lesson.difficulty] ?? 'text-text-tertiary bg-bg-subtle'}`}>
                    {DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    {LESSON_TYPE_LABELS[lesson.lesson_type] ?? lesson.lesson_type}
                  </span>
                </div>
                <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                  {lesson.title}
                </p>
                <p className="text-sm text-text-secondary mt-auto">{lesson.instructor_name}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-bg-elevated rounded-2xl border border-border p-12 text-center">
          <BookOpen size={40} className="text-text-tertiary mx-auto mb-4" />
          <p className="text-text-primary font-semibold">
            {styleFilter || difficultyFilter ? 'No lessons match those filters' : 'Lessons coming soon'}
          </p>
          <p className="text-text-secondary text-sm mt-1">
            {styleFilter || difficultyFilter
              ? 'Try adjusting your filters above.'
              : 'Our team is adding video content — check back shortly.'}
          </p>
        </div>
      )}
    </div>
  )
}
