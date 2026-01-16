'use client';

type RangeItem = {
  label: string;
  count: number;
  percentage: number;
  barBg: string;
  barFill: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  totalStudents: number;
  ranges: RangeItem[];
};

const ScoreDistributionCard = ({
  title = 'Score Distribution',
  subtitle = 'Distribution of student scores across defined ranges',
  totalStudents,
  ranges,
}: Props) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <p className="text-base sm:text-[18px] font-medium text-[#0F172A]">{title}</p>
          <p className="text-sm sm:text-[16px] text-[#64748B]">{subtitle}</p>
        </div>

        <p className="text-sm sm:text-[16px] text-[#475569]">
          Total Students : <span className="font-medium">{totalStudents}</span>
        </p>
      </div>

      {/* Ranges */}
      <div className="space-y-5">
        {ranges.map((item) => (
          <div key={item.label} className="space-y-2 sm:space-y-0">
            {/* Top row (mobile) */}
            <div className="flex justify-between sm:hidden">
              <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
              <span className="text-sm font-medium text-[#1E293B]">{item.count} Students</span>
            </div>

            {/* Main row */}
            <div className="flex items-center gap-4">
              {/* Label (desktop) */}
              <div className="hidden sm:block w-[60px] text-[16px] text-[#0F172A]">
                {item.label}
              </div>

              {/* Bar */}
              <div className="flex-1 max-w-[480px]">
                <div
                  className="h-[14px] sm:h-[17px] w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: item.barBg }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: `${item.percentage}%`,
                      background: item.barFill,
                    }}
                  />
                </div>
              </div>

              {/* Count (desktop) */}
              <div className="hidden sm:block text-[16px] font-medium text-[#1E293B] text-right">
                {item.count} Students
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreDistributionCard;
