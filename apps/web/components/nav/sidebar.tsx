'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getClient } from '@/lib/supabase/browser'
import {
  LayoutDashboard,
  PlayCircle,
  Layers,
  Users,
  User,
  Bookmark,
  LayoutGrid,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

type UserRole = 'student' | 'mentor' | 'admin'

interface SidebarProps {
  userName: string
  userEmail: string
  userRole: UserRole
}

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  roles?: UserRole[]
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: PlayCircle },
  { href: '/styles', label: 'Styles', icon: Layers },
  { href: '/mentors', label: 'Mentors', icon: Users },
  { href: '/journey', label: 'Saved', icon: Bookmark },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/mentor-dashboard', label: 'My Students', icon: LayoutGrid, roles: ['mentor', 'admin'] },
  { href: '/admin', label: 'Admin', icon: Shield, roles: ['admin'] },
]

export function Sidebar({ userName, userEmail, userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const visibleItems = NAV_ITEMS.filter(
    item => !item.roles || item.roles.includes(userRole),
  )

  async function signOut() {
    await getClient().auth.signOut()
    router.push('/login')
  }

  const firstInitial = userName ? userName[0].toUpperCase() : userEmail[0].toUpperCase()
  const displayName = userName || userEmail.split('@')[0]

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <span className="text-lg font-bold text-text-primary tracking-tight">OriginStep</span>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {visibleItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-accent-primary text-text-inverse'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
              ].join(' ')}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          )
        })}
      </div>

      {/* User + sign out */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center text-text-primary text-sm font-semibold flex-shrink-0">
            {firstInitial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{displayName}</p>
            <p className="text-xs text-text-tertiary truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-status-error hover:bg-status-error-subtle transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-bg-elevated border-r border-border z-30">
        {nav}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-bg-elevated border-b border-border flex items-center justify-between px-4 z-30">
        <span className="text-base font-bold text-text-primary">OriginStep</span>
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="text-text-secondary hover:text-text-primary p-1"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-bg-overlay z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-72 flex flex-col bg-bg-elevated border-r border-border z-50 pt-14">
            {nav}
          </aside>
        </>
      )}
    </>
  )
}
