// Colour token system for Origin Step.
//
// Design direction: dark-first, premium, warm. Deep blacks with warm amber/rust/gold accents.
// No hex codes should appear anywhere in component files — always reference these tokens.
//
// Token naming convention:
//   colors.[category].[variant]
//
// When adding new tokens, add them here first. Never add ad-hoc colour values to components.

export const colors = {
  // ─── Base surfaces ────────────────────────────────────────────────────────
  background: {
    primary: '#0D0D0D', // Default screen background — deep black
    elevated: '#161616', // Cards, sheet surfaces — slightly lifted
    subtle: '#1E1E1E', // Section backgrounds, subtle separation
    overlay: 'rgba(0, 0, 0, 0.72)', // Modal / sheet overlays
    secondary: '#161616', // alias for elevated
  },

  // ─── Accent palette ───────────────────────────────────────────────────────
  // Warm amber / rust / gold — editorial, culturally grounded
  accent: {
    primary: '#C8873A', // Warm amber — primary CTAs, active states
    secondary: '#E09B4E', // Lighter amber — highlights, progress fill
    muted: '#8A5A25', // Muted amber — pressed states, secondary elements
    rust: '#A84B2A', // Rust — alternative accent for variety
    gold: '#D4A843', // Gold — premium indicators, featured content
  },

  // ─── Text ─────────────────────────────────────────────────────────────────
  text: {
    primary: '#F0EDE8', // Near-white with a warm tone — body copy, headings
    secondary: '#9E9790', // Muted warm grey — supporting text, metadata
    tertiary: '#5E5A55', // Subtle — placeholders, captions, disabled labels
    inverse: '#0D0D0D', // For text placed on accent-coloured backgrounds
    accent: '#C8873A', // Accent-coloured text — links, highlighted labels
    disabled: '#3D3A36',
    inverted: '#0D0D0D', // alias for inverse
  },

  // ─── Borders and dividers ─────────────────────────────────────────────────
  border: {
    default: '#2A2826',
    subtle: '#1E1C1A',
    strong: '#3D3A36',
    accent: '#C8873A',
  },

  // ─── Semantic status ──────────────────────────────────────────────────────
  status: {
    success: '#4CAF6E',
    successSubtle: '#1A3325',
    warning: '#E09B4E',
    warningSubtle: '#3A2A15',
    error: '#E05555',
    errorSubtle: '#3A1515',
    info: '#5A9FD4',
    infoSubtle: '#152030',
  },

  // ─── Application status ───────────────────────────────────────────────────
  // Each status has a foreground colour for badge text.
  applicationStatus: {
    draft: '#5E5A55',
    submitted: '#5A9FD4',
    in_review: '#E09B4E',
    accepted: '#4CAF6E',
    declined: '#E05555',
    waitlisted: '#9B5A9F',
    needs_more_context: '#D4A843',
    invited_to_next_step: '#C8873A',
  },

  // ─── Utilities ────────────────────────────────────────────────────────────
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',

  // ─── Backwards-compat aliases — use canonical tokens in new code ──────────
  brand: {
    primary: '#C8873A',
  },
  semantic: {
    success: '#4CAF6E',
    error: '#E05555',
    warning: '#E09B4E',
  },
} as const;

export type Colors = typeof colors;
