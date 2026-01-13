'use client';

import FormHeader from './FormHeader';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROLE_CONFIG } from '@/app/constants/roleConfig';
import RoleSelector from './selectors/RoleSelector';
import CategorySelector from './selectors/CategorySelector';
import ScopeSelectors from './selectors/ScopeSelectors';
import ModulesSection from './module/ModulesSection';
import ModuleSelector from './selectors/ModuleSelector';
import { fetchModules, Module } from '@/app/lib/api/fetchModules';

type CategoryKey = keyof typeof ROLE_CONFIG.categories;

export interface FormData {
  roleHierarchy?: string;
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

type Props = {
  mode: 'create' | 'edit';
  onBack: () => void;
  onNext: () => void;
};

const UserPermission = ({ mode, onBack, onNext }: Props) => {
  const { register, watch, handleSubmit, setValue } = useFormContext<FormData>();

  const router = useRouter();
  const [modulePermissions, setModulePermissions] = useState<Record<string, string[]>>({});
  const [modules, setModules] = useState<Module[]>([]); // Add this
  const [roleMeta, setRoleMeta] = useState<{
    roleHierarchyId: number;
    roleType: string;
    categories: string[];
  } | null>(null);

  const selectedRole = watch('roleHierarchy');
  const selectedCategory = watch('roleCategory');
  const selectedModules = watch('selectedModules') ?? [];

  const roleRules = roleMeta
    ? {
        showCategories: roleMeta.roleType.includes('Category'),
        showDepartment: roleMeta.roleType.includes('Department'),
        showBatch: roleMeta.roleType === 'Student',
      }
    : null;

  const departmentOptions =
    ROLE_CONFIG.categories[selectedCategory as CategoryKey]?.map((d) => ({
      label: d,
      value: d,
    })) ?? [];

  const batchOptions = ROLE_CONFIG.batches.map((b) => ({
    label: b,
    value: b,
  }));

  // Fetch modules on mount
  useEffect(() => {
    const loadModules = async () => {
      try {
        const response = await fetchModules();
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    loadModules();
  }, []);

  const handleRoleSelect = async (roleHierarchyId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/institutionsadmin/role-hierarchy/roles/${roleHierarchyId}`
    );

    const json = await res.json();

    const mappedRoles = json.data.roles.map((role: string) => {
      const [roleType, category] = role.split(' - ').map((v) => v.trim());
      return { roleType, category };
    });

    setRoleMeta({
      roleHierarchyId,
      roleType: mappedRoles[0].roleType,
      categories: mappedRoles.map((r: any) => r.category),
    });
  };

  useEffect(() => {
    if (!roleMeta?.roleHierarchyId) return;

    router.push(`/admin/user-management?roleHierarchyId=${roleMeta.roleHierarchyId}`, {
      scroll: false,
    });
  }, [roleMeta?.roleHierarchyId, router]);

  const categories = roleMeta?.categories?.filter(Boolean) ?? [];

  return (
    <form onSubmit={handleSubmit(() => onNext())} className="w-full flex flex-col gap-4">
      <FormHeader
        title={mode === 'edit' ? 'Edit User' : 'Add User'}
        onBack={() => {
          onBack();
          router.push('/admin/user-management');
        }}
      />

      {/* Select Role & Scope Card */}
      <div className="bg-white border-2 border-gray-200 rounded-[24px] shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">Select Role & Scope</h2>
        <div className="w-full h-px bg-gray-200 mb-6" />

        <RoleSelector
          selectedRole={selectedRole}
          register={register}
          onRoleSelect={handleRoleSelect}
        />

        {categories.length > 0 && (
          <CategorySelector
            selectedCategory={selectedCategory}
            register={register}
            categories={categories}
          />
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

      {/* Select Modules/Features Card */}
      <ModulesSection
        register={register}
        selectedModules={selectedModules}
        modulePermissions={modulePermissions}
        setModulePermissions={setModulePermissions}
        onNext={onNext}
      />
    </form>
  );
};

export default UserPermission;
