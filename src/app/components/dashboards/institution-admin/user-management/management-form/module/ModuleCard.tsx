"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchModuleFeatures,
  Feature,
  Module,
} from "@/app/lib/api/fetchModules";
import { useState, useEffect } from "react";

const ModuleCard = ({
  module,
  onSetPermissions,
}: {
  module: Module;
  onSetPermissions: () => void;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["features", module.id],
    queryFn: () => fetchModuleFeatures(module.id),
  });

  const features: Feature[] = data?.data || [];
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [features]);

  const toggleSelectAll = () => {
    if (selected.length === features.length) {
      setSelected([]);
    } else {
      setSelected(features.map((f) => f.id));
    }
  };

  const toggleFeature = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    features.length > 0 && selected.length === features.length;

  return (
    <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 shadow-sm flex flex-col">
      <header className="font-semibold text-gray-700 text-base pb-4 border-b border-gray-200">
        {module.name}
      </header>

      <div className="space-y-4 mt-4 flex-grow">
        {isLoading && <div>Loading features…</div>}

        {isError && (
          <div className="text-red-500">Failed to load features.</div>
        )}

        {!isLoading && features.length > 0 && (
          <>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="w-5 h-5 shrink-0 rounded border-2 border-gray-300"
              />
              <span className="text-gray-800 font-medium">All</span>
            </label>

            {features.map((f) => (
              <label key={f.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(f.id)}
                  onChange={() => toggleFeature(f.id)}
                  className="w-5 h-5 shrink-0 rounded border-2 border-gray-300"
                />
                <span className="text-gray-700">{f.name}</span>
              </label>
            ))}
          </>
        )}
      </div>

      <footer className="pt-4 mt-4 border-t border-gray-200 text-[#7B3AEC]">
        <button
          type="button"
          onClick={onSetPermissions}
          className="w-full font-semibold text-base"
        >
          Set Permissions
        </button>
      </footer>
    </div>
  );
};

export default ModuleCard;
