'use client';

import { Search, Filter } from 'lucide-react';
import DataTable from '@/app/components/table/DataTable';

import { assessmentPerformanceColumns } from './assessment.columns';
import { assessmentPerformanceMockData } from './assessment.mock';

type Props = {
  showUpload?: boolean;
};

export default function AssessmentPerformanceTable({ showUpload = false }: Props) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative w-[260px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search by assessment name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
          <Filter size={16} />
          Filter
        </button>

        {/* Upload icon intentionally optional */}
        {showUpload && null}
      </div>

      <DataTable
        columns={assessmentPerformanceColumns}
        data={assessmentPerformanceMockData}
        columnFilters={{}}
        onColumnFilterChange={() => {}}
        showColumnFilters
        currentPage={1}
        pageCount={1}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
        canPreviousPage={false}
        canNextPage={false}
      />
    </div>
  );
}
