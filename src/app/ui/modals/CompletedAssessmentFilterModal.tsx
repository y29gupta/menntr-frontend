'use client';

import { useEffect, useState } from 'react';

type FilterValues = {
  type: string[];
  evaluationStatus: string[];
};

type Props = {
  initialValues: FilterValues;
  onApply: (filters: FilterValues) => void;
  onClose: () => void;
};

export default function CompletedAssessmentFilterModal({ initialValues, onApply, onClose }: Props) {
  const [type, setType] = useState<string[]>(initialValues.type);
  const [evaluationStatus, setEvaluationStatus] = useState<string[]>(
    initialValues.evaluationStatus
  );

  useEffect(() => {
    setType(initialValues.type);
    setEvaluationStatus(initialValues.evaluationStatus);
  }, [initialValues]);

  const toggleSingle = (value: string, setState: (v: string[]) => void) => {
    setState([value]);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      <div className="absolute left-0 top-full z-50 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
        <div className="flex text-sm">
          {/* Type */}
          <div className="flex-1 pr-4">
            <p className="mb-3 font-medium">Type</p>

            {['All', 'MCQ+Coding', 'MCQ', 'Coding'].map((item) => (
              <label
                key={item}
                className="mb-3 flex cursor-pointer items-center gap-3 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={type.includes(item)}
                  onChange={() => toggleSingle(item, setType)}
                  className="peer relative h-4 w-4 appearance-none rounded border border-gray-300
                  checked:border-transparent
                  checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                  checked:after:content-['✔']
                  checked:after:absolute
                  checked:after:inset-0
                  checked:after:flex
                  checked:after:items-center
                  checked:after:justify-center
                  checked:after:text-[11px]
                  checked:after:text-white"
                />
                <span className="peer-checked:text-[#904BFF]">{item}</span>
              </label>
            ))}
          </div>

          <div className="w-px bg-gray-200" />

          {/* Evaluation status */}
          <div className="flex-1 pl-4">
            <p className="mb-3 font-medium">Evaluation status</p>

            {['All', 'Results published', 'Under evaluation'].map((item) => (
              <label
                key={item}
                className="mb-3 flex cursor-pointer items-center gap-3 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={evaluationStatus.includes(item)}
                  onChange={() => toggleSingle(item, setEvaluationStatus)}
                  className="peer relative h-4 w-4 appearance-none rounded border border-gray-300
                  checked:border-transparent
                  checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                  checked:after:content-['✔']
                  checked:after:absolute
                  checked:after:inset-0
                  checked:after:flex
                  checked:after:items-center
                  checked:after:justify-center
                  checked:after:text-[11px]
                  checked:after:text-white"
                />
                <span className="peer-checked:text-[#904BFF]">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="my-4 h-px bg-gray-200" />

        <div className="flex gap-3">
          <button
            onClick={() => onApply({ type, evaluationStatus })}
            className="flex-1 rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm font-medium text-white! hover:opacity-90"
          >
            Apply
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-full border px-5 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
