'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface PublicNavProps {
  isLoggedIn: boolean
}

const NAV_LINKS = [
  { href: '/learn', label: 'Learn' },
  { href: '/styles', label: 'Styles' },
  { href: '/mentors', label: 'Mentors' },
]

export function PublicNav({ isLoggedIn }: PublicNavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-bg-elevated border-b border-border z-30 flex items-center px-4 sm:px-6">
        <Link href="/" className="text-base font-bold text-text-primary mr-6 flex-shrink-0">
          OriginStep
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'text-text-primary bg-bg-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-accent-primary text-text-inverse hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-accent-primary text-text-inverse hover:opacity-90 transition-opacity"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="md:hidden ml-auto text-text-secondary hover:text-text-primary p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-bg-overlay z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden fixed top-14 left-0 right-0 bg-bg-elevated border-b border-border z-50 p-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-border pt-3 mt-3 space-y-1">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold bg-accent-primary text-text-inverse text-center"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold bg-accent-primary text-text-inverse text-center"
                  >
                    Get started free
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  )
}
