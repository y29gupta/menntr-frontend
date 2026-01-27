'use client';

import { useState } from 'react';
import { Search, Filter, Upload } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

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

  const permissionForm = useForm({
    defaultValues: {
      roleId: undefined,
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

  /* ---------- TANSTACK MUTATION ---------- */

  const createUserMutation = useMutation({
    mutationFn: async (payload: {
      email?: string;
      firstName?: string;
      lastName?: string;
      password: string;
      roleId?: number;
      permissionIds: number[];
    }) => {
      const res = await fetch(
        `/institutionsadmin/create-user`,

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
        const err = await res.json();
        throw new Error(err.message || 'Failed to create user');
      }

      return res.json();
    },

    onSuccess: () => {
      alert('✅ User created successfully');
      setView('list');
      setStep(1);
      setModulePermissions({});
    },

    onError: (error: any) => {
      console.error('❌ CREATE USER ERROR:', error);
      alert(error.message || '❌ Failed to create user');
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
              const [firstName = '', lastName = ''] = user.name.split(' ');

              setFormMode('edit');
              setFormData({
                id: user.id,
                status: user.status as any,
                firstName,
                lastName,
                permissions: {
                  roleHierarchy: roleNormalize[user.role],
                  roleCategory: user.Department as CategoryKey,
                  selectedModules: [],
                  userRoleAndManagement: [],
                  organizationStructure: [],
                  studentManagement: [],
                  assessmentManagement: [],
                  reportAndAnalytics: [],
                },
              });

              profileForm.reset({ firstName, lastName });
              setStep(1);
              setView('form');
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
                  createUserMutation.mutate({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: 'sample@123',
                    roleId: formData.permissions?.roleId,
                    permissionIds: formData.permissions?.permissionIds ?? [],
                  });
                  console.log('🚀 FINAL USER PAYLOAD:', {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: 'sample@123',
                    roleId: formData.permissions?.roleId,
                    permissionIds: formData.permissions?.permissionIds ?? [],
                  });
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
