'use client';

import { memo } from 'react';
import { Controller, Control } from 'react-hook-form';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import FormDropdown from '@/app/ui/FormDropdown';

type AttemptOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  assessmentName: string;
  control: Control<any>;
  attemptOptions: AttemptOption[];
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

function ReportHeader({
  name,
  assessmentName,
  control,
  attemptOptions,
  onPrev,
  onNext,
  onClose,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E3E6EF] p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#101828]">{name}’s Report</h2>
        <p className="text-[14px] text-[#667085]">Assessment: {assessmentName}</p>
      </div>

      {/* CENTER */}
      <div className="w-full sm:w-[140px]">
        <Controller
          name="attempt"
          control={control}
          render={({ field }) => (
            <FormDropdown
              value={field.value}
              onChange={field.onChange}
              options={attemptOptions}
              placeholder="Attempt"
            />
          )}
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-between sm:justify-end gap-2">
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 rounded-full border border-[#7F56D9] px-3 py-2 text-[14px] font-medium text-[#7F56D9]"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-full border border-[#7F56D9] px-3 py-2 text-[14px] font-medium text-[#7F56D9]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={onClose}>
          <X className="h-5 w-5 text-[#101828]" />
        </button>
      </div>
    </div>
  );
}

export default memo(ReportHeader);
