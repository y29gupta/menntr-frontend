'use client';

interface Props {
  label: string; // "Completion rate"
  valueText: string; // "54%"
  percentage: number; // 54
  footerText?: string; // optional
  barColor?: string;
  barBgColor?: string;
}

const HighestAvgDepartmentCard = ({
  label,
  valueText,
  percentage,
  footerText,
  barColor = '#C2410C',
  barBgColor = '#FFEDD5',
}: Props) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-[0px_0px_16px_0px_#0F172A1F]">
      {/* Label */}
      <p className="text-sm text-[#64748B] mb-2">{label}</p>

      {/* Value */}
      <p className="text-2xl sm:text-3xl font-semibold text-[#0F172A] mb-2">{valueText}</p>

      {/* Progress bar */}
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

      {footerText && (
        <p className="mt-3 text-sm font-medium" style={{ color: barColor }}>
          {footerText}
        </p>
      )}
    </div>
  );
};

export default HighestAvgDepartmentCard;
