'use client';
import AreaSparkline from '../components/graphs/AreaSparkline';

type Props = {
  title: string;
  total: number;
  percentage: number;
  trend: number[];
  subText?: string;
};

const DashboardCard = ({ title, total, percentage, trend, subText }: Props) => {
  const isDown = trend[trend.length - 1] < trend[trend.length - 2];

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex md:flex-col lg:flex-row gap-4 lg:gap-10 h-full"
      style={{ boxShadow: '0px 0px 8px 0px #0F172A1F' }}
    >
      {/* LEFT CONTENT */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-700 text-sm sm:text-base font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{total}</div>

          <span
            className={`font-semibold text-xs sm:text-sm ${
              isDown ? 'text-[#C46800]' : 'text-green-600'
            }`}
          >
            {isDown ? '↓' : '↑'} {Math.abs(percentage)}%
          </span>
        </div>

        <div className="text-[14px] sm:text-sm text-gray-500">Compared to last month</div>

        {subText && (
          <div className="text-xs sm:text-sm font-medium text-[#8E3900] mt-1">{subText}</div>
        )}
      </div>

      {/* RIGHT GRAPH */}
      <div className="flex justify-center lg:justify-end items-center">
        <div className="w-full max-w-[140px] sm:max-w-[160px]">
          <AreaSparkline data={trend} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
