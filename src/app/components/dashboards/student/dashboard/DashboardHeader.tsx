'use client';

import Image from 'next/image';

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center gap-3">
        <Image src="/avatar.png" alt="avatar" width={40} height={40} className="rounded-full" />

        <div>
          <h2 className="text-lg font-semibold">Welcome back, Javed 👋</h2>

          <p className="text-sm text-gray-500">
            Here’s your academic and placement progress at a glance
          </p>

          <div className="text-xs text-gray-400 mt-1">B.Tech – Computer Science • 2022-2026</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="cursor-pointer">🔔</span>
        <Image src="/avatar.png" alt="profile" width={32} height={32} className="rounded-full" />
      </div>
    </div>
  );
}
