import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PlayCircle, Users, Layers, ArrowRight, BookOpen } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}h ${m % 60}m`
  return `${m}m`
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileResult, stylesResult, lessonsResult, savedResult] = await Promise.all([
    supabase.from('users').select('full_name, dance_level, onboarding_completed').eq('id', user!.id).single(),
    supabase.from('dance_styles').select('id, slug, name, category, thumbnail_url, summary').limit(6),
    supabase.from('video_lessons').select('id, title, slug, duration_seconds, difficulty, instructor_name, thumbnail_url').order('created_at', { ascending: false }).limit(4),
    supabase.from('saved_items').select('item_type').eq('user_id', user!.id),
  ])

  const profile = profileResult.data
  const styles = stylesResult.data ?? []
  const lessons = lessonsResult.data ?? []
  const saved = savedResult.data ?? []

  const firstName = profile?.full_name?.split(' ')[0] || 'there'
  const savedCounts = {
    video: saved.filter(s => s.item_type === 'video').length,
    style: saved.filter(s => s.item_type === 'style').length,
    mentor: saved.filter(s => s.item_type === 'mentor').length,
  }

  return (
    <div className="space-y-10">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-text-secondary mt-1">
          {profile?.dance_level
            ? `Level: ${profile.dance_level.replace('_', ' ')}`
            : 'Welcome to OriginStep'}
        </p>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/learn" className="group bg-bg-elevated rounded-2xl p-5 border border-border hover:border-accent-primary transition-colors">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-3">
            <PlayCircle size={20} className="text-accent-primary" />
          </div>
          <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Start learning</p>
          <p className="text-sm text-text-secondary mt-0.5">
            {lessons.length > 0 ? `${lessons.length} lessons available` : 'Browse video lessons'}
          </p>
        </Link>

        <Link href="/mentors" className="group bg-bg-elevated rounded-2xl p-5 border border-border hover:border-accent-primary transition-colors">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-3">
            <Users size={20} className="text-accent-primary" />
          </div>
          <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Find a mentor</p>
          <p className="text-sm text-text-secondary mt-0.5">Work with world-class instructors</p>
        </Link>

        <Link href="/styles" className="group bg-bg-elevated rounded-2xl p-5 border border-border hover:border-accent-primary transition-colors">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-3">
            <Layers size={20} className="text-accent-primary" />
          </div>
          <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Explore styles</p>
          <p className="text-sm text-text-secondary mt-0.5">
            {styles.length > 0 ? `${styles.length} styles in the catalog` : 'Discover dance forms'}
          </p>
        </Link>
      </div>

      {/* Saved stats */}
      {(savedCounts.video + savedCounts.style + savedCounts.mentor) > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Your saved items</h2>
            <Link href="/journey" className="text-sm text-text-accent hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-4">
            {savedCounts.video > 0 && (
              <div className="bg-bg-elevated rounded-xl px-4 py-3 border border-border">
                <p className="text-xl font-bold text-text-primary">{savedCounts.video}</p>
                <p className="text-xs text-text-secondary mt-0.5">Saved videos</p>
              </div>
            )}
            {savedCounts.style > 0 && (
              <div className="bg-bg-elevated rounded-xl px-4 py-3 border border-border">
                <p className="text-xl font-bold text-text-primary">{savedCounts.style}</p>
                <p className="text-xs text-text-secondary mt-0.5">Saved styles</p>
              </div>
            )}
            {savedCounts.mentor > 0 && (
              <div className="bg-bg-elevated rounded-xl px-4 py-3 border border-border">
                <p className="text-xl font-bold text-text-primary">{savedCounts.mentor}</p>
                <p className="text-xs text-text-secondary mt-0.5">Saved mentors</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent lessons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Latest lessons</h2>
          <Link href="/learn" className="text-sm text-text-accent hover:underline flex items-center gap-1">
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lessons.map(lesson => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.slug}`}
                className="group bg-bg-elevated rounded-2xl overflow-hidden border border-border hover:border-accent-primary transition-colors"
              >
                <div className="aspect-video bg-bg-subtle flex items-center justify-center">
                  {lesson.thumbnail_url ? (
                    <img src={lesson.thumbnail_url} alt={lesson.title} className="w-full h-full object-cover" />
                  ) : (
                    <PlayCircle size={28} className="text-text-tertiary" />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent-primary transition-colors">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {lesson.instructor_name} · {formatDuration(lesson.duration_seconds)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-bg-elevated rounded-2xl border border-border p-8 text-center">
            <BookOpen size={32} className="text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary font-medium">Lessons coming soon</p>
            <p className="text-text-tertiary text-sm mt-1">
              Our team is adding content — check back shortly.
            </p>
          </div>
        )}
      </div>

      {/* Dance styles */}
      {styles.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Explore styles</h2>
            <Link href="/styles" className="text-sm text-text-accent hover:underline flex items-center gap-1">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {styles.map(style => (
              <Link
                key={style.id}
                href={`/styles/${style.slug}`}
                className="group bg-bg-elevated rounded-xl overflow-hidden border border-border hover:border-accent-primary transition-colors text-center p-4"
              >
                {style.thumbnail_url ? (
                  <img src={style.thumbnail_url} alt={style.name} className="w-10 h-10 rounded-full mx-auto mb-2 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-primary/10 mx-auto mb-2 flex items-center justify-center">
                    <Layers size={16} className="text-accent-primary" />
                  </div>
                )}
                <p className="text-xs font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
                  {style.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
