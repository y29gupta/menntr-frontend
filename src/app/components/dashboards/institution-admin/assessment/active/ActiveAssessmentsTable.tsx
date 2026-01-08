'use client';

import DataTable from '@/app/components/table/DataTable';
import { assessmentColumns } from './active.columns';

export default function ActiveAssessmentsTable({
  data,
  isLoading,
  globalFilter,
  onGlobalFilterChange,
}: {
  data: any[];
  isLoading: boolean;
  globalFilter: string;
  onGlobalFilterChange: (val: string) => void;
}) {
  return (
    <DataTable
      columns={assessmentColumns}
      data={data}
      isLoading={isLoading}
      globalFilter={globalFilter}
      onGlobalFilterChange={onGlobalFilterChange}
      showColumnFilters={true}
    />
  );
}
