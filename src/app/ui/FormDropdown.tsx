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
  value?: string | string[];
  placeholder: string;
  options: Option[];
  onChange: (value: string | string[]) => void;

  searchable?: boolean;
  searchPlaceholder?: string;
  multiple?: boolean;
  renderChips?: boolean;
  containerClassName?: string;
}

const FormDropdown = ({
  value,
  placeholder,
  options,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search',
  multiple = false,
  renderChips = false,

  containerClassName,
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

  // const selected = options.find((o) => o.value === value);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selected = options.filter((o) => selectedValues.includes(o.value));

  const filteredOptions = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={ref} className="relative  mt-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full cursor-pointer flex gap-2 items-center border-b border-[#C3CAD9] justify-between
         bg-white px-1 py-2 text-sm text-gray-700
        
        "
      >
        {/* <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {selected?.label || placeholder}
        </span> */}

        {/* <span className={selected.length ? 'text-sm text-gray-800 ' : 'text-gray-400  text-sm'}>
          {selected.length ? selected.map((o) => o.label).join(', ') : placeholder}
        </span> */}
        {renderChips && multiple && selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map((opt) => (
              <span
                key={opt.value}
                className="flex border-[#C3CAD9] border items-center gap-2 px-3 py-1 rounded-full
         text-sm text-gray-700"
              >
                {opt.label}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${opt.label}`}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(selectedValues.filter((v) => v !== opt.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(selectedValues.filter((v) => v !== opt.value));
                    }
                  }}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        ) : (
          <span className={selected.length ? 'text-sm text-gray-800' : 'text-gray-400 text-sm'}>
            {selected.length ? selected.map((o) => o.label).join(', ') : placeholder}
          </span>
        )}

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
                // onClick={() => {
                //   onChange(opt.value);
                //   setOpen(false);
                //   setSearch('');
                // }}
                onClick={() => {
                  if (!multiple) {
                    onChange(opt.value);
                    setOpen(false);
                  } else {
                    const next = selectedValues.includes(opt.value)
                      ? selectedValues.filter((v) => v !== opt.value)
                      : [...selectedValues, opt.value];

                    onChange(next);
                  }
                  setSearch('');
                }}
                className="
                  w-full px-4 py-2 text-left
                  hover:bg-purple-50
                "
              >
                <p className="text-sm font-light  !text-[#0F172A]">{opt.label}</p>

                {opt.subLabel && <p className="text-xs !text-[#0F172A]">{opt.subLabel}</p>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
