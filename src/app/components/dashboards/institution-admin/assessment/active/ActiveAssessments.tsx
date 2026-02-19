'use client';

import { useState } from 'react';
import ActiveAssessmentsTable from './ActiveAssessmentsTable';
import { AssessmentRow } from '../assessment.types';
import { createEvaluationColumns } from './active.columns';
// import { createEvaluationColumns } from '../../evaluation/createEvaluationColumns';

type Props = {
  data: AssessmentRow[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pendingFilters: Record<string, string>;
  setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ActiveAssessments({
  data,
  currentPage,
  pageCount,
  onPageChange,
  pendingFilters,
  setPendingFilters,
}: Props) {
  const [showColumnFilters, setShowColumnFilters] = useState(true);

  const columns = createEvaluationColumns({
    entityBasePath: '/admin/assessment',
    entityLabel: 'Assessment',
    mode: 'active',
    showExpiryOn: true,
  });

  return (
    <ActiveAssessmentsTable<AssessmentRow>
      data={data}
      columns={columns}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      columnFilters={pendingFilters}
      onColumnFilterChange={(key, value) =>
        setPendingFilters((prev) => ({
          ...prev,
          [key]: value,
        }))
      }
      showColumnFilters={showColumnFilters}
    />
  );
}
