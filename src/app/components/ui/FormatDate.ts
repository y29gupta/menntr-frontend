export function formatStartTime(dateString: string) {
  const date = new Date(dateString);

  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  const time = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isTomorrow) {
    return `Tomorrow • ${time}`;
  }

  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
  }) + ` • ${time}`;
}
