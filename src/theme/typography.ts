import type { TextStyle } from 'react-native';

// Typography system for Origin Step.
//
// Font families: placeholders using 'System' until custom fonts are loaded in Phase 7.
// After fonts are added, update these values and the app will use them everywhere.

export const fontFamilies = {
  sans: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  mono: {
    regular: 'System',
  },
} as const;

// Numeric type scale in points
export const typeScale = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 42,
} as const;

export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

// Semantic text styles — compose from the primitives above.
// Use these via the <Text> component variants rather than raw StyleSheet entries.
export const textStyles = {
  displayLarge: {
    fontSize: typeScale['3xl'],
    lineHeight: typeScale['3xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontWeight: '700',
  } satisfies TextStyle,

  displaySmall: {
    fontSize: typeScale['2xl'],
    lineHeight: typeScale['2xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
    fontWeight: '700',
  } satisfies TextStyle,

  headingLarge: {
    fontSize: typeScale.xl,
    lineHeight: typeScale.xl * lineHeights.snug,
    letterSpacing: letterSpacing.tight,
    fontWeight: '600',
  } satisfies TextStyle,

  headingMedium: {
    fontSize: typeScale.lg,
    lineHeight: typeScale.lg * lineHeights.snug,
    fontWeight: '600',
  } satisfies TextStyle,

  headingSmall: {
    fontSize: typeScale.md,
    lineHeight: typeScale.md * lineHeights.snug,
    fontWeight: '600',
  } satisfies TextStyle,

  bodyLarge: {
    fontSize: typeScale.md,
    lineHeight: typeScale.md * lineHeights.normal,
    fontWeight: '400',
  } satisfies TextStyle,

  body: {
    fontSize: typeScale.base,
    lineHeight: typeScale.base * lineHeights.normal,
    fontWeight: '400',
  } satisfies TextStyle,

  bodySmall: {
    fontSize: typeScale.sm,
    lineHeight: typeScale.sm * lineHeights.normal,
    fontWeight: '400',
  } satisfies TextStyle,

  caption: {
    fontSize: typeScale.xs,
    lineHeight: typeScale.xs * lineHeights.normal,
    fontWeight: '400',
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,

  label: {
    fontSize: typeScale.sm,
    lineHeight: typeScale.sm * lineHeights.snug,
    fontWeight: '500',
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,

  // Overline: short uppercase labels above headings, status labels, category tags
  overline: {
    fontSize: typeScale.xs,
    lineHeight: typeScale.xs * lineHeights.normal,
    fontWeight: '600',
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  // Backwards-compat aliases — use canonical tokens in new code
  bodyMedium: {
    fontSize: typeScale.base,
    lineHeight: typeScale.base * lineHeights.normal,
    fontWeight: '400',
  } satisfies TextStyle,
  labelLarge: {
    fontSize: typeScale.base,
    lineHeight: typeScale.base * lineHeights.snug,
    fontWeight: '500',
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,
  labelMedium: {
    fontSize: typeScale.sm,
    lineHeight: typeScale.sm * lineHeights.snug,
    fontWeight: '500',
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,
  labelSmall: {
    fontSize: typeScale.xs,
    lineHeight: typeScale.xs * lineHeights.snug,
    fontWeight: '500',
  } satisfies TextStyle,
} as const;

export type TypeScale = typeof typeScale;
export type TextStyles = typeof textStyles;
