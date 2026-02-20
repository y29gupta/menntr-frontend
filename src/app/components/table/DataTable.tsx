import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';
import DataTableSkeleton from './DatatableSkeleton';

export type DataTableMeta<TData extends RowData> = TableMeta<TData> & {
  setPage?: (page: number) => void;
  onRowClick?: (row: TData) => void;
  onDeleteClick?: (id: string) => void;
};

interface DataTableProps<T extends RowData> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  columnFilters: Record<string, string>;
  onColumnFilterChange: (key: string, value: string) => void;
  showColumnFilters: boolean;
  currentPage: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  meta?: DataTableMeta<T>;
}

function DataTable<T extends RowData>({
  columns,
  data,
  columnFilters = {},
  onColumnFilterChange,
  showColumnFilters,
  currentPage,
  pageCount,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  isLoading,
  canNextPage,
  meta,
}: DataTableProps<T>) {
  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} showFilters={showColumnFilters} />;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta,
  });

  return (
    <>
      <div className="w-full h-full overflow-auto scrollbar-thin">
        <table className="min-w-[900px] h-full w-full border border-gray-200 rounded-lg text-xs sm:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold !text-[#1A2C50] bg-gray-50"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}

            {showColumnFilters && (
              <tr className="sticky top-[48px] z-10 bg-gray-50">
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th key={header.id} className="px-2 py-2">
                    <input
                      className="w-full px-3 py-2 text-[11px] sm:text-xs rounded-md border border-gray-300 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none"
                      placeholder={String(header.column.columnDef.header)}
                      value={columnFilters[header.column.id] ?? ''}
                      onChange={(e) => onColumnFilterChange(header.column.id, e.target.value)}
                    />
                  </th>
                ))}
              </tr>
            )}
          </thead>

          {/* <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-[#0F172A]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody> */}

          <tbody>
            {table.getRowModel().rows.map((row) => {
              const onRowClick = table.options.meta?.onRowClick;
              const hasRowClick = typeof onRowClick === 'function';

              return (
                <tr
                  key={row.id}
                  onClick={hasRowClick ? () => onRowClick(row.original) : undefined}
                  title={hasRowClick ? 'Click to view performance' : undefined}
                  className={`border-b border-gray-200 last:border-none transition-colors duration-200
    ${hasRowClick ? 'cursor-pointer hover:bg-purple-50' : ''}
  `}
                  // className="border-b border-gray-200 last:border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 ">
                      {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                      {(() => {
                        const rendered = flexRender(cell.column.columnDef.cell, cell.getContext());

                        if (
                          typeof rendered === 'object' &&
                          rendered !== null &&
                          !Array.isArray(rendered) &&
                          !('$$typeof' in rendered)
                        ) {
                          return (rendered as any)?.name ?? '';
                        }

                        return rendered;
                      })()}
                    </td>
                  ))}
                </tr>
              );
            })}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-3 text-xs sm:text-[16px] select-none text-[#616570]">
        {/* First */}
        <button
          onClick={() => meta?.setPage?.(1)}
          disabled={!canPreviousPage}
          className="px-1 disabled:opacity-30"
        >
          «
        </button>

        {/* Prev */}
        <button
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
          className="px-1 disabled:opacity-30"
        >
          ‹
        </button>

        {/* Page numbers */}
        {Array.from({ length: pageCount }, (_, i) => i + 1)
          .filter((p) => {
            if (p === 1 || p === pageCount) return true;
            if (p >= currentPage - 2 && p <= currentPage + 2) return true;
            return false;
          })
          .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
            if (i > 0 && p !== arr[i - 1] + 1) {
              acc.push('ellipsis');
            }
            acc.push(p);
            return acc;
          }, [])
          .map((item, idx) =>
            item === 'ellipsis' ? (
              <span key={`e-${idx}`} className="px-1">
                …
              </span>
            ) : (
              <button
                key={item}
                onClick={() => meta?.setPage?.(item)}
                className={`w-7 h-7 flex items-center justify-center rounded-full
            ${
              item === currentPage
                ? 'bg-purple-100 text-[#7B3AEC] font-extrabold'
                : 'hover:text-purple-600'
            }`}
              >
                {item}
              </button>
            )
          )}

        {/* Next */}
        <button onClick={onNextPage} disabled={!canNextPage} className="px-1 disabled:opacity-30">
          ›
        </button>

        {/* Last */}
        <button
          onClick={() => meta?.setPage?.(pageCount)}
          disabled={!canNextPage}
          className="px-1 disabled:opacity-30 font-bold"
        >
          »
        </button>
      </div>
    </>
  );
}

export default DataTable;
