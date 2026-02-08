// 'use client';

import { assessmentColumns } from './active.columns';

// import DataTable from '@/app/components/table/DataTable';
// import { assessmentColumns } from './active.columns';
import { AssessmentRow } from '../assessment.types';
import DataTable from '@/app/components/table/DataTable';

// export default function ActiveAssessmentsTable({
//   data,
//   isLoading,
//   globalFilter,
//   onGlobalFilterChange,
//   showColumnFilters,
// }: {
//   data: AssessmentRow[];
//   isLoading: boolean;
//   globalFilter: string;
//   onGlobalFilterChange: (val: string) => void;
//   showColumnFilters: boolean;
// }) {
//   return (
//     <DataTable<AssessmentRow>
//       columns={assessmentColumns}
//       data={data}
//       columnFilters={{}}
//       onColumnFilterChange={() => {}}
//       showColumnFilters={showColumnFilters}
//       currentPage={1}
//       pageCount={1}
//       onPreviousPage={() => {}}
//       onNextPage={() => {}}
//       canPreviousPage={false}
//       canNextPage={false}
//     />
//   );
// }

export default function ActiveAssessmentsTable({
  data,
  isLoading,
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
  columnFilters,
  onColumnFilterChange,
  currentPage,
  pageCount,
  onPageChange,
}: any) {
  return (
    // <DataTable<AssessmentRow>
    //   columns={assessmentColumns}
    //   data={data}
    //   columnFilters={{}}
    //   onColumnFilterChange={() => {}}
    //   showColumnFilters={showColumnFilters}
    //   currentPage={currentPage}
    //   pageCount={pageCount}
    //   onPreviousPage={() => onPageChange(currentPage - 1)}
    //   onNextPage={() => onPageChange(currentPage + 1)}
    //   canPreviousPage={currentPage > 1}
    //   canNextPage={currentPage < pageCount}
    // />
    <DataTable<AssessmentRow>
      columns={assessmentColumns}
      data={data}
      columnFilters={columnFilters}
      onColumnFilterChange={onColumnFilterChange}
      showColumnFilters={showColumnFilters}
      currentPage={currentPage}
      pageCount={pageCount}
      onPreviousPage={() => onPageChange(currentPage - 1)}
      onNextPage={() => onPageChange(currentPage + 1)}
      canPreviousPage={currentPage > 1}
      canNextPage={currentPage < pageCount}
    />
  );
}
