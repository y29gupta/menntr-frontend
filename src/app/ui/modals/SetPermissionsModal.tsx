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

import { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Feature } from '@/app/lib/api/fetchModules';

export const SetPermissionsModal = ({
  open,
  moduleCode,
  moduleName,
  onClose,
  onConfirm,
  roleId,
  selectedFeatures = [],
  existingPermissions = [],
}: {
  open: boolean;
  moduleCode: string | null;
  moduleName: string | null;
  onClose: () => void;
  roleId?: number;
  selectedFeatures?: Feature[];
  onConfirm: (moduleName: string, permissions: string[]) => void;
  existingPermissions?: string[];
}) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [featurePermissionsMap, setFeaturePermissionsMap] = useState<Record<string, string[]>>({});

  // Initialize selected feature from passed features
  useEffect(() => {
    if (open && selectedFeatures.length > 0) {
      setSelectedFeature(selectedFeatures[0]);
    }
  }, [open, selectedFeatures]);

  // Fetch default permissions for ALL features when modal opens (so they're included even if user doesn't switch features)
  useEffect(() => {
    if (!open || !roleId || selectedFeatures.length === 0) return;

    const fetchDefaultsForAllFeatures = async () => {
      // Get existing permissions grouped by feature
      // We need to determine which permissions belong to which feature
      // For now, fetch defaults for features that don't have stored permissions yet
      for (const feature of selectedFeatures) {
        // Skip if we already have permissions stored for this feature
        if (featurePermissionsMap[feature.code] !== undefined) {
          continue;
        }

        try {
          const res = await fetch(
            `/api/institutionsadmin/features/permissions/${feature.code}?roleId=${roleId}`,
            { credentials: 'include' }
          );
          if (res.ok) {
            const data = await res.json();
            const defaults: string[] = data.defaultSelectedPermissions || [];

            // Store defaults in the map (even if empty array, to mark as fetched)
            setFeaturePermissionsMap((prev) => ({
              ...prev,
              [feature.code]: defaults,
            }));
          }
        } catch (error) {
          console.error(`Error fetching defaults for feature ${feature.code}:`, error);
        }
      }
    };

    fetchDefaultsForAllFeatures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, roleId, selectedFeatures.map(f => f.code).join(',')]);

  // Fetch permissions for the selected feature
  const { data: permissionResponse, isLoading: loadingPermissions } = useQuery({
    enabled: !!selectedFeature && open && !!roleId, // Only fetch if roleId is available
    queryKey: ['permissions-by-feature', selectedFeature?.code, roleId],
    queryFn: async () => {
      if (!roleId) {
        throw new Error('Role ID is required');
      }
      const res = await fetch(
        `/api/institutionsadmin/features/permissions/${selectedFeature?.code}?roleId=${roleId}`,
        { credentials: 'include' }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch permissions');
      }
      const data = await res.json();
      console.log('Permission Response:', { 
        featureCode: selectedFeature?.code, 
        roleId, 
        defaults: data.defaultSelectedPermissions,
        allPermissions: data.allPermissions?.length 
      });
      return data;
    },
  });

  const permissions = permissionResponse?.allPermissions ?? [];
  const defaultSelectedPermissions = permissionResponse?.defaultSelectedPermissions ?? [];

  // Initialize permissions when modal opens or feature changes
  useEffect(() => {
    if (!open || !selectedFeature || !permissionResponse || permissions.length === 0 || !roleId) return;

    const featureKey = selectedFeature.code;
    const featurePermissionCodes = permissions.map((p: any) => p.code);

    // If we have stored permissions for this feature, use them
    const storedPermissions = featurePermissionsMap[featureKey];
    if (storedPermissions !== undefined) {
      if (storedPermissions.length > 0 || defaultSelectedPermissions.length === 0) {
        setSelectedPermissions(storedPermissions);
        return;
      }
    }

    // Filter existing permissions to only those belonging to this feature
    const existingForThisFeature = existingPermissions.filter((code) =>
      featurePermissionCodes.includes(code)
    );

    // Merge defaults with any existing permissions for this feature
    const merged = existingForThisFeature.length > 0
      ? [...new Set([...defaultSelectedPermissions, ...existingForThisFeature])]
      : [...defaultSelectedPermissions];

    setSelectedPermissions(merged);
    setFeaturePermissionsMap((prev) => ({
      ...prev,
      [featureKey]: merged,
    }));
  }, [open, selectedFeature?.code, permissionResponse, defaultSelectedPermissions.join(','), permissions.length]);

  // Update stored permissions when user changes selection
  useEffect(() => {
    if (selectedFeature) {
      setFeaturePermissionsMap((prev) => ({
        ...prev,
        [selectedFeature.code]: selectedPermissions,
      }));
    }
  }, [selectedPermissions, selectedFeature]);

  // Handle feature change - restore stored permissions or defaults
  const handleFeatureChange = (feature: Feature) => {
    setSelectedFeature(feature);
    const featureKey = feature.code;
    
    if (featurePermissionsMap[featureKey] && featurePermissionsMap[featureKey].length > 0) {
      setSelectedPermissions(featurePermissionsMap[featureKey]);
    } else {
      // Fetch defaults for new feature (will be set in useEffect above)
      setSelectedPermissions([]);
    }
  };

  // Restore to default permissions for current feature
  // "Default" means role default permissions from API
  const handleRestoreToDefault = () => {
    if (!selectedFeature || !permissionResponse) return;
    // Restore to role default permissions
    setSelectedPermissions(defaultSelectedPermissions);
    setFeaturePermissionsMap((prev) => ({
      ...prev,
      [selectedFeature.code]: defaultSelectedPermissions,
    }));
  };

  // Save permissions before closing (auto-save on close)
  const savePermissions = () => {
    if (moduleName && selectedFeature) {
      // Save current feature's permissions before aggregating
      const currentMap = {
        ...featurePermissionsMap,
        [selectedFeature.code]: selectedPermissions,
      };
      
      // Aggregate all permissions from all features in this module
      const allModulePermissions = Object.values(currentMap).flat();
      const uniquePermissions = [...new Set(allModulePermissions)];
      onConfirm(moduleName, uniquePermissions);
    }
  };

  // Reset state when modal closes
  const handleClose = (skipSave = false) => {
    // Auto-save permissions when closing (if not explicitly skipped)
    if (!skipSave) {
      savePermissions();
    }
    // Don't reset featurePermissionsMap - we want to keep it for when user reopens
    // Only reset selectedFeature and selectedPermissions
    setSelectedFeature(null);
    setSelectedPermissions([]);
    onClose();
  };

  if (!open || !moduleName) return null;

  // Show message if roleId is missing
  if (!roleId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => handleClose(true)} />
        <div className="relative bg-white w-full max-w-[95vw] sm:max-w-[640px] rounded-2xl p-6 m-5 shadow-xl flex flex-col border border-[#C2C9D8]">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Set Permissions — {moduleName}</h2>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Please select a role first before setting permissions.</p>
            <button
              onClick={() => handleClose(true)}
              className="px-6 py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => handleClose()} />

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
                  const active = selectedFeature?.code === f.code;
                  return (
                    <li
                      key={f.code}
                      onClick={() => handleFeatureChange(f)}
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
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Permissions</h4>
              <button
                type="button"
                onClick={handleRestoreToDefault}
                className="text-xs text-purple-600 hover:text-purple-700 underline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!permissionResponse || defaultSelectedPermissions.length === 0}
              >
                Restore to Default
              </button>
            </div>

            {loadingPermissions ? (
              <div className="text-gray-500">Loading permissions…</div>
            ) : permissions.length === 0 ? (
              <div className="text-gray-500">No permissions available</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {permissions.map(
                  (p: {
                    code: string;
                    name: string;
                    description: string;
                    actionType: string;
                  }) => {
                    const selected = selectedPermissions.includes(p.code);
                    const isDefault = defaultSelectedPermissions.includes(p.code);

                    return (
                      <label
                        key={p.code}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm transition-all relative ${
                          selected
                            ? isDefault
                              ? 'bg-purple-100 text-purple-700 border-2 border-purple-400'
                              : 'bg-purple-100 text-purple-700 border border-purple-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                        }`}
                        title={isDefault ? 'Default permission' : ''}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            setSelectedPermissions((prev) =>
                              prev.includes(p.code)
                                ? prev.filter((c) => c !== p.code)
                                : [...prev, p.code]
                            )
                          }
                          className="cursor-pointer"
                        />
                        {selected && <span>✓</span>}
                        {p.name}
                        {isDefault && selected && (
                          <span className="ml-1 text-xs text-purple-500">(default)</span>
                        )}
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
            onClick={() => handleClose(true)} // Skip saving on Cancel
            className="w-full sm:flex-1 border border-gray-300 rounded-full py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              savePermissions();
              handleClose(true); // Skip auto-save since we just saved
            }}
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
