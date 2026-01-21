'use client';

import { useState } from 'react';
import DataTable from '@/app/components/table/DataTable';
import { CandidatePerformance, candidatePerformanceColumns } from './CandidatePerformance.columns';
import ViewReportModal from '../student-performance/ViewReportModal';

const dummyData: CandidatePerformance[] = [
  {
    id: 1,
    name: 'Arun Kumar',
    email: 'arun.kumar@college.edu',
    duration: '23 mins',
    score: '22/25',
    percentage: 85,
    status: 'Completed',
    assessmentName: 'attempt 2',
  },
  {
    id: 2,
    name: 'Paul',
    email: 'paul@college.edu',
    duration: '34 mins',
    score: '24/25',
    percentage: 95,
    status: 'In Progress',
    assessmentName: 'attempt 2',
  },
  {
    id: 3,
    name: 'Emma',
    email: 'emma@college.edu',
    duration: '25 mins',
    score: '15/25',
    percentage: 65,
    status: 'Not Started',
    assessmentName: 'attempt 2',
  },
];

export default function CandidatePerformanceTable({
  showColumnFilters,
}: {
  showColumnFilters: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <>
      <DataTable
        data={dummyData}
        columns={candidatePerformanceColumns((candidate) => {
          const index = dummyData.findIndex((c) => c.id === candidate.id);
          setCurrentIndex(index);
        })}
        showColumnFilters={showColumnFilters}
        columnFilters={{}}
        onColumnFilterChange={() => {}}
        currentPage={1}
        pageCount={1}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
        canPreviousPage={false}
        canNextPage={false}
      />

      <ViewReportModal
        open={currentIndex !== null}
        onClose={() => setCurrentIndex(null)}
        candidate={currentIndex !== null ? dummyData[currentIndex] : null}
        onNext={() => setCurrentIndex((i) => (i !== null && i < dummyData.length - 1 ? i + 1 : i))}
        onPrev={() => setCurrentIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
      />
    </>
  );
}
