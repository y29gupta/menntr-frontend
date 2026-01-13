'use client';

import DataTable from '@/app/components/table/DataTable';
import { assessmentColumns, AssessmentRow } from '../active/active.columns';
import { DraftColumns } from './draft.columns';

export default function DraftAssessmentsTable({
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
      columns={DraftColumns}
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
