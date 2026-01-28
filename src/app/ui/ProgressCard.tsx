interface Props {
  label: string;
  valueText: string;
  percentage: number;
  footerText?: string;
  className?: string;
}

const PerformanceCard = ({ label, valueText, percentage, footerText, className }: Props) => {
  const getProgressColors = (percentage: number) => {
    if (percentage >= 70) {
      return {
        barGradient: 'linear-gradient(90deg, #5BC376 0%, #149436 100%)',
        barBg: '#E7FFED',
      };
    }

    if (percentage >= 40) {
      return {
        barGradient: 'linear-gradient(90deg, #DBA261 0%, #C16700 100%)',
        barBg: '#F6E1D7',
      };
    }

    return {
      barGradient: 'linear-gradient(90deg, #F87171 0%, #DC2626 100%)',
      barBg: '#FEE2E2',
    };
  };

  const { barGradient, barBg } = getProgressColors(percentage);

  return (
    <div
      className={`w-full flex  gap-4 justify-between items-center  bg-white/60 backdrop-blur-[100px]
        shadow-[0_0_8px_0_#0F172A1F]
        rounded-2xl px-4  ${className ?? ''}`}
    >
      <div className="flex flex-col pt-4">
        <p className="text-sm text-[#64748B]   ">{label}</p>

        <p className="text-2xl    sm:text-3xl font-semibold text-[#1A2C50] ">{valueText}</p>
      </div>
      {/* <div className="flex items-start  justify-between gap-3"> */}
      <div className="flex   self-center-safe  w-[75%] ">
        <div
          className="h-2 w-full  rounded-full overflow-hidden"
          style={{ backgroundColor: barBg }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: barGradient,
            }}
          />
        </div>
      </div>
      {/* </div> */}

      {/* {footerText && <p className=" border text-sm font-medium text-[#64748B]">{footerText}</p>} */}
    </div>
  );
};

export default PerformanceCard;
