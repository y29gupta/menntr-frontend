'use client';

import { LucideIcon } from 'lucide-react';
import { DashboardCardUI } from '../../dashboards/institution-admin/dashboard/dashboardCard.types';
import AreaSparkline from '../../graphs/AreaSparkline';
const DashboardCard = ({
  title,
  total,
  percentage,
  trend,
  subText,
  icon: Icon,
  showComparisonText = true,
  className = '',
  graphClassName = '',
}: DashboardCardUI) => {
  const isDown = trend.length >= 2 ? trend[trend.length - 1] < trend[trend.length - 2] : false;

  return (
    <div
      className={`flex items-center bg-white rounded-2xl  border-gray-100
                  p-4 sm:p-5 gap-3 h-full ${className}`}
      style={{ boxShadow: '0px 0px 8px 0px #0F172A1F' }}
    >
      {/* LEFT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="text-gray-500 shrink-0" />
          <span className="text-gray-700 text-base font-medium truncate">{title}</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <div className="text-[28px] font-semibold text-gray-900">{total}</div>

          <span className={`font-semibold text-sm ${isDown ? 'text-[#C46800]' : 'text-green-600'}`}>
            {isDown ? '↓' : '↑'} {Math.abs(percentage)}%
          </span>
        </div>

        {showComparisonText && <div className="text-sm text-gray-500">Compared to last month</div>}

        {subText && <div className="text-sm font-medium text-[#8E3900] mt-1">{subText}</div>}
      </div>

      {/* RIGHT GRAPH */}
      <div className="flex items-center justify-end shrink-0">
        <div className={`w-[120px] h-[90px] max-w-full ${graphClassName}`}>
          <AreaSparkline data={trend} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
