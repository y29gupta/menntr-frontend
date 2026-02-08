'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/app/components/table/DataTable';
import { CandidatePerformance, candidatePerformanceColumns } from './CandidatePerformance.columns';
import ViewReportModal from '../student-performance/ViewReportModal';
import StudentPerformanceModal from './StudentPerformanceModal';
import { fetchCandidates } from '../assessmentPerformance.api';
import {
  fetchStudentSummary,
  fetchStudentSections,
  fetchStudentIntegrity,
} from '../assessmentPerformance.api';

type Props = {
  assessmentId: string;
  search: string;
  showColumnFilters: boolean;
};

export default function CandidatePerformanceTable({
  assessmentId,
  search,
  showColumnFilters,
}: Props) {
  const [data, setData] = useState<CandidatePerformance[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loadingStudent, setLoadingStudent] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const mapStatus = (status: string): CandidatePerformance['status'] => {
    switch (status) {
      case 'not_started':
        return 'Not Started';
      case 'in_progress':
        return 'In Progress';
      case 'submitted':
        return 'Submitted';
      case 'evaluated':
        return 'Evaluated';
      default:
        return 'Not Started';
    }
  };

  useEffect(() => {
    fetchCandidates({
      assessmentId,
      page,
      limit: 10,
      search,
    }).then((res) => {
      console.log('CANDIDATES API RESPONSE', res.data);
      setData(
        res.data.data.map((x: any) => ({
          id: Number(x.studentId),
          attemptId: Number(x.attemptId),
          name: x.studentName,
          email: x.email,
          duration: `${x.durationMinutes} mins`,
          score: x.score,
          percentage: x.percentage,
          status: mapStatus(x.status),
          assessmentName: `Attempt ${res.data.attempt}`,
        }))
      );

      setPageCount(res.data.meta.pageCount);
    });
  }, [assessmentId, page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <>
      <DataTable
        data={data}
        columns={candidatePerformanceColumns((candidate) => {
          const index = data.findIndex((c) => c.id === candidate.id);
          setCurrentIndex(index);
        })}
        meta={{
          onRowClick: async (candidate) => {
            try {
              setLoadingStudent(true);

              const assessmentIdNum = Number(assessmentId);
              const studentId = candidate.id;
              const attemptId = candidate.attemptId;

              const [summaryRes, sectionsRes, integrityRes] = await Promise.all([
                fetchStudentSummary(assessmentIdNum, studentId, attemptId),
                fetchStudentSections(assessmentIdNum, studentId, attemptId),
                fetchStudentIntegrity(assessmentIdNum, studentId, attemptId),
              ]);

              setSelectedStudent({
                name: summaryRes.data.student.name,
                email: summaryRes.data.student.email,
                attemptLabel: `Attempt ${summaryRes.data.attempt.attemptNumber}`,
                summary: {
                  status: summaryRes.data.attempt.status,
                  startTime: summaryRes.data.attempt.startDateTime,
                  endTime: summaryRes.data.attempt.endDateTime,
                  duration: `${summaryRes.data.attempt.durationMinutes} mins`,
                  score: summaryRes.data.performance.score,
                  percentage: `${summaryRes.data.performance.percentage}%`,
                },
                sections: sectionsRes.data,
                integrity: integrityRes.data,
              });
              console.log('ROW CLICKED', candidate);
            } finally {
              setLoadingStudent(false);
            }
          },
        }}
        showColumnFilters={showColumnFilters}
        columnFilters={{}}
        onColumnFilterChange={() => {}}
        currentPage={page}
        pageCount={pageCount}
        onPreviousPage={() => setPage((p) => Math.max(1, p - 1))}
        onNextPage={() => setPage((p) => Math.min(pageCount, p + 1))}
        canPreviousPage={page > 1}
        canNextPage={page < pageCount}
      />

      <StudentPerformanceModal
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        data={selectedStudent}
      />

      <ViewReportModal
        open={currentIndex !== null}
        onClose={() => setCurrentIndex(null)}
        candidate={currentIndex !== null ? data[currentIndex] : null}
        onNext={() => setCurrentIndex((i) => (i !== null && i < data.length - 1 ? i + 1 : i))}
        onPrev={() => setCurrentIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
      />
    </>
  );
}
