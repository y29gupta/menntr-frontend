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
import { fetchModules, Module } from '@/app/lib/api/fetchModules';

export interface FormData {
  roleHierarchy?: string;
  roleCategory?: string;
  roleDepartment?: string;
  roleBatch?: string;
  roleId?: number;
  selectedModules: string[];
  userRoleAndManagement: string[];
  organizationStructure: string[];
  studentManagement: string[];
  assessmentManagement: string[];
  reportAndAnalytics: string[];
}

type RoleCategory = {
  id: number;
  name: string;
};

type Props = {
  mode: 'create' | 'edit';
  onBack: () => void;
  onNext: () => void;
  modulePermissions: Record<string, number[]>;
  setModulePermissions: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
};

const UserPermission = ({
  mode,
  onBack,
  onNext,
  modulePermissions,
  setModulePermissions,
}: Props) => {
  const { register, watch, handleSubmit, setValue } = useFormContext<FormData>();

  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [roleMeta, setRoleMeta] = useState<{
    roleHierarchyId: number;
    roleType: string;
    categories: RoleCategory[];
    roles: Array<{ id: number; name: string }>;
  } | null>(null);

  const selectedRole = watch('roleHierarchy');

  const selectedCategory = watch('roleCategory');
  const selectedModules = watch('selectedModules') ?? [];

  const roleRules = roleMeta
    ? {
        showCategories: roleMeta.categories.length > 0,
        showDepartment: roleMeta.roleType.includes('Department'),
        showBatch: roleMeta.roleType === 'Student',
      }
    : null;

  const departmentOptions =
    ROLE_CONFIG.categories[selectedCategory as keyof typeof ROLE_CONFIG.categories]?.map((d) => ({
      label: d,
      value: d,
    })) ?? [];

  const batchOptions = ROLE_CONFIG.batches.map((b) => ({
    label: b,
    value: b,
  }));

  /* ---------------- FETCH MODULES ---------------- */
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

  /* ---------------- ROLE SELECT ---------------- */
  const handleRoleSelect = async (roleHierarchyId: number) => {
    // Reset stale values
    setValue('roleCategory', undefined);
    setValue('roleId', undefined);
    setRoleMeta(null);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/institutionsadmin/role-hierarchy/roles/${roleHierarchyId}`
    );

    const json = await res.json();
    const rawRoles: Array<{ id: number; name: string }> = json.data.roles;

    setRoleMeta({
      roleHierarchyId,
      roleType: rawRoles[0]?.name ?? '',
      categories: rawRoles.map((r) => ({
        id: r.id,
        name: r.name,
      })),
      roles: rawRoles,
    });
  };

  /* ---------------- ROLE ID SYNC ---------------- */
  useEffect(() => {
    if (!roleMeta || !selectedCategory) return;

    const matchedRole = roleMeta.roles.find((r) => r.name === selectedCategory);

    if (matchedRole) {
      setValue('roleId', matchedRole.id);
    }
  }, [selectedCategory, roleMeta, setValue]);

  /* ---------------- ROUTE UPDATE ---------------- */
  useEffect(() => {
    if (!roleMeta?.roleHierarchyId) return;

    router.push(`/admin/user-management?roleHierarchyId=${roleMeta.roleHierarchyId}`, {
      scroll: false,
    });
  }, [roleMeta?.roleHierarchyId, router]);

  return (
    <form onSubmit={handleSubmit(() => onNext())} className="w-full flex flex-col gap-4">
      <FormHeader
        title={mode === 'edit' ? 'Edit User' : 'Add User'}
        onBack={() => {
          onBack();
          router.push('/admin/user-management');
        }}
      />

      {/* ---------------- ROLE & SCOPE ---------------- */}
      <div className="bg-white border-2 border-gray-200 rounded-[24px] shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">Select Role & Scope</h2>
        <div className="w-full h-px bg-gray-200 mb-6" />

        <RoleSelector
          selectedRole={selectedRole}
          register={register}
          onRoleSelect={handleRoleSelect}
        />

        {roleMeta && roleMeta.categories.length > 0 && (
          <CategorySelector
            selectedCategory={selectedCategory}
            register={register}
            categories={roleMeta.categories}
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

      {/* ---------------- MODULES ---------------- */}
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
