'use client';

import { useState } from 'react';
import DataTable from '@/app/components/table/DataTable';
import { CandidatePerformance, candidatePerformanceColumns } from './CandidatePerformance.columns';
import ViewReportModal from '../student-performance/ViewReportModal';
import StudentPerformanceModal from './StudentPerformanceModal';

/* ================= DATA ================= */

const dummyData: CandidatePerformance[] = [
  {
    id: 1,
    name: 'Arun Kumar',
    email: 'arun.kumar@college.edu',
    duration: '25 mins',
    score: '23 / 25',
    percentage: 92,
    status: 'Completed',
    assessmentName: 'Attempt 1',
  },
  {
    id: 2,
    name: 'Emma',
    email: 'emma@college.edu',
    duration: '28 mins',
    score: '21 / 25',
    percentage: 84,
    status: 'Completed',
    assessmentName: 'Attempt 2',
  },
];

/* ================= STUDENT-WISE MAP ================= */

type StudentWiseMap = Record<
  number,
  {
    sections: {
      section: string;
      score: string;
      accuracy: string;
    }[];
  }
>;

const STUDENT_WISE_DATA: StudentWiseMap = {
  1: {
    sections: [
      { section: 'Quantitative Aptitude', score: '6 / 6', accuracy: '100%' },
      { section: 'Logical Reasoning', score: '8 / 10', accuracy: '80%' },
      { section: 'Verbal Ability', score: '9 / 9', accuracy: '100%' },
      { section: 'Domain', score: '0 / 0', accuracy: '-' },
    ],
  },
  2: {
    sections: [
      { section: 'Quantitative Aptitude', score: '5 / 6', accuracy: '83%' },
      { section: 'Logical Reasoning', score: '7 / 10', accuracy: '70%' },
      { section: 'Verbal Ability', score: '9 / 9', accuracy: '100%' },
      { section: 'Domain', score: '0 / 0', accuracy: '-' },
    ],
  },
};

/* ================= MAPPER ================= */

const buildStudentPerformance = (row: CandidatePerformance) => ({
  name: row.name,
  email: row.email,
  attemptLabel: row.assessmentName,
  summary: {
    status: row.status,
    startTime: '27 Jan 2025, 10:00 AM',
    endTime: '27 Jan 2025, 10:25 AM',
    duration: row.duration,
    score: row.score,
    percentage: `${row.percentage}%`,
  },
  sections: STUDENT_WISE_DATA[row.id]?.sections ?? [],
  integrity: {
    violations: 0,
    interruptions: 0,
  },
});

/* ================= COMPONENT ================= */

export default function CandidatePerformanceTable({
  showColumnFilters,
}: {
  showColumnFilters: boolean;
}) {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <>
      <DataTable
        data={dummyData}
        columns={candidatePerformanceColumns(
          // ❌ DO NOT handle row click here
          // Row click is handled by DataTable's onRowClick
          () => {},

          (candidate) => {
            const index = dummyData.findIndex((c) => c.id === candidate.id);
            setCurrentIndex(index);
          }
        )}
        meta={{
          onRowClick: (candidate) => {
            setSelectedStudent(buildStudentPerformance(candidate));
          },
        }}
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

      <StudentPerformanceModal
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        data={selectedStudent}
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
