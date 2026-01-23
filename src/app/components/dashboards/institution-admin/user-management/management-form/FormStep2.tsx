'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import FormHeader from './FormHeader';
import RoleSelector from './selectors/RoleSelector';
import CategorySelector from './selectors/CategorySelector';
import ScopeSelectors from './selectors/ScopeSelectors';
import ModulesSection from './module/ModulesSection';
import { ROLE_CONFIG } from '@/app/constants/roleConfig';
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

type Role = { id: number; name: string };

type Props = {
  mode: 'create' | 'edit';
  onBack: () => void;
  onNext: () => void;
  modulePermissions: Record<string, number[]>;
  setModulePermissions: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
};

/* ---------------- FETCH ROLES BY HIERARCHY ---------------- */
const fetchRolesByHierarchy = async (hierarchyId: number) => {
  const res = await fetch(`/api/institutionsadmin/role-hierarchy/roles/${hierarchyId}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch roles');

  return res.json();
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

  /* ---------------- WATCHERS ---------------- */
  const roleHierarchy = watch('roleHierarchy');
  const selectedCategory = watch('roleCategory');
  const selectedModules = watch('selectedModules') ?? [];
  const roleId = watch('roleId'); // ✅ THIS IS CORRECT

  const [roleHierarchyId, setRoleHierarchyId] = useState<number | null>(null);

  /* ---------------- MODULES ---------------- */
  const { data: modulesData } = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
    staleTime: 5 * 60 * 1000,
  });

  const modules: Module[] = modulesData?.data ?? [];

  /* ---------------- ROLES ---------------- */
  const { data: rolesResponse } = useQuery({
    enabled: !!roleHierarchyId,
    queryKey: ['roles-by-hierarchy', roleHierarchyId],
    queryFn: () => fetchRolesByHierarchy(roleHierarchyId!),
  });

  const roles: Role[] = rolesResponse?.data?.roles ?? [];

  /* ---------------- ROLE → ROLE ID ---------------- */
  useEffect(() => {
    if (!selectedCategory || !roles.length) return;

    const matched = roles.find((r) => r.name === selectedCategory);
    if (matched) {
      setValue('roleId', matched.id);
    }
  }, [selectedCategory, roles, setValue]);

  /* ---------------- ROUTE UPDATE ---------------- */
  useEffect(() => {
    if (!roleHierarchyId) return;

    router.push(`/admin/user-management?roleHierarchyId=${roleHierarchyId}`, { scroll: false });
  }, [roleHierarchyId, router]);

  const roleRules = roles.length
    ? {
        showCategories: true,
        showDepartment: roles[0].name.includes('Department'),
        showBatch: roles[0].name === 'Student',
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

  return (
    <form onSubmit={handleSubmit(() => onNext())} className="w-full flex flex-col gap-4">
      <FormHeader
        title={mode === 'edit' ? 'Edit User' : 'Add User'}
        onBack={() => {
          onBack();
          router.push('/admin/user-management');
        }}
      />

      {/* ---------------- ROLE ---------------- */}
      <div className="bg-white border-2 border-gray-200 rounded-[24px] p-8">
        <RoleSelector
          selectedRole={roleHierarchy}
          register={register}
          onRoleSelect={(id) => {
            setValue('roleCategory', undefined);
            setValue('roleId', undefined);
            setRoleHierarchyId(id);
          }}
          allRoles={roles}
        />

        {roles.length > 0 && (
          <CategorySelector
            selectedCategory={selectedCategory}
            register={register}
            categories={roles}
          />
        )}

        {/* <ScopeSelectors
          roleRules={roleRules}
          selectedCategory={selectedCategory}
          watch={watch}
          setValue={setValue}
          departmentOptions={departmentOptions}
          batchOptions={batchOptions}
        /> */}
      </div>

      {/* ---------------- MODULES ---------------- */}
      <ModulesSection
        register={register}
        selectedModules={selectedModules}
        modulePermissions={modulePermissions}
        setModulePermissions={setModulePermissions}
        onNext={onNext}
        roleId={roleId} // ✅ SENT TO PERMISSIONS API
      />
    </form>
  );
};

export default UserPermission;
