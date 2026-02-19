'use client';

import { useState } from 'react';
import { createEvaluationColumns } from '../../assessment/active/active.columns';
import EvaluationTable from '../../evaluation/EvaluationTable';
import { AssignmentRow } from '../assignment.types';

type Props = {
  data: AssignmentRow[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pendingFilters: Record<string, string>;
  setPendingFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ActiveAssignments({
  data,
  currentPage,
  pageCount,
  onPageChange,
  pendingFilters,
  setPendingFilters,
}: Props) {
  const [showColumnFilters] = useState(false);

  const columns = createEvaluationColumns({
    entityBasePath: '/admin/assignment',
    entityLabel: 'Assignment',
    mode: 'active',
    showAssignmentType: true, // ✅ From Figma
    showDueDate: true, // ✅ From Figma
  });

  return (
    <EvaluationTable<AssignmentRow>
      data={data}
      columns={columns}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      columnFilters={pendingFilters}
      onColumnFilterChange={(key: any, value: any) =>
        setPendingFilters((prev) => ({
          ...prev,
          [key]: value,
        }))
      }
      showColumnFilters={showColumnFilters}
    />
  );
}
