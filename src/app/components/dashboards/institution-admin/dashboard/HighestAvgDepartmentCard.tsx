'use client';

interface Props {
  label: string;
  valueText: React.ReactNode;
  percentage: number;
  barColor?: string;
  barBgColor?: string;
  footerText?: string;
}

const HighestAvgDepartmentCard = ({
  label,
  valueText,
  percentage,
  barColor = '#D97706',
  barBgColor = '#FDE7C7',
  footerText,
}: Props) => {
  return (
    <div className="w-full rounded-2xl bg-white px-5 py-4 shadow-[0px_0px_16px_0px_#0F172A1F]">
      <div className="flex flex-col">
        {/* LEFT LABEL */}
        <div className="min-w-[110px]">
          <p className="text-sm text-[#192B4F]">{label}</p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex items-center gap-2">
          {/* VALUE */}
          <div className="mb-2 text-2xl font-semibold text-[#0F172A]">{valueText}</div>

          {/* PROGRESS BAR */}
          <div
            className="h-2 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: barBgColor }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                background: barColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighestAvgDepartmentCard;
