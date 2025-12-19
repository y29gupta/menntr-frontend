'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import { Button } from 'antd';
import { MetricCard } from '@/app/components/dashboards/super-admin/MetricCard';
import { logout } from '@/app/lib/loginService';
import { institutionColumns } from './institution.columns';
import DataTable from '../../table/DataTable';
import { Search, Filter } from 'lucide-react';

import { fetchInstitutions, mapInstitutions, Institution } from '@/app/lib/institutions.api';

type Props = {
  onCreateInstitution: () => void;
  onEditInstitution: (row: any) => void;
};

const Dashboard = ({ onCreateInstitution, onEditInstitution }: Props) => {
  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
  });

  const institutions: Institution[] = data ? mapInstitutions(data.data) : [];

  const handlelogout = async () => {
    const res = await logout();
    if (res) alert('admin is logged out');
  };

  return (
    <main
      className="
        h-screen
        px-4 sm:px-6 lg:px-8 xl:px-10
        py-5
        flex flex-col gap-6
        text-[13px] sm:text-sm lg:text-base
        overflow-hidden
      "
    >
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between gap-4">
        <h1
          className="
            flex items-center gap-2
            font-semibold text-gray-800
            text-sm sm:text-base lg:text-lg
            whitespace-nowrap
          "
        >
          <SuperAdminIcon />
          <span>
            Super Admin Portal –<span className="text-gray-500 ml-1">System admin</span>
          </span>
        </h1>

        <Button danger type="default" onClick={handlelogout} className="text-xs sm:text-sm">
          Log out
        </Button>
      </div>

      {/* ================= Metrics ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Institutions"
          value={isLoading ? '—' : String(data?.count ?? 0)}
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

      {/* ================= Institutions Section ================= */}
      <div
        className="
          w-full
          rounded-3xl
          border border-[#DBDFE7]
          bg-white
          p-4 sm:p-6 lg:p-8
          overflow-y-auto
        "
      >
        {/* Heading + Create Button */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
            All Institutions
          </h2>

          <button
            onClick={onCreateInstitution}
            className=" cursor-pointer whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 font-medium"
          >
            <span className="text-lg">+</span> Onboard Institution
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* TanStack Table */}
        {isLoading && <p>Loading institutions...</p>}
        {isError && <p className="text-red-500">Failed to load institutions</p>}

        {!isLoading && !isError && (
          <DataTable
            columns={institutionColumns(onEditInstitution)}
            data={institutions}
            globalFilter={search}
            onGlobalFilterChange={setSearch}
            showColumnFilters={showColumnFilters}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
