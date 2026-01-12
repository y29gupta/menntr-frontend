'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker, Switch } from 'antd';
import dayjs from 'dayjs';

export default function StepThree() {
  const [setExpiry, setSetExpiry] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-medium text-[#101828]">Schedule & Availability</h3>

        {/* Set Expiry Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#667085]">Set Expiry</span>

          <Switch checked={setExpiry} onChange={setSetExpiry} className="expiry-switch" />
        </div>
      </div>

      {/* Publish Date */}
      <DateInput label="Publish Date & Time*" placeholder="Select the date and time to publish" />

      {/* Expiry Date */}
      {setExpiry && (
        <DateInput label="Expiry Date & Time*" placeholder="Select the expiry date & time" />
      )}
    </div>
  );
}

/* ---------- Date Input (Native calendar, custom icon) ---------- */
function DateInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="mb-4 w-full   space-y-2">
      <label className="block text-[12px] text-[#667085]">{label}</label>

      <DatePicker
        showTime
        format="DD MMM YYYY, hh:mm A"
        suffixIcon={null}
        allowClear={false}
        className="w-full border-none shadow-none"
        inputRender={(inputProps) => (
          <div className="relative mt-1  w-full">
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
    </div>
  );
}
