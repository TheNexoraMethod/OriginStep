'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Style {
  id: string
  name: string
}

interface FilterBarProps {
  styles: Style[]
  activeStyle: string
  activeDifficulty: string
}

const DIFFICULTIES = [
  { value: 'entry', label: 'Entry' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export function FilterBar({ styles, activeStyle, activeDifficulty }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/learn?${params.toString()}`)
  }, [router, searchParams])

  const pill = (active: boolean) =>
    [
      'px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
      active
        ? 'bg-accent-primary text-text-inverse'
        : 'bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-strong',
    ].join(' ')

  return (
    <div className="space-y-3">
      {/* Style filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide w-16 flex-shrink-0">Style</span>
        <div className="flex gap-2 flex-wrap">
          <button className={pill(!activeStyle)} onClick={() => setFilter('style', '')}>All</button>
          {styles.map(s => (
            <button key={s.id} className={pill(activeStyle === s.id)} onClick={() => setFilter('style', s.id)}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide w-16 flex-shrink-0">Level</span>
        <div className="flex gap-2 flex-wrap">
          <button className={pill(!activeDifficulty)} onClick={() => setFilter('difficulty', '')}>All</button>
          {DIFFICULTIES.map(d => (
            <button key={d.value} className={pill(activeDifficulty === d.value)} onClick={() => setFilter('difficulty', d.value)}>
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
