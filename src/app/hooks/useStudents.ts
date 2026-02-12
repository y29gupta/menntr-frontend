import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { studentsApi } from '../lib/services/students.api';

export function useStudents(page: number, search: string, columnFilters: Record<string, string>) {
  return useQuery({
    queryKey: ['students', page, search, columnFilters],
    queryFn: () =>
      studentsApi.getStudents({
        page,
        limit: 1,
        search,
        filters: columnFilters,
      }),
    placeholderData: keepPreviousData,
  });
}
