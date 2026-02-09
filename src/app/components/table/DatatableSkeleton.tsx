interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
  showFilters?: boolean;
}

function DataTableSkeleton({
  columnCount,
  rowCount = 8,
  showFilters = false,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full h-full overflow-auto scrollbar-thin">
      <table className="min-w-[900px] w-full border border-gray-200 rounded-lg text-xs sm:text-sm animate-pulse">
        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
          <tr>
            {Array.from({ length: columnCount }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </th>
            ))}
          </tr>

          {showFilters && (
            <tr className="sticky top-[48px] bg-gray-50">
              {Array.from({ length: columnCount }).map((_, i) => (
                <th key={i} className="px-2 py-2">
                  <div className="h-8 w-full bg-gray-200 rounded-md" />
                </th>
              ))}
            </tr>
          )}
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableSkeleton;
