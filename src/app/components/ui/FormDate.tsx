import { DatePicker, Tooltip } from 'antd';
import { Calendar } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

type Props = {
  label: string;
  value: Dayjs | null;
  placeholder?: string;
  onChange: (v: Dayjs | null) => void;
};

function DateInput({
  label,
  placeholder = 'Select date',
  value,
  onChange,
  //   disabledBefore,
}: Props) {
  return (
    <div className="mb-4 w-full space-y-2">
      <label className="block text-[12px] text-[#667085]">{label}</label>

      <Tooltip title="">
        <DatePicker
          value={value}
          onChange={onChange}
          format="DD MMM YYYY"
          suffixIcon={null}
          allowClear={false}
          className="w-full border-none shadow-none"
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
export default DateInput;
