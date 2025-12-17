'use client';

import Sidebar from '@/app/components/layout/Sidebar';
import { studentMenu } from '@/app/constants/studentMenu';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar data={studentMenu} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
