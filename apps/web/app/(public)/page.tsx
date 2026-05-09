import Link from 'next/link'
import { ArrowRight, PlayCircle, Layers, Users, TrendingUp, CheckCircle, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: PlayCircle,
    title: 'Video Library',
    description: 'Hundreds of lessons across every style, from entry-level grooves to advanced technique.',
  },
  {
    icon: Layers,
    title: 'Every Dance Style',
    description: 'House, Afrobeats, Hip-Hop, Dancehall, Breaking and more — explore what moves you.',
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    description: 'Connect with world-class instructors for personalised 1-on-1 coaching sessions.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Journey',
    description: 'Mark lessons complete, save favourites, and watch your progress build over time.',
  },
]

const FREE_FEATURES = [
  'Full access to all tutorial videos',
  'Browse and train in every dance style',
  'Save favourites and track your history',
  'Keep a training journal',
  'Connect with mentors (mentors set their own rates)',
]

const PRO_FEATURES = [
  'Smart progress tracking and stats',
  'Session reminders and streaks',
  'Training plans from mentors',
  'Early access to new styles and features',
]

export default function HomePage() {
  return (
    <div className="text-text-primary">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
          <Zap size={14} />
          Free to browse — no account needed
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
          Be mentored by{' '}
          <span className="text-accent-primary">world-class</span>{' '}
          movement artists
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Browse hundreds of video lessons across every dance style. Free to explore, built to grow with you.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-text-inverse font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <PlayCircle size={18} />
            Browse lessons
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary font-semibold text-sm hover:border-accent-primary transition-colors"
          >
            Get started free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-bg-elevated border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Everything you need to level up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-bg-primary rounded-2xl border border-border p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-accent-primary" />
                </div>
                <h3 className="font-semibold text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">Simple, honest pricing</h2>
          <p className="mt-3 text-text-secondary">Create a free account to unlock your dance journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-bg-elevated rounded-2xl border border-border p-8 flex flex-col">
            <div>
              <p className="text-sm font-medium text-text-tertiary uppercase tracking-wide">Free account</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-text-primary">$0</span>
                <span className="text-text-secondary mb-1">/ forever</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Everything you need to start and grow your dance journey.</p>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle size={16} className="text-status-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 block text-center px-5 py-3 rounded-xl border border-border text-text-primary font-semibold text-sm hover:border-accent-primary transition-colors"
            >
              Create free account
            </Link>
          </div>

          {/* Pro tier */}
          <div className="bg-accent-primary rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide">PRO (Coming soon)</p>
              <p className="mt-3 text-sm text-white/80">Unlock advanced tracking and mobile-first training tools.</p>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle size={16} className="text-white flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-white/60 text-center">Launching with the OriginStep mobile app.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-bg-elevated border-t border-border py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to start moving?</h2>
          <p className="mt-3 text-text-secondary">
            No credit card. No pressure. Just great dance content.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-text-inverse font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <PlayCircle size={18} />
              Browse lessons
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-primary border border-border text-text-primary font-semibold text-sm hover:border-accent-primary transition-colors"
            >
              Sign up free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
