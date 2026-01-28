import { Check } from 'lucide-react';

type Option = { label: string; value: string };

type Props = {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function FormChip({ label, value, options, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium text-[#1A2C50]">{label}</label>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;

          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex font-[400px] items-center gap-2 pr-4 ps-3 py-2 rounded-[64px] border text-sm transition
                ${
                  active
                    ? 'border-[#7C3AED] !text-[#7C3AED] bg-[#F4EBFF]'
                    : 'border-[#C3CAD9] !text-[#3D465C]'
                }`}
            >
              {active && <Check size={14} className="text-[#7C3AED]" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
