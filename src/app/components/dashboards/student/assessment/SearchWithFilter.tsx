'use client';

import { Search, Filter } from 'lucide-react';

type SearchWithFilterProps = {
  value: string;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  placeholder?: string;
};

export default function SearchWithFilter({
  value,
  onSearchChange,
  onToggleFilters,
  placeholder = 'Search for assessments',
}: SearchWithFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onToggleFilters}
        className="flex items-center gap-2 px-4 py-2 border border-purple-500 text-purple-600 rounded-lg text-sm hover:bg-purple-50"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>
    </div>
  );
}
