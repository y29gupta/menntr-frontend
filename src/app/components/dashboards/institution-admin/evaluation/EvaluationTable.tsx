import DataTable from '@/app/components/table/DataTable';

export default function EvaluationTable<T>({
  data,
  columns,
  columnFilters,
  onColumnFilterChange,
  showColumnFilters,
  currentPage,
  pageCount,
  onPageChange,
}: {
  data: T[];
  columns: any;
  columnFilters: Record<string, any>;
  onColumnFilterChange: (key: string, value: any) => void;
  showColumnFilters: boolean;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <DataTable<T>
      columns={columns}
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
