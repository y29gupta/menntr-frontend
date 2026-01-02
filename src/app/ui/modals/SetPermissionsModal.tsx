'use client';
import { useEffect, useState } from 'react';

const PERMISSION_CONFIG: Record<
  string,
  {
    features: {
      name: string;
      permissions: string[];
    }[];
  }
> = {
  'User role and management': {
    features: [
      {
        name: 'User Management',
        permissions: ['Add User', 'Edit User', 'Deactivate User', 'Delete User', 'View Users'],
      },
      {
        name: 'Role Management',
        permissions: ['Create Role', 'Edit Role', 'Delete Role', 'Assign Role', 'View Roles'],
      },
      {
        name: 'Permission Control',
        permissions: ['Assign Permissions', 'Revoke Permissions', 'View Permission Matrix'],
      },
    ],
  },

  'Organization structure': {
    features: [
      {
        name: 'Institution Management',
        permissions: [
          'Create Institution',
          'Edit Institution',
          'Deactivate Institution',
          'View Institutions',
        ],
      },
      {
        name: 'Department Management',
        permissions: ['Add Department', 'Edit Department', 'Delete Department', 'View Departments'],
      },
      {
        name: 'Faculty Management',
        permissions: [
          'Add Faculty',
          'Edit Faculty',
          'Delete Faculty',
          'Assign Faculty to Department',
          'View Faculty',
        ],
      },
    ],
  },

  'Student management': {
    features: [
      {
        name: 'Student Data Management',
        permissions: [
          'Assign to Batch',
          'Bulk Import Students',
          'Add Student',
          'Delete Student',
          'Edit Student',
          'View All Students',
          'View Batch Students',
          'View Dept Students',
        ],
      },
      {
        name: 'Faculty Management',
        permissions: ['Add Faculty', 'Edit Faculty', 'Delete Faculty', 'View Faculty'],
      },
      {
        name: 'Advanced Student Tracking',
        permissions: ['View Performance', 'Track Attendance', 'Generate Reports'],
      },
    ],
  },

  'Assessment management': {
    features: [
      {
        name: 'CO-PO Assessments',
        permissions: ['Create Assessment', 'Edit Assessment', 'Delete Assessment', 'View Results'],
      },
      {
        name: "Revised Bloom's Types",
        permissions: ['Configure Bloom Levels', 'Map Questions', 'Edit Question Weights'],
      },
      {
        name: 'AI Assessments',
        permissions: ['Create AI Questions', 'Configure Difficulty', 'View AI Evaluation'],
      },
    ],
  },

  'Report and analytics': {
    features: [
      {
        name: 'Standard Reports',
        permissions: ['View Reports', 'Export Reports', 'Download PDF'],
      },
      {
        name: 'Dashboard Analytics',
        permissions: ['View Dashboard', 'Configure Widgets', 'Save Dashboard Layout'],
      },
      {
        name: 'Advanced Analytics',
        permissions: ['Create Custom Reports', 'Schedule Reports', 'Share Reports'],
      },
    ],
  },
};

export const SetPermissionsModal = ({
  open,
  moduleName,
  onClose,
  onConfirm,
  existingPermissions,
}: {
  open: boolean;
  moduleName: string | null;
  onClose: () => void;
  onConfirm: (moduleName: string, permissions: string[]) => void;
  existingPermissions?: string[];
}) => {
  if (!open || !moduleName) return null;

  const data = PERMISSION_CONFIG[moduleName];
  if (!data) return null;

  const [selectedFeature, setSelectedFeature] = useState(data.features[0]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // 🔑 THIS FIXES EVERYTHING
  useEffect(() => {
    if (open && data) {
      setSelectedFeature(data.features[0]);
    }
    setSelectedPermissions(existingPermissions ?? []);
  }, [open, moduleName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-[95vw] sm:max-w-[640px] md:max-w-[780px] rounded-2xl p-4 sm:p-6 m-5 shadow-xl flex flex-col border border-[#C2C9D8]">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Set Permissions</h2>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* FEATURES */}
          <div className="border rounded-xl p-4 border border-[#C2C9D8]">
            <h4 className="text-sm font-medium mb-3">Features list</h4>

            <ul className="space-y-2 text-sm">
              {data.features.map((f) => {
                const active = f.name === selectedFeature.name;

                return (
                  <li
                    key={f.name}
                    onClick={() => setSelectedFeature(f)}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                  ${active ? 'bg-purple-50 text-purple-600 font-medium' : 'hover:bg-gray-50'}`}
                  >
                    {f.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* PERMISSIONS */}
          <div className="sm:col-span-2 border rounded-xl p-4 md:min-h-[40vh] lg:min-h-[40vh] border border-[#C2C9D8]">
            <h4 className="text-sm font-medium mb-3">Permissions</h4>

            <div className="flex flex-wrap gap-2">
              {selectedFeature.permissions.map((p) => {
                const selected = selectedPermissions.includes(p);

                return (
                  <label
                    key={p}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm 
                  ${
                    selected
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                  }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={() =>
                        setSelectedPermissions((prev) =>
                          prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
                        )
                      }
                    />
                    {selected && <span>✓</span>}
                    {p}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="m-4  border-t border-[#C3CAD9] flex justify-center" />

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button onClick={onClose} className="w-full sm:flex-1 border rounded-full py-2 text-sm">
            Cancel
          </button>

          <button
            onClick={() => {
              if (moduleName) {
                onConfirm(moduleName, selectedPermissions);
              }
            }}
            className="w-full sm:flex-1 rounded-full py-2 text-sm text-white bg-[linear-gradient(90deg,#904BFF,#C053C2)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
