import { Table } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

export function ColumnFiltersRow<T>({ table }: Props<T>) {
  return (
    <tr>
      {table.getLeafHeaders().map((header) => (
        <th key={header.id}>
          {header.column.getCanFilter() && (
            <input
              className="w-full rounded border-2 shadow-white border-black   px-2 py-1 text-sm"
              value={(header.column.getFilterValue() ?? '') as string}
              onChange={(e) => header.column.setFilterValue(e.target.value)}
              placeholder="filter"
            />
          )}
        </th>
      ))}
    </tr>
  );
}
