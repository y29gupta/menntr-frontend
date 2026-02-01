'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Upload } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showApiError, showSuccess } from '@/app/ui/apiToast';

import ManagementTable from '@/app/components/dashboards/institution-admin/user-management/ManagementTable';
import ProfileForm, {
  profileSchema,
  ProfileFormValues,
} from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep1';
import UserPermission from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep2';
import UserCredentials from '@/app/components/dashboards/institution-admin/user-management/management-form/FornStep3';
import BulkUploadInterface from '@/app/components/dashboards/institution-admin/user-management/Bulkupload';
import { CategoryKey } from '@/app/constants/roleConfig';

/* ---------- TYPES ---------- */

type UserFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;

  permissions?: {
    roleHierarchy?: string;
    roleCategory?: CategoryKey;
    roleDepartment?: string;
    roleBatch?: string;
    roleId?: number;
    batchIds?: number[]; // For faculty batch assignments
    permissionIds?: number[];
    selectedModules: string[];
    userRoleAndManagement: string[];
    organizationStructure: string[];
    studentManagement: string[];
    assessmentManagement: string[];
    reportAndAnalytics: string[];
  };

  id?: number;
  status?: 'Active' | 'Inactive';
};

/* ---------- ROLE NORMALIZER ---------- */
const roleNormalize: Record<string, string> = {
  'Category admin': 'Category Admin',
  'Institution admin': 'Institution Admin',
  'Placement Officer': 'Placement Officer',
  'H.O.D': 'Department Admin (HOD)',
  Faculty: 'Faculty',
};

