'use client';

import { useEffect, useRef, useState } from 'react';
import DropdownIcon from '../components/icons/DropdownIcon';
import { Search } from 'lucide-react';

type Option = {
  label: string;
  value: string;
  subLabel?: string;
};

interface Props {
  value?: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;

  searchable?: boolean;
  searchPlaceholder?: string;
}

const FormDropdown = ({
  value,
  placeholder,
  options,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search',
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
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

  const selected = options.find((o) => o.value === value);

  const filteredOptions = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={ref} className="relative mt-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex items-center border-b border-[#C3CAD9] justify-between
         bg-white px-1 py-2 text-sm text-gray-700
        
        "
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {selected?.label || placeholder}
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
          {/* 🔍 Search (optional) */}
          {searchable && (
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="
                    w-full pl-9 pr-3 py-2 text-sm
                    border rounded-md
                    focus:outline-none focus:ring-2 focus:ring-purple-500
                  "
                />
              </div>
            </div>
          )}

          {/* Options */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
            )}

            {filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setSearch('');
                }}
                className="
                  w-full px-4 py-2 text-left
                  hover:bg-purple-50
                "
              >
                <p className="text-sm font-medium text-gray-800">{opt.label}</p>

                {opt.subLabel && <p className="text-xs text-gray-500">{opt.subLabel}</p>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
