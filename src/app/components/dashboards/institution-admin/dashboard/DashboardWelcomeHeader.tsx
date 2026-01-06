'use client';

import { AlertTriangle } from 'lucide-react';

type DashboardWelcomeHeaderProps = {
  userName: string;
  subtitle?: string;
  showAlert?: boolean;
  alertText?: string;
};

const DashboardWelcomeHeader = ({
  userName,
  subtitle = 'Here’s your institution performance summary',
  showAlert = false,
  alertText = 'Your plan is going to expire',
}: DashboardWelcomeHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between rounded-2xl px-2 py-2">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <img src="/welcome.svg" alt="Welcome" className="w-12 h-12" />

        <div className="flex flex-col">
          <span className="text-[20px] font-semibold text-gray-900 leading-tight">
            Welcome back, {userName} <span className="ml-1">👋</span>
          </span>
          <span className="text-sm text-gray-500 leading-tight">{subtitle}</span>
        </div>
      </div>

      {/* RIGHT */}
      {showAlert && (
        <div className="flex items-center gap-2 text-sm text-[#C46800] font-medium">
          <AlertTriangle className="w-4 h-4" />
          {alertText}
        </div>
      )}
    </div>
  );
};

export default DashboardWelcomeHeader;