const Page = () => {
  const [view, setView] = useState<'list' | 'form' | 'bulk'>('list');
  const [formData, setFormData] = useState<UserFormData>({});
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [modulePermissions, setModulePermissions] = useState<Record<string, number[]>>({});

  /* ---------- FORMS ---------- */

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    },
  });

  const permissionForm = useForm<{
    roleHierarchy?: string;
    roleCategory?: string;
    roleDepartment?: string;
    roleBatch?: string;
    roleId?: number;
    batchIds?: number[];
    selectedModules: string[];
    userRoleAndManagement: string[];
    organizationStructure: string[];
    studentManagement: string[];
    assessmentManagement: string[];
    reportAndAnalytics: string[];
  }>({
    defaultValues: {
      roleHierarchy: undefined,
      roleCategory: undefined,
      roleId: undefined,
      batchIds: [],
      selectedModules: [],
      userRoleAndManagement: [],
      organizationStructure: [],
      studentManagement: [],
      assessmentManagement: [],
      reportAndAnalytics: [],
    },
  });

  const credentialsForm = useForm({
    defaultValues: {
      sendCredentials: true,
    },
  });

  /* ---------- FETCH USER FOR EDIT ---------- */
  const { data: userEditData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user-edit', formData.id],
    queryFn: async () => {
      if (!formData.id || formMode !== 'edit') return null;
      const res = await fetch(`/api/users/${formData.id}/edit`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch user data');
      return res.json();
    },
    enabled: formMode === 'edit' && !!formData.id && view === 'form',
  });

  /* ---------- PREFILL FORM DATA WHEN EDIT DATA IS LOADED ---------- */
  useEffect(() => {
    if (userEditData && formMode === 'edit') {
      const { user, role, permissions, batchIds = [] } = userEditData;

      // Prefill profile form
      profileForm.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        mobile: '', // API doesn't return mobile
      });

      // Fetch modules to map codes to IDs
      fetch('/api/institutionsadmin/modules', { credentials: 'include' })
        .then((res) => res.json())
        .then((modulesData) => {
          const modules = modulesData?.data || [];
          const moduleCodeToIdMap = new Map<string, number>();
          modules.forEach((m: any) => {
            moduleCodeToIdMap.set(m.code, m.id);
          });

          // Extract selected modules from permissions tree - ONLY modules with checked permissions
          // Build modulePermissions map and collect modules that have at least one checked permission
          const newModulePermissions: Record<string, number[]> = {};
          const modulesWithPermissions = new Set<string>();
          
          permissions.forEach((module: any) => {
            const moduleId = moduleCodeToIdMap.get(module.moduleCode);
            if (!moduleId) return;
            
            const allPermissionIds: number[] = [];
            
            module.features.forEach((feature: any) => {
              feature.permissions.forEach((perm: any) => {
                if (perm.checked) {
                  allPermissionIds.push(perm.permissionId);
                }
              });
            });
            
            // Only include module if it has at least one checked permission
            if (allPermissionIds.length > 0) {
              newModulePermissions[String(moduleId)] = allPermissionIds;
              modulesWithPermissions.add(module.moduleCode);
            }
          });
          
          // Map module codes to IDs - only for modules that have checked permissions
          const selectedModuleIds = Array.from(modulesWithPermissions)
            .map((code: string) => moduleCodeToIdMap.get(code))
            .filter((id: number | undefined): id is number => id !== undefined)
            .map((id: number) => String(id));

          // Prefill permission form with role hierarchy, role category, role ID, and batch IDs
          // First set roleHierarchy and roleCategory, then roleId will be set automatically by useEffect
          permissionForm.reset({
            roleHierarchy: role?.roleHierarchyId ? String(role.roleHierarchyId) : undefined,
            roleCategory: role?.name || undefined,
            roleId: role?.id || undefined,
            batchIds: batchIds || [],
            selectedModules: selectedModuleIds,
            userRoleAndManagement: [],
            organizationStructure: [],
            studentManagement: [],
            assessmentManagement: [],
            reportAndAnalytics: [],
          });
          
          // Manually set values to ensure they're set even if reset doesn't work
          if (role?.roleHierarchyId) {
            permissionForm.setValue('roleHierarchy', String(role.roleHierarchyId));
          }
          if (role?.name) {
            permissionForm.setValue('roleCategory', role.name);
          }
          if (role?.id) {
            permissionForm.setValue('roleId', role.id);
          }
          if (batchIds && batchIds.length > 0) {
            permissionForm.setValue('batchIds', batchIds);
          }

          // Set module permissions
          setModulePermissions(newModulePermissions);

          // Update formData
          setFormData({
            id: Number(user.id),
            status: user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            permissions: {
              roleId: role?.id,
              roleHierarchy: role?.roleHierarchyId ? String(role.roleHierarchyId) : undefined,
              roleCategory: (role?.name as CategoryKey) || undefined,
              batchIds: batchIds || [],
              selectedModules: selectedModuleIds,
              permissionIds: Object.values(newModulePermissions).flat(),
              userRoleAndManagement: [],
              organizationStructure: [],
              studentManagement: [],
              assessmentManagement: [],
              reportAndAnalytics: [],
            },
          });
        })
        .catch((error) => {
          console.error('Failed to fetch modules for mapping:', error);
        });
    }
  }, [userEditData, formMode, profileForm, permissionForm]);

  /* ---------- TANSTACK MUTATION ---------- */

  const createUserMutation = useMutation({
    mutationFn: async (payload: {
      email?: string;
      firstName?: string;
      lastName?: string;
      password: string;
      roleId?: number;
      batchIds?: number[];
      permissionIds: number[];
    }) => {
      const res = await fetch(
        `/api/institutionsadmin/create-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            payload,
          }),
        }
      );

      if (!res.ok) {
        let errorMessage = 'Failed to create user';
        try {
          const err = await res.json();
          // Backend returns { error: '...' } for 409, or { message: '...' } for other errors
          errorMessage = err.error || err.message || errorMessage;
          
          // Provide more specific error messages based on status code
          if (res.status === 409) {
            errorMessage = err.error || 'A user with this email already exists. Please use a different email address.';
          } else if (res.status === 400) {
            errorMessage = err.message || err.error || 'Invalid request. Please check your input and try again.';
          } else if (res.status === 403) {
            errorMessage = err.message || err.error || 'You do not have permission to perform this action.';
          } else if (res.status === 500) {
            errorMessage = 'Server error. Please try again later or contact support.';
          }
        } catch (parseError) {
          // If JSON parsing fails, use status-based message
          if (res.status === 409) {
            errorMessage = 'A user with this email already exists. Please use a different email address.';
          } else if (res.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        }
        throw new Error(errorMessage);
      }

      return res.json();
    },

    onSuccess: () => {
      showSuccess('User created successfully');
      setView('list');
      setStep(1);
      // Clear permissions only after successful creation
      setModulePermissions({});
      // Reset form data
      setFormData({});
      profileForm.reset();
      permissionForm.reset();
      credentialsForm.reset();
    },

    onError: (error: any) => {
      console.error('❌ CREATE USER ERROR:', error);
      // Use toast notification for better UX
      showApiError(error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (payload: {
      firstName?: string;
      lastName?: string;
      roleId?: number;
      batchIds?: number[];
      permissionIds: number[];
    }) => {
      if (!formData.id) throw new Error('User ID is required for update');
      
      const res = await fetch(`/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          payload,
        }),
      });

      if (!res.ok) {
        let errorMessage = 'Failed to update user';
        try {
          const err = await res.json();
          errorMessage = err.error || err.message || errorMessage;
          
          if (res.status === 400) {
            errorMessage = err.message || err.error || 'Invalid request. Please check your input and try again.';
          } else if (res.status === 403) {
            errorMessage = err.message || err.error || 'You do not have permission to perform this action.';
          } else if (res.status === 404) {
            errorMessage = 'User not found.';
          } else if (res.status === 500) {
            errorMessage = 'Server error. Please try again later or contact support.';
          }
        } catch (parseError) {
          if (res.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        }
        throw new Error(errorMessage);
      }

      return res.json();
    },

    onSuccess: () => {
      showSuccess('User updated successfully');
      setView('list');
      setStep(1);
      setModulePermissions({});
      setFormData({});
      profileForm.reset();
      permissionForm.reset();
      credentialsForm.reset();
    },

    onError: (error: any) => {
      console.error('❌ UPDATE USER ERROR:', error);
      showApiError(error);
    },
  });

  return (
    <div className="flex flex-col h-full min-h-0 rounded-2xl p-4 gap-4 shadow-[0_0_16px_0_#0F172A26] w-full">
      {view === 'list' && (
        <>
          <div className="w-full">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                Total User <span>(20)</span>
              </h2>

              <div className="flex gap-2">
                <label
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium text-purple-600 border border-current gap-2 cursor-pointer"
                  onClick={() => setView('bulk')}
                >
                  <Upload className="w-4 h-4 text-[#904BFF]" />
                  Bulk Upload
                </label>

                <button
                  onClick={() => {
                    setFormMode('create');
                    setFormData({});
                    setModulePermissions({});
                    setStep(1);
                    setView('form');
                  }}
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]"
                >
                  + Add User
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="relative max-w-[400px] w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for users"
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
                />
              </div>

              <button
                onClick={() => setShowColumnFilters((p) => !p)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
              >
                <Filter className="w-4 h-4" />
                {showColumnFilters ? 'Hide Filters' : 'Filter'}
              </button>
            </div>
          </div>

          <ManagementTable
            globalFilter={search}
            onGlobalFilterChange={setSearch}
            showColumnFilters={showColumnFilters}
            onEdit={(user) => {
              setFormMode('edit');
              setFormData({
                id: Number(user.id),
                status: user.status as any,
              });
              setStep(1);
              setView('form');
              // User data will be fetched via useQuery and prefilled in useEffect
            }}
          />
        </>
      )}
      {view === 'form' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          {step === 1 && (
            <FormProvider {...profileForm}>
              <ProfileForm
                mode={formMode}
                onBack={() => setView('list')}
                onNext={() => {
                  setFormData((p) => ({ ...p, ...profileForm.getValues() }));
                  setStep(2);
                }}
              />
            </FormProvider>
          )}

          {step === 2 && (
            <FormProvider {...permissionForm}>
              <UserPermission
                mode={formMode}
                onBack={() => setStep(1)}
                onNext={() => {
                  const permissionValues = permissionForm.getValues();
                  setFormData((p) => ({
                    ...p,
                    permissions: {
                      ...permissionValues,
                      roleCategory: permissionValues.roleCategory as CategoryKey | undefined,
                      permissionIds: Object.values(modulePermissions).flat(),
                    },
                  }));
                  setStep(3);
                }}
                modulePermissions={modulePermissions}
                setModulePermissions={setModulePermissions}
              />
            </FormProvider>
          )}

          {step === 3 && (
            <FormProvider {...credentialsForm}>
              <UserCredentials
                mode={formMode}
                onBack={() => setStep(2)}
                onSubmit={() => {
                  if (formMode === 'edit') {
                    // Update existing user
                    updateUserMutation.mutate({
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      roleId: formData.permissions?.roleId,
                      batchIds: formData.permissions?.batchIds ?? [],
                      permissionIds: formData.permissions?.permissionIds ?? [],
                    });
                  } else {
                    // Create new user
                    createUserMutation.mutate({
                      email: formData.email,
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      password: 'sample@123',
                      roleId: formData.permissions?.roleId,
                      batchIds: formData.permissions?.batchIds ?? [],
                      permissionIds: formData.permissions?.permissionIds ?? [],
                    });
                  }
                }}
              />
            </FormProvider>
          )}
        </div>
      )}

      {view === 'bulk' && <BulkUploadInterface onBack={() => setView('list')} />}
    </div>
  );
};

export default Page;
