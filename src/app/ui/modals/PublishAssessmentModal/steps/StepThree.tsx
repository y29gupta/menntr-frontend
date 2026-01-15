'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker, Switch, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type StepThreeHandle = {
  submit: () => {
    publish_at: string;
    expiry_at?: string;
  };
};

const StepThree = forwardRef<StepThreeHandle>((_, ref) => {
  const [setExpiry, setSetExpiry] = useState(false);
  const [publishAt, setPublishAt] = useState<Dayjs | null>(null);
  const [expiryAt, setExpiryAt] = useState<Dayjs | null>(null);

  useImperativeHandle(ref, () => ({
    submit() {
      if (!publishAt) {
        throw new Error('Publish date is required');
      }

      if (setExpiry && expiryAt && expiryAt.isBefore(publishAt)) {
        throw new Error('Expiry cannot be before publish date');
      }

      const payload: {
        publish_at: string;
        expiry_at?: string;
      } = {
        publish_at: publishAt.utc().toISOString(),
      };

      if (setExpiry && expiryAt) {
        payload.expiry_at = expiryAt.utc().toISOString();
      }

      return payload;
    },
  }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-medium text-[#101828]">Schedule & Availability</h3>

        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#667085]">Set Expiry</span>
          <Switch
            checked={setExpiry}
            onChange={(v) => {
              setSetExpiry(v);
              if (!v) setExpiryAt(null);
            }}
            className="expiry-switch"
          />
        </div>
      </div>

      <DateInput
        label="Publish Date & Time*"
        placeholder="Select the date and time to publish"
        value={publishAt}
        onChange={setPublishAt}
      />

      {setExpiry && (
        <DateInput
          label="Expiry Date & Time*"
          placeholder="Select the expiry date & time"
          value={expiryAt}
          onChange={setExpiryAt}
          disabledBefore={publishAt}
        />
      )}
    </div>
  );
});

export default StepThree;

/* ---------- DateInput (unchanged UI) ---------- */

function DateInput({
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

      <Tooltip
        title={disabledBefore ? 'Expiry date & time cannot be before publish date & time' : ''}
      >
        <DatePicker
          showTime
          value={value}
          onChange={onChange}
          format="DD MMM YYYY, hh:mm A"
          suffixIcon={null}
          allowClear={false}
          className="w-full border-none shadow-none"
          disabledDate={(current) => !!disabledBefore && current.isBefore(disabledBefore, 'minute')}
          disabledTime={(current) => {
            if (!disabledBefore || !current) return {};
            if (current.isSame(disabledBefore, 'day')) {
              return {
                disabledHours: () => Array.from({ length: disabledBefore.hour() }, (_, i) => i),
                disabledMinutes: (hour) =>
                  hour === disabledBefore.hour()
                    ? Array.from({ length: disabledBefore.minute() }, (_, i) => i)
                    : [],
              };
            }
            return {};
          }}
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
