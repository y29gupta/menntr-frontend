'use client';

import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Filter, Search } from 'lucide-react';

export default function AssessmentFilters({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex  items-center gap-3 mt-4 mb-4">
      {/* Search */}

      {/* Filter button */}

      <div className="flex flex-1 sm:flex-row gap-3 mb-4">
        <div className="relative max-w-[400px] w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder="Search for assessments"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          // onClick={() => setShowColumnFilters((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          {/* {showColumnFilters ? 'Hide Filters' : 'Filter'} */}Filter
        </button>
      </div>
    </div>
  );
}
