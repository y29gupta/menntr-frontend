'use client';

import { useState } from 'react';
import ModuleSelector from '../selectors/ModuleSelector';
import { SetPermissionsModal } from '@/app/ui/modals/SetPermissionsModal';
import ModulesGrid from './ModulesGrid';
import { moduleOptions, modules } from './module.config';

const ModulesSection = ({ register, selectedModules, handleSubmit, onSubmit }: any) => {
  const [openPermissions, setOpenPermissions] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [modulePermissions, setModulePermissions] = useState<Record<string, string[]>>({});

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Modules/Features</h2>
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

      <div className="m-4 flex justify-center text-white">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="px-10 py-2.5 rounded-full text-sm font-medium 
            bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
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
