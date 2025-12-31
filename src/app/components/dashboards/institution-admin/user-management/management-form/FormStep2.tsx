'use client';

import FormDropdown from '@/app/ui/FormDropdown';
import FormHeader from './FormHeader';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ROLE_CONFIG } from '@/app/constants/roleConfig';
import RoleSelector from './selectors/RoleSelector';
import CategorySelector from './selectors/CategorySelector';
import ScopeSelectors from './selectors/ScopeSelectors';
import ModuleSelector from './selectors/ModuleSelector';
import { SetPermissionsModal } from '@/app/ui/modals/SetPermissionsModal';

/* ---------------- TYPES ---------------- */

type RoleKey = keyof typeof ROLE_CONFIG.hierarchy;
type CategoryKey = keyof typeof ROLE_CONFIG.categories;

type ModuleKey =
  | 'userRoleAndManagement'
  | 'organizationStructure'
  | 'studentManagement'
  | 'assessmentManagement'
  | 'reportAndAnalytics';

interface FormData {
  roleHierarchy?: RoleKey;
  roleCategory?: CategoryKey;
  roleDepartment?: string;
  roleBatch?: string;

  selectedModules: string[];
  userRoleAndManagement: string[];
  organizationStructure: string[];
  studentManagement: string[];
  assessmentManagement: string[];
  reportAndAnalytics: string[];
}

/* ---------------- COMPONENT ---------------- */

const UserPermission = ({ mode, onBack, onSubmit }: any) => {
  const { register, watch, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      roleHierarchy: undefined,
      roleCategory: undefined,
      roleDepartment: undefined,
      roleBatch: undefined,

      selectedModules: [],
      userRoleAndManagement: [],
      organizationStructure: [],
      studentManagement: [],
      assessmentManagement: [],
      reportAndAnalytics: [],
    },
  });

  const values = watch();
  const selectedRole = values.roleHierarchy;
  const selectedCategory = values.roleCategory;

  const roleRules = selectedRole ? ROLE_CONFIG.hierarchy[selectedRole] : null;

  const [openPermissions, setOpenPermissions] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  /* -------- AUTO CLEAR DEPENDENT FIELDS -------- */
  useEffect(() => {
    if (!roleRules?.showCategories) setValue('roleCategory', undefined);
    if (!roleRules?.showDepartment) setValue('roleDepartment', undefined);
    if (!roleRules?.showBatch) setValue('roleBatch', undefined);
  }, [selectedRole, roleRules, setValue]);

  useEffect(() => {
    setValue('roleDepartment', undefined);
  }, [selectedCategory, setValue]);

  /* ---------------- MODULES ---------------- */

  const modules = [
    'User role and management',
    'Organization structure',
    'Student management',
    'Assessment management',
    'Report and analytics',
  ];

  const moduleOptions: Record<string, string[]> = {
    'User role and management': ['All', 'Role & User Management', 'Advanced Permission Control'],
    'Organization structure': [
      'All',
      'Institution/Organization',
      'Org Chart & Visualization',
      'Faculty Management',
    ],
    'Student management': [
      'All',
      'Student Data Management',
      'Advanced Student Tracking',
      'Student Analytics (Advanced)',
      'Alumni tracking',
    ],
    'Assessment management': [
      'All',
      'CO-PO Assessments',
      "Revised Bloom's Types",
      'Coding Challenges (Advanced, multi-language)',
      'AI Theory Question (Advanced)',
      'AI Practice Sets (CO-PO based+scenario/use+NFL)',
      'AI Proctoring',
      'Token assessments',
    ],
    'Report and analytics': [
      'All',
      'Status Reports',
      'Department Analytics',
      'Dashboard (Advanced)',
      'Advanced Analytics (Custom reports, scheduled)',
    ],
  };

  const getModuleKey = (moduleName: string): ModuleKey => {
    const keyMap: Record<string, ModuleKey> = {
      'User role and management': 'userRoleAndManagement',
      'Organization structure': 'organizationStructure',
      'Student management': 'studentManagement',
      'Assessment management': 'assessmentManagement',
      'Report and analytics': 'reportAndAnalytics',
    };
    return keyMap[moduleName];
  };

  const selectedModules = values.selectedModules ?? [];

  const departmentOptions = selectedCategory
    ? ROLE_CONFIG.categories[selectedCategory].map((dept) => ({
        label: dept,
        value: dept,
      }))
    : [];

  const batchOptions = ROLE_CONFIG.batches.map((b) => ({
    label: b,
    value: b,
  }));

  return (
    <div className="w-full flex flex-col gap-4">
      <FormHeader onBack={onBack} title={mode === 'edit' ? 'Edit User' : 'Add User'} />

      {/* ROLE & SCOPE */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Role & Scope</h2>
        <div className="border-t border-gray-300 mb-5" />

        <RoleSelector selectedRole={selectedRole} register={register} />

        {roleRules?.showCategories && (
          <CategorySelector selectedCategory={selectedCategory} register={register} />
        )}

        <ScopeSelectors
          roleRules={roleRules}
          selectedCategory={selectedCategory}
          watch={watch}
          setValue={setValue}
          departmentOptions={departmentOptions}
          batchOptions={batchOptions}
        />
      </div>

      {/* MODULES */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Select Modules/Features</h2>
        <div className="border-t border-gray-300 mb-5" />

        <ModuleSelector modules={modules} selectedModules={selectedModules} register={register} />

        {selectedModules.length > 0 && (
          <div
            className="grid gap-4 w-full max-w-7xl"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          >
            {selectedModules.map((m) => (
              <div
                key={m}
                className="bg-white border-2 border-purple-300 rounded-3xl p-6 shadow-sm flex flex-col"
              >
                <header className="font-semibold text-gray-700 text-base pb-4 border-b border-gray-200">
                  {m}
                </header>

                <div className="space-y-4 mt-4 flex-grow">
                  {moduleOptions[m].map((opt, index) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={index === 0}
                        className="w-5 h-5 rounded border-2 border-gray-300 shrink-0"
                      />
                      <span className={index === 0 ? 'text-gray-700 font-medium' : 'text-gray-600'}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>

                <footer className="pt-4 mt-4 border-t border-gray-200 text-[#7B3AEC]">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule(m);
                      setOpenPermissions(true);
                    }}
                    className="w-full font-semibold text-base hover:text-purple-700"
                  >
                    Set Permissions
                  </button>
                </footer>
              </div>
            ))}
          </div>
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
      </div>

      <SetPermissionsModal
        open={openPermissions}
        moduleName={activeModule}
        onClose={() => setOpenPermissions(false)}
      />
    </div>
  );
};

export default UserPermission;
