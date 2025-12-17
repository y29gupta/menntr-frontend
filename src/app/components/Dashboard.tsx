'use client';
import React from 'react';

import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
import { Button } from 'antd';
import { MetricCard } from '@/app/components/dashboard/MetricCard';
import { logout } from '@/app/lib/loginService';
import InstitutionsDashboard from '../(dashboard)/super-admin/InstitutionsDashboard';

const Dashboard = () => {
  const handlelogout = async () => {
    const res = await logout();
    if (res) alert('admin is logged out');
  };

  return (
    <main
      className="
        min-h-screen
        px-4 sm:px-6 lg:px-8 xl:px-10
        py-5
        flex flex-col gap-6
        text-[13px] sm:text-sm lg:text-base
        overflow-x-hidden
      "
    >
      {/* ================= Header (ALWAYS HORIZONTAL) ================= */}
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
          value="30"
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
          overflow-x-hidden
        "
      >
        <InstitutionsDashboard />
      </div>
    </main>
  );
};

export default Dashboard;
