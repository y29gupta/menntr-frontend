export async function fetchDashboardData<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    credentials: 'include',
    cache: 'no-store',
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}
