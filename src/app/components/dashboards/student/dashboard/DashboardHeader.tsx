'use client';

import Profile from '@/app/ui/Profile';
import { Radio } from 'lucide-react';
import Image from 'next/image';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start bg-white rounded-xl pt-4 pr-2 gap-4">
      {/* RIGHT SECTION (Icons) */}
      <div className="flex items-center gap-4 justify-end order-1 md:order-2">
        <Radio size={22} className="text-gray-600" />
        <Image src="/assets/notification.svg" alt="notification" width={22} height={22} />
        <Profile />
      </div>

      {/* LEFT SECTION (Welcome) */}
      <div className="flex items-start gap-3 order-2 md:order-1">
        <Image
          src="/welcome.svg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full shrink-0"
        />

        <div>
          <h3 className="text-lg sm:text-xl font-semibold">Welcome back, Javed 👋</h3>

          <p className="text-sm text-gray-500 mt-1">
            Here’s your academic and placement progress at a glance
          </p>

          <p className="mt-3 inline-block text-xs text-gray-400 rounded-2xl border border-[#DBE3E9] py-2 px-4">
            B.Tech – Computer Science • 2022-2026
          </p>
        </div>
      </div>
    </div>
  );
}
