import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Layers } from 'lucide-react'
import { VideoPlayer } from '@/components/learn/video-player'
import { MarkCompleteButton } from '@/components/learn/mark-complete-button'

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
  social_application: 'Social Application',
  practice_guidance: 'Practice Guidance',
  cultural_context: 'Cultural Context',
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}m`
  return `${m}m`
}

type PageProps = { params: Promise<{ slug: string }> }

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: lessonData } = await supabase
    .from('video_lessons')
    .select('*, dance_styles(name, slug)')
    .eq('slug', slug)
    .single()

  if (!lessonData) notFound()

  const lesson = lessonData as {
    id: string
    title: string
    slug: string
    description: string | null
    lesson_type: string
    difficulty: string
    duration_seconds: number
    video_url: string
    thumbnail_url: string | null
    instructor_name: string
    style_id: string
    dance_styles: { name: string; slug: string } | null
  }

  const [{ data: progressData }, { data: relatedData }] = await Promise.all([
    user
      ? supabase
          .from('user_video_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('video_id', lesson.id)
          .single()
      : Promise.resolve({ data: null }),
    supabase
      .from('video_lessons')
      .select('id, title, slug, thumbnail_url, duration_seconds, difficulty')
      .eq('style_id', lesson.style_id)
      .neq('id', lesson.id)
      .order('order_index')
      .limit(4),
  ])

  const isCompleted = (progressData as { completed?: boolean } | null)?.completed ?? false
  const related = (relatedData ?? []) as {
    id: string
    title: string
    slug: string
    thumbnail_url: string | null
    duration_seconds: number
    difficulty: string
  }[]

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back */}
      <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={16} />
        Back to lessons
      </Link>

      {/* Video player */}
      <VideoPlayer url={lesson.video_url} title={lesson.title} />

      {/* Lesson header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${DIFFICULTY_COLORS[lesson.difficulty] ?? 'text-text-tertiary bg-bg-subtle'}`}>
              {DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}
            </span>
            <span className="text-xs text-text-tertiary bg-bg-subtle px-2.5 py-1 rounded-full">
              {LESSON_TYPE_LABELS[lesson.lesson_type] ?? lesson.lesson_type}
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-text-primary">{lesson.title}</h1>

          <div className="flex items-center gap-4 text-sm text-text-secondary flex-wrap">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {lesson.instructor_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {formatDuration(lesson.duration_seconds)}
            </span>
            {lesson.dance_styles && (
              <Link href={`/styles/${lesson.dance_styles.slug}`} className="flex items-center gap-1.5 hover:text-text-accent transition-colors">
                <Layers size={14} /> {lesson.dance_styles.name}
              </Link>
            )}
          </div>
        </div>

        {user && (
          <MarkCompleteButton
            videoId={lesson.id}
            userId={user.id}
            initiallyCompleted={isCompleted}
          />
        )}
      </div>

      {/* Sign-up nudge for guests */}
      {!user && (
        <div className="bg-bg-elevated rounded-2xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-text-primary">Track your progress</p>
            <p className="text-sm text-text-secondary mt-0.5">Create a free account to mark lessons complete and save your journey.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-text-secondary hover:text-text-primary hover:border-accent-primary transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-primary text-text-inverse hover:opacity-90 transition-opacity"
            >
              Sign up free
            </Link>
          </div>
        </div>
      )}

      {/* Description */}
      {lesson.description && (
        <div className="bg-bg-elevated rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">About this lesson</h2>
          <p className="text-text-primary leading-relaxed">{lesson.description}</p>
        </div>
      )}

      {/* Related lessons */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">More from this style</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(r => (
              <Link
                key={r.id}
                href={`/learn/${r.slug}`}
                className="group bg-bg-elevated rounded-xl overflow-hidden border border-border hover:border-accent-primary transition-colors"
              >
                <div className="aspect-video bg-bg-subtle flex items-center justify-center">
                  {r.thumbnail_url ? (
                    <img src={r.thumbnail_url} alt={r.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center">
                      <span className="text-accent-primary text-xs">▶</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text-primary line-clamp-2 group-hover:text-accent-primary transition-colors">
                    {r.title}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {formatDuration(r.duration_seconds)} · {DIFFICULTY_LABELS[r.difficulty] ?? r.difficulty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
