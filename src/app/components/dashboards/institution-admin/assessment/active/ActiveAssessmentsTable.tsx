'use client';

import DataTable from '@/app/components/table/DataTable';
import { assessmentColumns } from './active.columns';
import { AssessmentRow } from '../assessment.types';

export default function ActiveAssessmentsTable({
  data,
  isLoading,
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
}: {
  data: AssessmentRow[];
  isLoading: boolean;
  globalFilter: string;
  onGlobalFilterChange: (val: string) => void;
  showColumnFilters: boolean;
}) {
  return (
    <DataTable<AssessmentRow>
      columns={assessmentColumns}
      data={data}
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
