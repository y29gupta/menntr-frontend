import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '@/app/lib/services/students.api';
import { useEffect, useState } from 'react';

export function useStudents(page: number, filters: Record<string, string>) {
    const [searchInput, setSearchInput] = useState('');



  return useQuery({
    queryKey: ['students', page, filters],
    queryFn: () => fetchStudents({ page, filters }),
    // keepPreviousData: true,
  });
}
