export function formatDuration(seconds: number): string {
  const totalSeconds = Math.floor(seconds)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m.toString()}:${s.toString().padStart(2, '0')}`
}

export function formatPrice(gbp: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(gbp)
}

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(isoString),
  )
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
