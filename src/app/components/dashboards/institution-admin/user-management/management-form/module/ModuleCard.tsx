// "use client";

// import { useQuery } from "@tanstack/react-query";
// import {
//   fetchModuleFeatures,
//   Feature,
//   Module,
// } from "@/app/lib/api/fetchModules";
// import { useState, useEffect } from "react";

// const ModuleCard = ({
//   module,
//   onSetPermissions,
// }: {
//   module: Module;
//   onSetPermissions: () => void;
// }) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["features", module.id],
//     queryFn: () => fetchModuleFeatures(module.id),
//   });

//   const features: Feature[] = data?.data || [];
//   const [selected, setSelected] = useState<number[]>([]);

//   useEffect(() => {
//     setSelected([]);
//   }, [features]);

//   const toggleSelectAll = () => {
//     if (selected.length === features.length) {
//       setSelected([]);
//     } else {
//       setSelected(features.map((f) => f.id));
//     }
//   };

//   const toggleFeature = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const isAllSelected =
//     features.length > 0 && selected.length === features.length;

//   return (
//     <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 shadow-sm flex flex-col">
//       <header className="font-semibold text-gray-700 text-base pb-4 border-b border-gray-200">
//         {module.name}
//       </header>

//       <div className="space-y-4 mt-4 flex-grow">
//         {isLoading && <div>Loading features…</div>}

//         {isError && (
//           <div className="text-red-500">Failed to load features.</div>
//         )}

//         {!isLoading && features.length > 0 && (
//           <>
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isAllSelected}
//                 onChange={toggleSelectAll}
//                 className="w-5 h-5 shrink-0 rounded border-2 border-gray-300"
//               />
//               <span className="text-gray-800 font-medium">All</span>
//             </label>

//             {features.map((f) => (
//               <label key={f.id} className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(f.id)}
//                   onChange={() => toggleFeature(f.id)}
//                   className="w-5 h-5 shrink-0 rounded border-2 border-gray-300"
//                 />
//                 <span className="text-gray-700">{f.name}</span>
//               </label>
//             ))}
//           </>
//         )}
//       </div>

//       <footer className="pt-4 mt-4 border-t border-gray-200 text-[#7B3AEC]">
//         <button
//           type="button"
//           onClick={onSetPermissions}
//           className="w-full font-semibold text-base"
//         >
//           Set Permissions
//         </button>
//       </footer>
//     </div>
//   );
// };

// export default ModuleCard;


// ============================================
// 1. ModuleCard.tsx
// ============================================
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
  roleId,
}: {
  module: Module;
  onSetPermissions: (selectedFeatures: Feature[]) => void;
  roleId?: number;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["features", module.code],
    queryFn: () => fetchModuleFeatures(module.code),
  });

  const features: Feature[] = data?.data || [];
  const [selected, setSelected] = useState<string[]>([]);
  const [featuresWithDefaults, setFeaturesWithDefaults] = useState<Set<string>>(new Set());

  // Use feature codes as dependency instead of the array itself to avoid infinite loops
  const featureCodes = features.map((f) => f.code).join(',');

  // Fetch default permissions for each feature to determine which ones should be selected
  useEffect(() => {
    if (features.length === 0) {
      setSelected([]);
      return;
    }

    // By default, select all features
    const allFeatureCodes = features.map((f) => f.code);
    setSelected(allFeatureCodes);

    // If roleId is available, check each feature for default permissions
    if (!roleId) {
      return;
    }

    // Check each feature for default permissions and uncheck those without defaults
    const checkFeaturesForDefaults = async () => {
      const featuresToKeep = new Set<string>();

      await Promise.all(
        features.map(async (feature) => {
          try {
            const res = await fetch(
              `/api/institutionsadmin/features/permissions/${feature.code}?roleId=${roleId}`,
              { credentials: 'include' }
            );
            if (res.ok) {
              const data = await res.json();
              if (data.defaultSelectedPermissions && data.defaultSelectedPermissions.length > 0) {
                featuresToKeep.add(feature.code);
              }
            }
          } catch (error) {
            console.error(`Error checking defaults for feature ${feature.code}:`, error);
            featuresToKeep.add(feature.code);
          }
        })
      );

      setSelected(Array.from(featuresToKeep));
      setFeaturesWithDefaults(featuresToKeep);
    };

    checkFeaturesForDefaults();
  }, [featureCodes, roleId]);

  const toggleSelectAll = () => {
    if (selected.length === features.length) {
      setSelected([]);
    } else {
      setSelected(features.map((f) => f.code));
    }
  };

  const toggleFeature = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
    );
  };

  const isAllSelected =
    features.length > 0 && selected.length === features.length;

  const selectedFeatures = features.filter((f) =>
    selected.includes(f.code)
  );

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
              <label key={f.code} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(f.code)}
                  onChange={() => toggleFeature(f.code)}
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
          onClick={() => onSetPermissions(selectedFeatures)}
          disabled={selectedFeatures.length === 0}
          className="w-full font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Set Permissions
        </button>
      </footer>
    </div>
  );
};

export default ModuleCard;
