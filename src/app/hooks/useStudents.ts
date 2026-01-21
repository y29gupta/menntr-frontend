import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '@/app/lib/services/students.api';

export function useStudents(page: number, limit: number, filters: Record<string, string>) {
  return useQuery({
    queryKey: ['students', page, limit, filters],
    queryFn: () => fetchStudents({ page, limit, filters }),
    // keepPreviousData: true,
  });
}
