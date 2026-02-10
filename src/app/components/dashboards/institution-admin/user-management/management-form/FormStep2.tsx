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
  batchIds?: number[]; // For faculty batch assignments
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
  modulePermissions: Record<string, string[]>;
  setModulePermissions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

/* ---------------- FETCH ROLES BY HIERARCHY ---------------- */
const fetchRolesByHierarchy = async (hierarchyId: number) => {
  const res = await fetch(`/api/institutionsadmin/role-hierarchy/roles/${hierarchyId}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch roles');

  return res.json();
};

/* ---------------- FETCH BATCHES FOR FACULTY ---------------- */
const fetchBatchesForFaculty = async () => {
  const res = await fetch(`/api/user-management/batches-for-faculty`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch batches');

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
  const batchIds = watch('batchIds') ?? [];

  const [roleHierarchyId, setRoleHierarchyId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ roleId?: string; batchIds?: string }>({});
  const isFacultyRole = roleHierarchyId === 4; // Faculty is level 4

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

  /* ---------------- BATCHES FOR FACULTY ---------------- */
  const { data: batchesData } = useQuery({
    enabled: isFacultyRole,
    queryKey: ['batches-for-faculty'],
    queryFn: fetchBatchesForFaculty,
    staleTime: 5 * 60 * 1000,
  });

  const batchesByDepartment = batchesData?.departments ?? [];

  /* ---------------- ROLE HIERARCHY → ROLE HIERARCHY ID ---------------- */
  useEffect(() => {
    if (roleHierarchy) {
      const hierarchyId = typeof roleHierarchy === 'string' ? parseInt(roleHierarchy, 10) : roleHierarchy;
      if (!isNaN(hierarchyId)) {
        setRoleHierarchyId(hierarchyId);
      }
    }
  }, [roleHierarchy]);

  /* ---------------- ROLE → ROLE ID ---------------- */
  useEffect(() => {
    if (!selectedCategory || !roles.length) return;

    const matched = roles.find((r) => r.name === selectedCategory);
    if (matched) {
      setValue('roleId', matched.id);
      // Clear role error when role is selected
      if (errors.roleId) {
        setErrors((prev) => ({ ...prev, roleId: undefined }));
      }
    }
  }, [selectedCategory, roles, setValue, errors]);

  // Clear batch error when batches are selected
  useEffect(() => {
    if (batchIds && batchIds.length > 0 && errors.batchIds) {
      setErrors((prev) => ({ ...prev, batchIds: undefined }));
    }
  }, [batchIds, errors]);

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

  // Validation function
  const validateForm = () => {
    const newErrors: { roleId?: string; batchIds?: string } = {};

    if (!roleId) {
      newErrors.roleId = 'Assign Role is required';
    }

    if (isFacultyRole && (!batchIds || batchIds.length === 0)) {
      newErrors.batchIds = 'At least one batch must be assigned for Faculty role';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) {
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full flex flex-col gap-4">
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
          <>
            <CategorySelector
              selectedCategory={selectedCategory}
              register={register}
              categories={roles}
            />
            {errors.roleId && (
              <p className="text-xs text-red-500 mt-2">{errors.roleId}</p>
            )}
          </>
        )}

        {/* Batches dropdown for Faculty role */}
        {isFacultyRole && batchesByDepartment.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              Assign Batches <span className="text-red-500">*</span>
            </h4>
            <div className="space-y-4">
              {batchesByDepartment.map((dept: any) => (
                <div key={dept.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-800">{dept.name}</span>
                    {dept.category && (
                      <span className="ml-2 text-xs text-gray-500">({dept.category.name})</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dept.batches.map((batch: any) => {
                      const isSelected = batchIds.includes(batch.id);
                      return (
                        <label
                          key={batch.id}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm
                            ${
                              isSelected
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-green-300'
                            }`}
                        >
                          <input
                            type="checkbox"
                            value={batch.id}
                            checked={isSelected}
                            onChange={(e) => {
                              const currentIds = batchIds || [];
                              if (e.target.checked) {
                                setValue('batchIds', [...currentIds, batch.id]);
                              } else {
                                setValue(
                                  'batchIds',
                                  currentIds.filter((id: number) => id !== batch.id)
                                );
                              }
                            }}
                            className="sr-only"
                          />
                          {isSelected && <span>✓</span>}
                          {batch.name} {batch.academic_year ? `(${batch.academic_year})` : ''}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {errors.batchIds && (
              <p className="text-xs text-red-500 mt-2">{errors.batchIds}</p>
            )}
          </div>
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
        roleId={roleId}
      />
    </form>
  );
};

export default UserPermission;
