export const iqdFormatter = new Intl.NumberFormat('en-IQ', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return iqdFormatter.format(amount);
}
