'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Role } from '@/app/lib/roles';
// import { Role } from '@/lib/roles';

type Props = {
  role: Role | null;
  children: React.ReactNode;
};

export default function DashboardShell({ role, children }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const resize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  console.log(role, 'role is ');

  return (
    <div className="flex w-full min-h-screen bg-white">
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <Sidebar role={role} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto scrollbar-hide p-6">{children}</main>
    </div>
  );
}
