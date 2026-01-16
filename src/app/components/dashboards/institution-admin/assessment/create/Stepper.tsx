type Props = {
  step: number;
};

export default function Stepper({ step }: Props) {
  return (
    <div className="flex justify-center w-full mt-4 mb-8">
      <div className="flex items-center">
        {[1, 2, 3, 4].map((s, index) => (
          <div key={s} className="flex items-center">
            {/* Step circle wrapper */}
            <div className="relative">
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
                className={`h-[3px] w-[230px] mx-1 rounded-full
                  ${step > s ? 'bg-[#7C3AED]' : 'bg-[#E9D7FE]'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
