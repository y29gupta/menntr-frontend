'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CARD } from '../constants';

export type StepFourHandle = {
  submit: () => AccessState;
};

type AccessState = {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowReattempts: boolean;
  showCorrectAnswers: boolean;
  showScoreImmediately: boolean;
};

type Props = {
  data?: AccessState;
};

const ACCESS_OPTIONS: {
  key: keyof AccessState;
  label: string;
}[] = [
  { key: 'shuffleQuestions', label: 'Shuffle Questions' },
  { key: 'shuffleOptions', label: 'Shuffle Options' },
  { key: 'allowReattempts', label: 'Allow Re-attempts' },
  { key: 'showCorrectAnswers', label: 'Show correct answers after submission' },
  { key: 'showScoreImmediately', label: 'Show score immediately' },
];

const DEFAULT_STATE: AccessState = {
  shuffleQuestions: false,
  shuffleOptions: false,
  allowReattempts: false,
  showCorrectAnswers: false,
  showScoreImmediately: false,
};

const StepFour = forwardRef<StepFourHandle, Props>(({ data }, ref) => {
  const [state, setState] = useState<AccessState>(DEFAULT_STATE);

  // Sync API data → UI
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  // Expose submit to parent
  useImperativeHandle(ref, () => ({
    submit: () => state,
  }));

  return (
    <div>
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">Student Access</h3>

      <div className={CARD}>
        {ACCESS_OPTIONS.map(({ key, label }) => (
          <Check
            key={key}
            label={label}
            checked={state[key]}
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                [key]: v,
              }))
            }
          />
        ))}
      </div>
    </div>
  );
});

export default StepFour;

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="mb-3 flex items-center gap-3 last:mb-0 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 appearance-none rounded border border-[#D0D5DD]
        checked:bg-gradient-to-r checked:from-[#904BFF] checked:to-[#C053C2]
        checked:border-none relative checked:after:content-['✔']
        checked:after:absolute checked:after:text-white checked:after:text-sm
        checked:after:left-1/2 checked:after:top-1/2
        checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
      />
      <span className="text-[16px] text-[#636771]">{label}</span>
    </label>
  );
}
