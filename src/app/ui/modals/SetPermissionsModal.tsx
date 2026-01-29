// 'use client';

// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// export const SetPermissionsModal = ({
//   open,
//   moduleId,
//   moduleName,
//   onClose,
//   onConfirm,
//   roleId,
// }: {
//   open: boolean;
//   moduleId: number | null;
//   moduleName: string | null;
//   onClose: () => void;
//   roleId?: number;
//   onConfirm: (moduleName: string, permissions: number[]) => void; // ✅ Changed to number[]
//   existingPermissions?: number[]; // ✅ Changed to number[]
// }) => {
//   const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
//   const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]); // ✅ Using number[]

//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const { data: featuresData, isLoading: loadingFeatures } = useQuery({
//     enabled: open && !!moduleId,
//     queryKey: ['features-by-module', moduleId],
//     queryFn: async () => {
//       const res = await fetch(`/api/institutionsadmin/modules/features/${moduleId}`, {
//         credentials: 'include',
//       });

//       const json = await res.json();
//       return json.data || [];
//     },
//   });

//   const features = featuresData ?? [];

//   useEffect(() => {
//     if (features.length) {
//       setSelectedFeature(features[0]);
//     }
//   }, [features]);

//   const { data: permissionResponse, isLoading: loadingPermissions } = useQuery({
//     enabled: !!selectedFeature,
//     queryKey: ['permissions-by-feature', selectedFeature?.code, roleId],
//     queryFn: async () => {
//       const res = await fetch(
//         `${BASE_URL}/institutionsadmin/features/permissions/${selectedFeature.code}?roleId=${roleId}`,
//         { credentials: 'include' }
//       );

//       return res.json();
//     },
//   });

//   const permissions = permissionResponse?.allPermissions ?? [];
//   const defaultSelectedPermissions = permissionResponse?.defaultSelectedPermissions ?? [];

//   useEffect(() => {
//     if (open && defaultSelectedPermissions.length > 0) {
//       setSelectedPermissions(defaultSelectedPermissions);
//     }
//   }, [open, defaultSelectedPermissions]);

//   if (!open || !moduleName) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

//       <div className="relative bg-white w-full max-w-[95vw] sm:max-w-[640px] md:max-w-[780px] rounded-2xl p-4 sm:p-6 m-5 shadow-xl flex flex-col border border-[#C2C9D8]">
//         <h2 className="text-base sm:text-lg font-semibold mb-4">Set Permissions — {moduleName}</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {/* LEFT: FEATURES */}
//           <div className="border rounded-xl p-4 border border-[#C2C9D8]">
//             <h4 className="text-sm font-medium mb-3">Features list</h4>

//             {loadingFeatures && <div>Loading features…</div>}

//             {!loadingFeatures && (
//               <ul className="space-y-2 text-sm">
//                 {features.map((f: any) => {
//                   const active = selectedFeature?.id === f.id;

//                   return (
//                     <li
//                       key={f.id}
//                       onClick={() => setSelectedFeature(f)}
//                       className={`px-3 py-2 rounded-lg cursor-pointer ${
//                         active ? 'bg-purple-50 text-purple-600 font-medium' : 'hover:bg-gray-50'
//                       }`}
//                     >
//                       {f.name}
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>

//           {/* RIGHT: PERMISSIONS */}
//           <div className="sm:col-span-2 border rounded-xl p-4 md:min-h-[40vh] lg:min-h-[40vh] border border-[#C2C9D8]">
//             <h4 className="text-sm font-medium mb-3">Permissions</h4>

//             {loadingPermissions && <div>Loading permissions…</div>}

//             {!loadingPermissions && (
//               <div className="flex flex-wrap gap-2">
//                 {permissions.map(
//                   (p: {
//                     id: number;
//                     code: string;
//                     name: string;
//                     description: string;
//                     action_type: string;
//                   }) => {
//                     // ✅ Using p.id instead of p.code
//                     const selected = selectedPermissions.includes(p.id);

//                     return (
//                       <label
//                         key={p.id}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm ${
//                           selected
//                             ? 'bg-purple-100 text-purple-700 border border-purple-300'
//                             : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-purple-300'
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selected}
//                           onChange={() =>
//                             setSelectedPermissions(
//                               (prev) =>
//                                 prev.includes(p.id)
//                                   ? prev.filter((id) => id !== p.id) // ✅ Remove by id
//                                   : [...prev, p.id] // ✅ Add by id
//                             )
//                           }
//                         />

