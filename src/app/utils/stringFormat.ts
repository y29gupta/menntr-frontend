// export function toTitleCase(value: string | undefined): string | undefined {
//   if (!value) return value;

//   return value
//     .toLowerCase()
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }

// export function normalizeToMetaValue(
//   metaValues: string[] | undefined,
//   backendValue?: string | null
// ): string {
//   if (!backendValue || !metaValues?.length) return '';

//   const normalizedBackend = backendValue.trim().toLowerCase();

//   const match = metaValues.find(
//     (meta) => meta.trim().toLowerCase() === normalizedBackend
//   );

//   return match ?? '';
// }

export function toTitleCase(value?: string) {
  if (!value) return '';

  const lower = value.toLowerCase();

  if (lower === 'mcq') return 'MCQ';

  // default title case
  return lower
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
