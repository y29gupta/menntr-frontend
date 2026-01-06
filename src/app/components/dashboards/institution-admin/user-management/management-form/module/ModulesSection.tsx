'use client';

import { useState } from 'react';
import ModuleSelector from '../selectors/ModuleSelector';
import { SetPermissionsModal } from '@/app/ui/modals/SetPermissionsModal';
import ModulesGrid from './ModulesGrid';
import { moduleOptions, modules } from './module.config';

type Props = {
  register: any;
  selectedModules: string[];
  onNext?: () => void; // ✅ optional (parent doesn’t pass it)

  modulePermissions: Record<string, string[]>;
  setModulePermissions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

const ModulesSection = ({
  register,
  selectedModules,
  onNext,
  modulePermissions,
  setModulePermissions,
}: Props) => {
  const [openPermissions, setOpenPermissions] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Modules / Features</h2>

      <div className="border-t border-gray-300 mb-5" />

      <ModuleSelector modules={modules} selectedModules={selectedModules} register={register} />

      {selectedModules.length > 0 && (
        <ModulesGrid
          selectedModules={selectedModules}
          moduleOptions={moduleOptions}
          onOpenPermissions={(m: string) => {
            setActiveModule(m);
            setOpenPermissions(true);
          }}
        />
      )}

      {/* GO NEXT */}

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="px-10 py-2.5 rounded-full text-sm font-medium 
              bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] text-white"
        >
          Go Next
        </button>
      </div>

      <SetPermissionsModal
        open={openPermissions}
        moduleName={activeModule}
        existingPermissions={activeModule ? modulePermissions[activeModule] : []}
        onClose={() => {
          setOpenPermissions(false);
          setActiveModule(null);
        }}
        onConfirm={(moduleName, permissions) => {
          setModulePermissions((prev) => ({
            ...prev,
            [moduleName]: permissions,
          }));
          setOpenPermissions(false);
          setActiveModule(null);
        }}
      />
    </div>
  );
};

export default ModulesSection;
