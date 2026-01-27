type Props = {
  step: number;
};

export default function Stepper({ step }: Props) {
  return (
    <div className="flex  justify-center w-full mt-4 mb-8 px-4">
      <div className="flex items-center justify-center w-full max-w-4xl">
        {[1, 2, 3, 4].map((s, index) => (
          <div key={s} className="flex items-center">
            {/* Step circle wrapper */}
            <div className="relative flex-shrink-0">
              {/* Dashed ring for passed + current steps */}
              {step >= s && (
                <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#7C3AED]" />
              )}

              {/* Step circle */}
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-medium relative z-10
                  ${
                    step >= s ? 'bg-[#7C3AED] text-white' : 'border border-[#D0D5DD] text-[#667085]'
                  }`}
              >
                {s}
              </div>
            </div>

            {/* Connector */}
            {index !== 3 && (
              <div
                className={`h-[3px] mx-1  rounded-full flex-shrink min-w-[30px] lg:w-[230px] sm:max-w-[230px]
                  ${step > s ? 'bg-[#7C3AED]' : 'bg-[#E9D7FE]'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
