'use client';
import { useState } from 'react';

const PERMISSION_CONFIG: Record<
  string,
  {
    features: {
      name: string;
      permissions: string[];
    }[];
  }
> = {
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
        permissions: ['Create Assessment', 'Edit Assessment', 'View Results'],
      },
      {
        name: "Revised Bloom's Types",
        permissions: ['Configure Levels', 'Map Questions'],
      },
    ],
  },
};

export const SetPermissionsModal = ({
  open,
  moduleName,
  onClose,
}: {
  open: boolean;
  moduleName: string | null;
  onClose: () => void;
}) => {
  if (!open || !moduleName) return null;

  const data = PERMISSION_CONFIG[moduleName];
  if (!data) return null;

  const [selectedFeature, setSelectedFeature] = useState(data.features[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white w-[900px] max-w-[95vw] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Set Permissions</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* FEATURES */}
          <div className="border rounded-xl p-4">
            <h4 className="text-sm font-medium mb-3">Features list</h4>

            <ul className="space-y-2 text-sm">
              {data.features.map((f) => {
                const active = f.name === selectedFeature.name;

                return (
                  <li
                    key={f.name}
                    onClick={() => setSelectedFeature(f)}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                      ${active ? 'bg-purple-50 text-purple-600 font-medium' : 'hover:bg-gray-50'}
                    `}
                  >
                    {f.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* PERMISSIONS */}
          <div className="col-span-2 border rounded-xl p-4">
            <h4 className="text-sm font-medium mb-3">Permissions</h4>

            <div className="flex flex-wrap gap-2">
              {selectedFeature.permissions.map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm cursor-pointer"
                >
                  <input type="checkbox" className="w-4 h-4 accent-purple-500" />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between mt-6 gap-4">
          <button onClick={onClose} className="flex-1 border rounded-full py-2 text-sm">
            Cancel
          </button>

          <button className="flex-1 rounded-full py-2 text-sm text-white bg-[linear-gradient(90deg,#904BFF,#C053C2)]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
