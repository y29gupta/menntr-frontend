'use client';

import DataTable from '@/app/components/table/DataTable';
import { assessmentColumns, AssessmentRow } from './active.columns';

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
