'use client';

import DataTable from '@/app/components/table/DataTable';
import { CandidatePerformance, candidatePerformanceColumns } from './CandidatePerformance.columns';

const dummyData: CandidatePerformance[] = [
  {
    id: 1,
    name: 'Arun Kumar',
    email: 'arun.kumar@college.edu',
    duration: '23 mins',
    score: '22/25',
    percentage: 85,
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Paul',
    email: 'paul@college.edu',
    duration: '34 mins',
    score: '24/25',
    percentage: 95,
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Emma',
    email: 'emma@college.edu',
    duration: '25 mins',
    score: '15/25',
    percentage: 65,
    status: 'Not Started',
  },
];

export default function CandidatePerformanceTable({
  showColumnFilters,
}: {
  showColumnFilters: boolean;
}) {
  return (
    <DataTable<CandidatePerformance>
      data={dummyData}
      columns={candidatePerformanceColumns()}
      columnFilters={{}}
      onColumnFilterChange={() => {}}
      showColumnFilters={showColumnFilters}
      currentPage={1}
      pageCount={1}
      onPreviousPage={() => {}}
      onNextPage={() => {}}
      canPreviousPage={false}
      canNextPage={false}
    />
  );
}
