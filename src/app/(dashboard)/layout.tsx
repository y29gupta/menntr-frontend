'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Topbar';
import { Role } from '../lib/roles';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // role from URL → /dashboard/super-admin/...
  const role = pathname.split('/')[2] as Role;

  const [collapsed, setCollapsed] = useState(false);

  // ✅ AUTO COLLAPSE ON SMALL SCREENS
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // mobile → collapsed
      } else {
        setCollapsed(false); // desktop → expanded
      }
    };

    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#F7F9FC] overflow-hidden">
      {/* Sidebar */}
      <Sidebar role={role} collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Optional Topbar */}
        {/* <Navbar /> */}

        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
