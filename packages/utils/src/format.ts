// packages/utils/src/format.ts

/**
 * Format a number as currency.
 * Usage: formatCurrency(50000, 'IQD') -> "IQD 50,000"
 */
export function formatCurrency(
  amount: number,
  currency: 'USD' | 'IQD' = 'USD',
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IQD' ? 0 : 2,
    maximumFractionDigits: currency === 'IQD' ? 0 : 2,
  }).format(amount);
}

/**
 * Format a date string to a readable standard.
 * Usage: formatDate('2026-01-15') -> "Jan 15, 2026"
 */
export function formatDate(date: string | Date): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format a number with compact notation.
 * Usage: formatCompactNumber(1500000) -> "1.5M"
 */
export function formatCompactNumber(number: number): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
}
