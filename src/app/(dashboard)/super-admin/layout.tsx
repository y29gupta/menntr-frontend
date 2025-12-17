'use client';

import Sidebar from '@/app/components/layout/Sidebar';
import { superAdminMenu } from '@/app/constants/superAdminMenu';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar data={superAdminMenu} />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
