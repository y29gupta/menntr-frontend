'use client';

import { useEffect, useRef, useState } from 'react';
import DropdownIcon from '../components/icons/DropdownIcon';
// import DropdownIcon from './DropdownIcon';

type Option = {
  label: string;
  value: string;
};

interface Props {
  value?: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
}

const FormDropdown = ({ value, placeholder, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className="relative mt-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex items-center justify-between
          rounded-lg bg-white px-3 py-2 text-sm text-gray-700
          shadow-[0_4px_12px_rgba(15,23,42,0.08)]
        "
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <DropdownIcon />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-lg bg-white
          shadow-[0_4px_16px_0_#00000033]
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2 text-left text-sm text-gray-700
                hover:bg-purple-50 hover:text-purple-700
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
