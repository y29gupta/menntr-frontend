'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ModuleSelector from '../selectors/ModuleSelector';
import { SetPermissionsModal } from '@/app/ui/modals/SetPermissionsModal';
import ModulesGrid from './ModulesGrid';
import { fetchModules } from '@/app/lib/api/fetchModules';
import type { Module } from '@/app/lib/api/fetchModules';

type Props = {
  register: any;
  selectedModules: string[];
  onNext?: () => void;
  modulePermissions: Record<string, number[]>;
  setModulePermissions: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
};

const ModulesSection = ({
  register,
  selectedModules,
  onNext,
  modulePermissions,
  setModulePermissions,
}: Props) => {
  const [openPermissions, setOpenPermissions] = useState(false);
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
    staleTime: 5 * 60 * 1000,
  });

  const modules: Module[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center py-12 text-gray-500">Loading modules…</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="text-red-500">
            Error: {error instanceof Error ? error.message : 'Failed to load modules'}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-[24px] shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Modules / Features</h2>

      <div className="border-t border-gray-300 mb-5" />

      <ModuleSelector modules={modules} selectedModules={selectedModules} register={register} />

      {selectedModules.length > 0 && (
        <ModulesGrid
          selectedModules={selectedModules}
          modules={modules}
          onOpenPermissions={(m: Module) => {
            setActiveModule(m);
            setOpenPermissions(true);
          }}
        />
      )}

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
        moduleId={activeModule?.id ?? null}
        moduleName={activeModule?.name ?? null}
        existingPermissions={activeModule ? (modulePermissions[String(activeModule.id)] ?? []) : []}
        onClose={() => {
          setOpenPermissions(false);
          setActiveModule(null);
        }}
        onConfirm={(moduleName, permissions) => {
          if (!activeModule) return;

          setModulePermissions((prev) => ({
            ...prev,
            [String(activeModule.id)]: permissions, // number[]
          }));

          setOpenPermissions(false);
          setActiveModule(null);
        }}
      />
    </div>
  );
};

export default ModulesSection;
