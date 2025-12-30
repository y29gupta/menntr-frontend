'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/layout/Sidebar';
import { Role } from '../lib/roles';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = pathname.split('/')[1] as Role;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const resize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="flex  w-full h-full bg-[#F7F9FC] ">
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <Sidebar role={role} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <main className="flex-1 min-w-0 overflow-y-scroll p-6">{children}</main>
    </div>
  );
}
