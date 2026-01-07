type Props = {
  step: number;
};

export default function Stepper({ step }: Props) {
  return (
    <div className="flex items-center w-full mt-4 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center w-full">
          <div
            className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-medium
              ${step >= s ? 'bg-[#7C3AED] text-white' : 'border border-[#D0D5DD] text-[#667085]'}`}
          >
            {s}
          </div>

          {s !== 4 && (
            <div
              className={`flex-1 h-[3px] mx-2 rounded-full
                ${step > s ? 'bg-[#7C3AED]' : 'bg-[#E9D7FE]'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
