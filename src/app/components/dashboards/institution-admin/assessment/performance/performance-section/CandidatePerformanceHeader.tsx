'use client';

import { Search, Filter, Download } from 'lucide-react';
import { Controller, Control } from 'react-hook-form';
import FormDropdown from '@/app/ui/FormDropdown';

type AttemptOption = {
  label: string;
  value: string;
};

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  control: Control<{ attemptId: string }>;
  attemptOptions: AttemptOption[];
};

const CandidatePerformanceHeader = ({
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  control,
  attemptOptions,
}: Props) => {
  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
          Candidate performance
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          View student-wise performance for the selected attempt.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT: Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Search */}
          <div className="relative max-w-[360px] w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              type="text"
              placeholder="Search by student name or email"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter */}
          <button
            onClick={onToggleFilters}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg
                       text-xs sm:text-sm hover:bg-gray-50 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Filter'}
          </button>

          {/* Export (icon only like screenshot) */}
          <button
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg
                       hover:bg-gray-50"
            title="Export"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* RIGHT: Attempt dropdown */}
        <div className="w-full sm:w-[200px]">
          <Controller
            name="attemptId"
            control={control}
            render={({ field }) => (
              <FormDropdown
                placeholder="Attempt"
                value={field.value}
                onChange={field.onChange}
                options={attemptOptions}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidatePerformanceHeader;
