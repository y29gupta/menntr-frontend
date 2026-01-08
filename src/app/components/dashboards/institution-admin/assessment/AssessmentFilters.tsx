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
      {/* <div className="relative w-[260px]">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for assessments"
          className="
            w-full h-[40px]
            pl-9 pr-3
            text-sm
            bg-white
            border border-gray-200
            rounded-lg
            focus:outline-none
            focus:ring-2 focus:ring-purple-300
          "
        />
      </div> */}

      {/* Filter button */}
      {/* <button
        type="button"
        className="
          h-[40px]
          px-4
          flex items-center gap-2
          bg-white
          border border-gray-200
          rounded-lg
          text-sm text-gray-600
          hover:bg-gray-50
        "
      >
        <FilterOutlined />
        Filter
      </button> */}
      <div className="flex flex-1 sm:flex-row gap-3 mb-4">
        <div className="relative max-w-[400px] w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for departments"
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
