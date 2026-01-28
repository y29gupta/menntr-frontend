'use client';

import { Search, Filter, Download } from 'lucide-react';
import AssessmentInfoCard from '../AssessmentInfoCard';

type AssessmentMeta = {
  category?: string;
  type?: string;
  totalScore?: number;
  duration?: string;
  scoreBreakdown?: Record<string, { label: string; count: number }[]>;
};

type Props = {
  title: string;
  subtitle?: string;
  totalQuestions: number;
  assessmentMeta?: AssessmentMeta;
  search: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onSave?: () => void;
};

const QuestionsHeader = ({
  title,
  subtitle,
  totalQuestions,
  assessmentMeta,
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  onSave,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Title row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
            {title} ({totalQuestions})
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>}
        </div>

        {onSave && (
          <button
            onClick={onSave}
            className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
           px-6 py-2 text-sm font-medium !text-white"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Assessment info card */}
      {assessmentMeta && (
        <AssessmentInfoCard
          category={assessmentMeta.category}
          type={assessmentMeta.type}
          totalScore={assessmentMeta.totalScore}
          duration={assessmentMeta.duration}
          scoreBreakdown={assessmentMeta.scoreBreakdown}
        />
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Search */}
          <div className="relative w-full sm:max-w-[360px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              type="text"
              placeholder="Search for questions"
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-xs sm:text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter */}
          <button
            onClick={onToggleFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300
                       px-4 py-2 text-xs sm:text-sm hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Filter'}
          </button>

          {/* Export */}
          <button
            className="flex items-center justify-center rounded-lg border border-gray-300
                       px-3 py-2 hover:bg-gray-50"
            title="Export"
          >
            <Download className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsHeader;