//                         {selected && <span>✓</span>}
//                         {p.name}
//                       </label>
//                     );
//                   }
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="m-4 border-t border-[#C3CAD9] flex justify-center" />

//         <div className="flex flex-col sm:flex-row justify-between gap-3">
//           <button onClick={onClose} className="w-full sm:flex-1 border rounded-full py-2 text-sm">
//             Cancel
//           </button>

//           <button
//             onClick={() => moduleName && onConfirm(moduleName, selectedPermissions)} // ✅ Pass number[]
//             className="w-full sm:flex-1 rounded-full py-2 text-sm text-white bg-[linear-gradient(90deg,#904BFF,#C053C2)]"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Feature } from '@/app/lib/api/fetchModules';

export const SetPermissionsModal = ({
  open,
  moduleId,
  moduleName,
  onClose,
  onConfirm,
  roleId,
  selectedFeatures = [],
  existingPermissions = [],
}: {
  open: boolean;
  moduleId: number | null;
  moduleName: string | null;
  onClose: () => void;
  roleId?: number;
  selectedFeatures?: Feature[];
  onConfirm: (moduleName: string, permissions: number[]) => void;
  existingPermissions?: number[];
}) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  // Initialize selected feature from passed features
  useEffect(() => {
    if (open && selectedFeatures.length > 0) {
      setSelectedFeature(selectedFeatures[0]);
    }
  }, [open, selectedFeatures]);

  // Fetch permissions for the selected feature
  const { data: permissionResponse, isLoading: loadingPermissions } = useQuery({
    enabled: !!selectedFeature,
    queryKey: ['permissions-by-feature', selectedFeature?.code, roleId],
    queryFn: async () => {
      const res = await fetch(
        `/api/institutionsadmin/features/permissions/${selectedFeature?.code}?roleId=${roleId}`,
        { credentials: 'include' }
      );
      return res.json();
    },
  });

  const permissions = permissionResponse?.allPermissions ?? [];
  const defaultSelectedPermissions = permissionResponse?.defaultSelectedPermissions ?? [];

  // Initialize permissions
  useEffect(() => {
    if (open && defaultSelectedPermissions.length > 0) {
      setSelectedPermissions(defaultSelectedPermissions);
    }
  }, [open, defaultSelectedPermissions]);

  if (!open || !moduleName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[95vw] sm:max-w-[640px] md:max-w-[780px] rounded-2xl p-4 sm:p-6 m-5 shadow-xl flex flex-col border border-[#C2C9D8]">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Set Permissions — {moduleName}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* LEFT: FEATURES LIST */}
          <div className="border rounded-xl p-4 border border-[#C2C9D8]">
            <h4 className="text-sm font-medium mb-3">Features list</h4>

            {selectedFeatures.length === 0 ? (
              <div className="text-sm text-gray-500">No features selected</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {selectedFeatures.map((f: Feature) => {
                  const active = selectedFeature?.id === f.id;
                  return (
                    <li
                      key={f.id}
                      onClick={() => setSelectedFeature(f)}
                      className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        active
                          ? 'bg-purple-50 text-purple-600 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {f.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* RIGHT: PERMISSIONS */}
          <div className="sm:col-span-2 border rounded-xl p-4 md:min-h-[40vh] lg:min-h-[40vh] border border-[#C2C9D8]">
            <h4 className="text-sm font-medium mb-3">Permissions</h4>

            {loadingPermissions ? (
              <div className="text-gray-500">Loading permissions…</div>
            ) : permissions.length === 0 ? (
              <div className="text-gray-500">No permissions available</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {permissions.map(
                  (p: {
                    id: number;
                    code: string;
                    name: string;
                    description: string;
                    action_type: string;
                  }) => {
                    const selected = selectedPermissions.includes(p.id);

                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm transition-all ${
                          selected
                            ? 'bg-purple-100 text-purple-700 border border-purple-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            setSelectedPermissions((prev) =>
                              prev.includes(p.id)
                                ? prev.filter((id) => id !== p.id)
                                : [...prev, p.id]
                            )
                          }
                          className="cursor-pointer"
                        />
                        {selected && <span>✓</span>}
                        {p.name}
                      </label>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>

        <div className="m-4 border-t border-[#C3CAD9]" />

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 border border-gray-300 rounded-full py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => moduleName && onConfirm(moduleName, selectedPermissions)}
            className="w-full sm:flex-1 rounded-full py-2 text-sm font-medium text-white bg-[linear-gradient(90deg,#904BFF,#C053C2)] hover:opacity-90 transition-opacity"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPermissionsModal;
