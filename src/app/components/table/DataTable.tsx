import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<T extends RowData> {
  columns: ColumnDef<T, any>[];
  data: T[];
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  showColumnFilters: boolean;
}

function DataTable<T extends RowData>({
  columns,
  data,
  globalFilter,
  onGlobalFilterChange,
  showColumnFilters,
}: DataTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[900px] w-full border border-gray-200 rounded-lg text-xs sm:text-sm">
        {/* Header */}
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

          {/* Column filter row */}
          {showColumnFilters && (
            <tr
              className={`transition-all duration-500 ease-in-out
    ${showColumnFilters ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}
  `}
            >
              {table.getHeaderGroups()[0].headers.map((header) => {
                const column = header.column;
                const colName = String(header.column.columnDef.header);

                return (
                  <th key={header.id} className="px-2 py-2">
                    {column.getCanFilter() && (
                      <input
                        className="w-full px-3 py-2 text-[11px] sm:text-xs rounded-md border border-gray-300 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition-all duration-300 placeholder:text-gray-400 shadow-sm"
                        placeholder={colName}
                        value={(column.getFilterValue() as string) ?? ''}
                        onChange={(e) => column.setFilterValue(e.target.value)}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>

        {/* Body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 last:border-none">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
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
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-3 text-xs sm:text-sm">
        <button
          className="px-3 py-1 border rounded disabled:opacity-30"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-30"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
