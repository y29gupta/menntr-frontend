'use client';

import FormHeader from './FormHeader';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROLE_CONFIG } from '@/app/constants/roleConfig';
import RoleSelector from './selectors/RoleSelector';
import CategorySelector from './selectors/CategorySelector';
import ScopeSelectors from './selectors/ScopeSelectors';
import ModulesSection from './module/ModulesSection';

type CategoryKey = keyof typeof ROLE_CONFIG.categories;

interface FormData {
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
  onFormSubmit: (data: FormData) => void;
  defaultValues?: FormData;
  onNext: () => void;
};

const UserPermission = ({ mode, onBack, onFormSubmit, defaultValues, onNext }: Props) => {
  const router = useRouter();

  const [modulePermissions, setModulePermissions] = useState<Record<string, string[]>>({});
  const [roleMeta, setRoleMeta] = useState<{
    roleHierarchyId: number;
    roleType: string;
    categories: string[];
  } | null>(null);

  const { register, watch, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: defaultValues ?? {
      selectedModules: [],
      userRoleAndManagement: [],
      organizationStructure: [],
      studentManagement: [],
      assessmentManagement: [],
      reportAndAnalytics: [],
    },
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      reset(defaultValues);
    }
  }, [mode, defaultValues, reset]);

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
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full flex flex-col gap-4">
      <FormHeader
        title={mode === 'edit' ? 'Edit User' : 'Add User'}
        onBack={() => {
          onBack();
          router.push('/admin/user-management');
        }}
      />

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">Select Role & Scope</h2>

        <RoleSelector
          selectedRole={selectedRole}
          register={register}
          onRoleSelect={handleRoleSelect}
        />

        {categories && categories.length > 0 && (
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
