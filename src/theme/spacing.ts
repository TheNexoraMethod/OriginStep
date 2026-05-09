// Spacing scale built on a 4-point base.
// Always use these values — never hardcode pixel values in component StyleSheets.
//
// Named semantic aliases are provided for common layout decisions so that
// components don't need to reason about raw numbers.

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Semantic layout values derived from the spacing scale.
// Use these for structural decisions — screen padding, card padding, component heights.
export const layout = {
  screenPaddingHorizontal: spacing[4], // 16
  screenPaddingVertical: spacing[6], // 24
  sectionGap: spacing[8], // 32
  cardPadding: spacing[4], // 16
  cardGap: spacing[3], // 12
  inputHeight: 52,
  buttonHeight: 52,
  tabBarHeight: 64,
  headerHeight: 56,
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 72,
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;
