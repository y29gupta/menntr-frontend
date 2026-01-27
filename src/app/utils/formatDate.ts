// utils/formatDate.ts
export function formatDate(date?: string | null): string {
  if (!date) return '-';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
