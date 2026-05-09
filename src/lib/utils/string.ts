// String manipulation utilities.
// Pure functions — no side effects.

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function capitalizeFirst(text: string): string {
  if (text.length === 0) return text;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => capitalizeFirst(word.toLowerCase()))
    .join(' ');
}
