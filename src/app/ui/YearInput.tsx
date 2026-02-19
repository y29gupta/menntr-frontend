import { DatePicker, Tooltip } from 'antd';
import { Calendar } from 'lucide-react';
import { Dayjs } from 'dayjs';

export default function YearInput({
  label,
  placeholder,
  value,
  onChange,
  disabledBefore,
}: {
  label: string;
  placeholder: string;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  disabledBefore?: Dayjs | null;
}) {
  return (
    <div className="mb-4 w-full space-y-2">
      <label className="block text-[12px] text-[#667085]">{label}</label>

      <Tooltip title={disabledBefore ? 'End year cannot be before start year' : ''}>
        <DatePicker
          picker="year"
          value={value}
          onChange={onChange}
          format="YYYY"
          suffixIcon={null}
          allowClear={false}
          className="w-full border-none shadow-none"
          disabledDate={(current) => !!disabledBefore && current.isBefore(disabledBefore, 'year')}
          inputRender={(inputProps) => (
            <div className="relative mt-1 w-full">
              <input
                {...inputProps}
                readOnly
                placeholder={placeholder}
                className="w-full cursor-pointer appearance-none border-b border-[#D0D5DD] pb-2 pr-8 text-[14px] text-[#101828] outline-none placeholder:text-[#98A2B3]"
              />
              <Calendar
                size={16}
                className="pointer-events-none absolute right-0 top-1 text-[#667085]"
              />
            </div>
          )}
        />
      </Tooltip>
    </div>
  );
}
