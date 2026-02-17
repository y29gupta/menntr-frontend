'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import { MetricCard } from '@/app/components/dashboards/super-admin/MetricCard';
import { institutionColumns } from './institution.columns';
import DataTable from '../../table/DataTable';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';

import {
  fetchInstitutions,
  mapInstitutions,
  Institution,
  FilterParams,
} from '@/app/lib/institutions.api';
import TopProfileBar from '@/app/ui/TopProfileBar';

type Props = {
  onCreateInstitution: () => void;
  onEditInstitution: (row: any) => void;
};

const ITEMS_PER_PAGE = 5;
const DEBOUNCE_DELAY = 500;

type PaginationMeta = {
  currentPage?: number;
  page?: number;
  totalCount?: number;
  total?: number;
};

const Dashboard = ({ onCreateInstitution, onEditInstitution }: Props) => {
  /* -------------------- STATE -------------------- */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* -------------------- DEBOUNCE -------------------- */
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedColumnFilters(columnFilters);
      setPage(1);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [search, columnFilters]);

  /* -------------------- FILTERS (MEMOIZED) -------------------- */
  const filters: FilterParams = useMemo(
    () => ({
      page,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch || undefined,
      name: debouncedColumnFilters.name || undefined,
      code: debouncedColumnFilters.code || undefined,
      status: debouncedColumnFilters.status || undefined,
      contactEmail: debouncedColumnFilters.contact_email || undefined,
      planCode: debouncedColumnFilters.plan || undefined,
    }),
    [page, debouncedSearch, debouncedColumnFilters]
  );

  /* -------------------- INSTITUTIONS QUERY -------------------- */
  const {
    data = { data: [], meta: {} },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['institutions', filters],
    queryFn: () => fetchInstitutions(filters),
    placeholderData: keepPreviousData,
  });

  const institutions: Institution[] = useMemo(() => mapInstitutions(data.data ?? []), [data.data]);

  /* -------------------- PAGINATION NORMALIZATION -------------------- */
  const normalizedMeta = useMemo(() => {
    const rawMeta = (data.meta ?? {}) as PaginationMeta;

    const totalCount = rawMeta.totalCount ?? rawMeta.total ?? 0;
    const pageCount = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

    return {
      currentPage: rawMeta.currentPage ?? rawMeta.page ?? page,
      pageCount,
      totalCount,
    };
  }, [data.meta, page]);

  const canPreviousPage = normalizedMeta.currentPage > 1;
  const canNextPage = normalizedMeta.currentPage < normalizedMeta.pageCount;

  /* -------------------- STUDENT COUNT QUERY -------------------- */
  const { data: studentCountData, isLoading: isStudentCountLoading } = useQuery({
    queryKey: ['student-count'],
    queryFn: async () => {
      const res = await axios.get('api/users/student-count', {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  /* -------------------- HANDLERS -------------------- */
  const handleColumnFilterChange = (key: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreviousPage = () => {
    if (canPreviousPage) setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (canNextPage) setPage((p) => p + 1);
  };

  /* -------------------- UI -------------------- */
  return (
    <main className="h-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col gap-6 text-[13px] sm:text-sm lg:text-base overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none1">
      <TopProfileBar userRole="Super Admin Portal- System Admin" RoleIcon={<SuperAdminIcon />} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Institutions"
          value={String(normalizedMeta.totalCount)}
          bg="bg-[linear-gradient(106.82deg,#F2F7FF_3.46%,#D2E3FE_96.84%)]"
        />

        <MetricCard
          title="Active students"
          value={isStudentCountLoading ? '—' : String(studentCountData?.count ?? 0)}
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
          <h2 className="hidden sm:block font-semibold text-gray-800">All Institutions</h2>

          <button
            onClick={onCreateInstitution}
            className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm text-white! bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-3 sm:px-5 py-2.5 sm:py-1.5 rounded-full flex items-center justify-center gap-2 font-medium"
          >
            <span className="text-xl pb-0.5">+</span> Onboard Institution
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for Institution"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={() => setShowColumnFilters((p) => !p)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {showColumnFilters ? 'Hide Filters' : 'Filter'}
          </button>
        </div>

        {isError && <p className="text-red-500">Failed to load institutions</p>}
        <div className=" overflow-y-auto">
          <DataTable
            columns={institutionColumns(onEditInstitution)}
            data={institutions}
            isLoading={isLoading}
            columnFilters={columnFilters}
            onColumnFilterChange={handleColumnFilterChange}
            showColumnFilters={showColumnFilters}
            currentPage={normalizedMeta.currentPage}
            pageCount={normalizedMeta.pageCount}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            meta={{ setPage }}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
