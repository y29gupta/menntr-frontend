// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { fetchStudents } from '@/app/lib/services/students.api';
// import { useEffect, useState } from 'react';

// export function useStudents(page: number, filters: Record<string, string>) {
//     const [searchInput, setSearchInput] = useState('');



//   return useQuery({
//     queryKey: ['students', page, filters],
//     queryFn: () => fetchStudents({ page, filters }),
//    placeholderData: keepPreviousData,

//     staleTime:0
//   });
// }

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { studentsApi } from '../lib/services/students.api';



export function useStudents(
  page: number,
  search: string,
  columnFilters: Record<string, string>
) {
  return useQuery({
    queryKey: ['students', page, search, columnFilters],
    queryFn: () =>
      studentsApi.getStudents({
        page,
        limit: 4,
        search,
        filters: columnFilters,
      }),
    placeholderData: keepPreviousData,
  });
}

