'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import { MetricCard } from '@/app/components/dashboards/super-admin/MetricCard';
import { institutionColumns } from './institution.columns';
import DataTable from '../../table/DataTable';
import { Search, Filter } from 'lucide-react';
import Profile from '@/app/ui/Profile';
import { Spin } from 'antd';

import {
  fetchInstitutions,
  mapInstitutions,
  Institution,
  FilterParams,
} from '@/app/lib/institutions.api';

type Props = {
  onCreateInstitution: () => void;
  onEditInstitution: (row: any) => void;
};

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

const Dashboard = ({ onCreateInstitution, onEditInstitution }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedColumnFilters(columnFilters);
      setPage(1);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search, columnFilters]);

  const filters: FilterParams = {
    page,
    limit,
    search: debouncedSearch || undefined,
    name: debouncedColumnFilters.name || undefined,
    code: debouncedColumnFilters.code || undefined,
    status: debouncedColumnFilters.status || undefined,
    contactEmail: debouncedColumnFilters.contactEmail || undefined,
    planCode: debouncedColumnFilters.plan || undefined,
  };

  const {
    data = {
      data: [],
      meta: {
        isFirstPage: true,
        isLastPage: false,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
        pageCount: 0,
        totalCount: 0,
        currentPageCount: 0,
      },
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['institutions', filters],
    queryFn: () => fetchInstitutions(filters),
    placeholderData: (previousData) => previousData,
  });

  const institutions: Institution[] = data ? mapInstitutions(data.data) : [];
  const totalCount = data?.meta?.totalCount ?? 0;

  const handleColumnFilterChange = (columnName: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnName]: value,
    }));
  };

  const handleGlobalSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePreviousPage = () => {
    if (data?.meta?.previousPage) {
      setPage(data.meta.previousPage);
    }
  };

  const handleNextPage = () => {
    if (data?.meta?.nextPage) {
      setPage(data.meta.nextPage);
    }
  };

  return (
    <main className="h-screen px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col gap-6 text-[13px] sm:text-sm lg:text-base overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none1">
      <div className="flex items-center justify-between gap-4 min-w-0">
        <h1 className="flex items-center gap-2 font-semibold text-gray-800 text-base whitespace-nowrap overflow-hidden text-ellipsis">
          <SuperAdminIcon />
          <span className="truncate">
            Super Admin Portal –
            <span className="text-gray-500 ml-1 hidden sm:inline">System admin</span>
          </span>
        </h1>

        <div className="shrink-0">
          <Profile />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Institutions"
          value={isLoading ? '—' : String(totalCount ?? 0)}
          bg="bg-[linear-gradient(106.82deg,#F2F7FF_3.46%,#D2E3FE_96.84%)]"
        />
        <MetricCard
          title="Active students"
          value="15,000"
          bg="bg-[linear-gradient(106.63deg,#FAFFF2_3.48%,#FFFAD0_96.61%)]"
        />
        <MetricCard
          title="Revenue (MRR)"
          value="₹ 4.5L"
          bg="bg-[linear-gradient(106.5deg,#F8F2FF_2.99%,#E2C9FF_96.75%)]"
        />
        <MetricCard
          title="System Health"
          value="99.8%"
          bg="bg-[linear-gradient(106.13deg,#F2FFFC_3.08%,#C2FFF1_96.76%)]"
        />
      </div>

      <div className="w-full rounded-3xl border border-[#DBDFE7] bg-white p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
            All Institutions
          </h2>

          <button
            onClick={onCreateInstitution}
            className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-4 sm:px-6 !py-2.5 sm:py-1 rounded-full flex items-center justify-center gap-2 font-medium"
          >
            <span>+</span> Onboard Institution
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => handleGlobalSearchChange(e.target.value)}
              type="text"
              placeholder="Search for Institution"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={() => setShowColumnFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {showColumnFilters ? 'Hide Filters' : 'Filter'}
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spin size="large" />
          </div>
        )}
        {isError && <p className="text-red-500">Failed to load institutions</p>}

        {!isLoading && !isError && (
          <DataTable
            columns={institutionColumns(onEditInstitution)}
            data={institutions}
            columnFilters={columnFilters}
            onColumnFilterChange={handleColumnFilterChange}
            showColumnFilters={showColumnFilters}
            currentPage={data?.meta?.currentPage ?? 1}
            pageCount={data?.meta?.pageCount ?? 1}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            canPreviousPage={!!data?.meta?.previousPage}
            canNextPage={!!data?.meta?.nextPage}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
