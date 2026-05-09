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
  'Browse the full lesson library',
  'Explore all dance styles',
  'View instructor profiles',
  'Watch lesson previews',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Mark lessons as complete',
  'Save lessons to your journey',
  'Book 1-on-1 mentor sessions',
  'Personalised progress dashboard',
  'Early access to new content',
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
          Learn to dance from{' '}
          <span className="text-accent-primary">world-class</span>{' '}
          instructors
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
          <p className="mt-3 text-text-secondary">Start for free. Upgrade when you're ready to go deeper.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-bg-elevated rounded-2xl border border-border p-8 flex flex-col">
            <div>
              <p className="text-sm font-medium text-text-tertiary uppercase tracking-wide">Free</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-text-primary">$0</span>
                <span className="text-text-secondary mb-1">/ forever</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Everything you need to explore and discover.</p>
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
            <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold text-white">
              Coming soon
            </div>
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide">Pro</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="text-white/70 mb-1">/ month</span>
              </div>
              <p className="mt-3 text-sm text-white/80">For serious dancers ready to invest in their growth.</p>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle size={16} className="text-white flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="mt-8 block w-full text-center px-5 py-3 rounded-xl bg-white/20 text-white font-semibold text-sm cursor-not-allowed opacity-70"
            >
              Notify me when available
            </button>
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
