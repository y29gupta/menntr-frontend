import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';

export type DataTableMeta<TData extends RowData> = TableMeta<TData> & {
  onRowClick?: (row: TData) => void;
};

interface DataTableProps<T extends RowData> {
  columns: ColumnDef<T, any>[];
  data: T[];
  // isLoading: boolean;
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
  canNextPage,
  meta,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta,
  });

  return (
    <div className="w-full  overflow-x-auto">
      <table className="min-w-[900px] w-full border border-gray-200 rounded-lg text-xs sm:text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-semibold text-gray-900">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}

          {showColumnFilters && typeof onColumnFilterChange === 'function' && (
            <tr
              className={`transition-all duration-500 ease-in-out ${
                showColumnFilters ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {table.getHeaderGroups()[0].headers.map((header) => {
                const columnId = header.column.id;
                const colName = String(header.column.columnDef.header);

                return (
                  <th key={header.id} className="px-2 py-2">
                    <input
                      className="w-full px-3 py-2 text-[11px] sm:text-xs rounded-md border border-gray-300 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition-all duration-300 placeholder:text-gray-400 shadow-sm"
                      placeholder={colName}
                      value={columnFilters[columnId] ?? ''}
                      onChange={(e) => onColumnFilterChange(columnId, e.target.value)}
                      // onChange={(e) => {
                      //   if (typeof onColumnFilterChange === 'function') {
                      //     onColumnFilterChange(e.target.value);
                      //   }
                      // }}
                    />
                  </th>
                );
              })}
            </tr>
          )}
        </thead>

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
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
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

      <div className="flex justify-end items-center gap-3 mt-3 text-xs sm:text-sm">
        <button
          className="px-3 py-1 border rounded disabled:opacity-30"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {pageCount}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-30"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
