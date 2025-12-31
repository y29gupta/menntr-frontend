import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { FilterSection } from './types';

type Props<T> = {
  table: Table<T>;
  sections: FilterSection[];
  onClose: () => void;
};

export function FilterPopover<T>({ table, sections, onClose }: Props<T>) {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>({});

  const toggleValue = (key: string, value: string) => {
    setLocalFilters((prev) => {
      const values = prev[key] || [];
      return {
        ...prev,
        [key]: values.includes(value) ? values.filter((v) => v !== value) : [...values, value],
      };
    });
  };

  const toggleAll = (key: string, options: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: options,
    }));
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, values]) => {
      table.getColumn(key)?.setFilterValue(values);
    });
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-[440px] rounded-xl bg-white p-4 shadow-xl">
      <div className="grid grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.key}>
            <h4 className="mb-2 font-medium">{section.title}</h4>

            {section.options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={localFilters[section.key]?.includes(option) || false}
                  onChange={() => toggleValue(section.key, option)}
                />
                {option}
              </label>
            ))}

            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" onChange={() => toggleAll(section.key, section.options)} />
              All
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button onClick={onClose} className="rounded px-4 py-2 text-sm">
          Cancel
        </button>
        <button
          onClick={applyFilters}
          className="rounded bg-purple-600 px-4 py-2 text-sm text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
