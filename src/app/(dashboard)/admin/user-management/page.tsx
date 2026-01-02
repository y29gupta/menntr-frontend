// 'use client';

// import { useState } from 'react';
// import { Search, Filter, Upload } from 'lucide-react';
// import ManagementTable from '@/app/components/dashboards/institution-admin/user-management/ManagementTable';
// import ProfileForm from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep1';
// import UserPermission from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep2';
// import UserCredentials from '@/app/components/dashboards/institution-admin/user-management/management-form/FornStep3';
// import { CategoryKey, RoleKey } from '@/app/constants/roleConfig';

// /* ---------- TYPES ---------- */

// type UserFormData = {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   mobile?: string;

//   permissions?: {
//     roleHierarchy?: RoleKey;
//     roleCategory?: CategoryKey;
//     roleDepartment?: string;
//     roleBatch?: string;

//     selectedModules: string[];
//     userRoleAndManagement: string[];
//     organizationStructure: string[];
//     studentManagement: string[];
//     assessmentManagement: string[];
//     reportAndAnalytics: string[];
//   };

//   id?: number;
//   status?: 'Active' | 'Inactive';
// };

// /* ---------- ROLE MAP (FIXES ERROR) ---------- */
// const roleMap: Record<string, RoleKey> = {
//   'Category admin': 'categoryAdmin' as RoleKey,
//   'Institution admin': 'institutionAdmin' as RoleKey,
//   'H.O.D': 'hod' as RoleKey,
//   Faculty: 'faculty' as RoleKey,
//   'Placement Officer': 'placementOfficer' as RoleKey,
// };

// /* ---------- PAGE ---------- */

// const Page = () => {
//   const [view, setView] = useState<'list' | 'form'>('list');
//   const [formData, setFormData] = useState<UserFormData>({});
//   const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
//   const [search, setSearch] = useState('');
//   const [showColumnFilters, setShowColumnFilters] = useState(false);
//   const [step, setStep] = useState<1 | 2 | 3>(1);

//   const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     console.log('Uploaded file:', file.name, file.type);
//   };

//   return (
//     <div className="flex h-full min-h-0 flex-col rounded-2xl p-4 gap-4 shadow-[0_0_16px_0_#0F172A26] w-full">
//       {view === 'list' ? (
//         <>
//           {/* TOP BAR */}
//           <div className="w-full">
//             <div className="flex items-center justify-between gap-4 mb-4">
//               <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
//                 Total User <span>(20)</span>
//               </h2>

//               <div className="flex gap-2">
//                 <label
//                   htmlFor="bulk-upload"
//                   className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium text-purple-600 border border-current gap-2 cursor-pointer"
//                 >
//                   <Upload className="w-4 h-4 text-[#904BFF]" />
//                   Bulk Upload
//                 </label>

//                 <input
//                   id="bulk-upload"
//                   type="file"
//                   className="hidden"
//                   accept=".xlsx,.xls,.doc,.docx,.pdf"
//                   onChange={handleBulkUpload}
//                 />

//                 <button
//                   onClick={() => {
//                     setFormMode('create');
//                     setFormData({});
//                     setStep(1);
//                     setView('form');
//                   }}
//                   className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] shadow-md hover:shadow-lg transition-shadow gap-1"
//                 >
//                   <span>+</span>
//                   Add User
//                 </button>
//               </div>
//             </div>

//             {/* SEARCH */}
//             <div className="flex gap-3 mb-4">
//               <div className="relative max-w-[400px] w-full">
//                 <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   type="text"
//                   placeholder="Search for users"
//                   className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
//                 />
//               </div>

//               <button
//                 onClick={() => setShowColumnFilters((p) => !p)}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
//               >
//                 <Filter className="w-4 h-4" />
//                 {showColumnFilters ? 'Hide Filters' : 'Filter'}
//               </button>
//             </div>
//           </div>

//           {/* TABLE */}
//           <div className="flex-1 min-h-0 overflow-y-auto">
//             <ManagementTable
//               globalFilter={search}
//               onGlobalFilterChange={setSearch}
//               showColumnFilters={showColumnFilters}
//               onEdit={(user) => {
//                 const [firstName = '', lastName = ''] = user.name.split(' ');

//                 setFormMode('edit');
//                 setFormData({
//                   id: user.id,
//                   status: user.status,
//                   firstName,
//                   lastName,
//                   permissions: {
//                     // 🔥 MUST MATCH ROLE_CONFIG KEYS EXACTLY
//                     roleHierarchy: user.role.replace('admin', 'Admin') as RoleKey,

//                     // 🔥 CategoryKey already matches config
//                     roleCategory: user.Department as CategoryKey,

//                     roleDepartment: undefined,

//                     selectedModules: [],
//                     userRoleAndManagement: [],
//                     organizationStructure: [],
//                     studentManagement: [],
//                     assessmentManagement: [],
//                     reportAndAnalytics: [],
//                   },
//                 });

//                 setStep(1);
//                 setView('form');
//               }}
//             />
//           </div>
//         </>
//       ) : (
//         /* FORM */
//         <div className="flex-1 min-h-0 overflow-y-auto">
//           {step === 1 && (
//             <ProfileForm
//               mode={formMode}
//               defaultValues={{
//                 firstName: formData.firstName,
//                 lastName: formData.lastName,
//                 email: formData.email,
//                 mobile: formData.mobile,
//               }}
//               onBack={() => setView('list')}
//               onSubmit={(data) => {
//                 setFormData((prev) => ({ ...prev, ...data }));
//                 setStep(2);
//               }}
//             />
//           )}

//           {step === 2 && (
//             <UserPermission
//               mode={formMode}
//               onBack={() => setStep(1)}
//               onSubmit={(permissions: any) => {
//                 setFormData((prev) => ({ ...prev, permissions }));
//                 setStep(3);
//               }}
//             />
//           )}

//           {step === 3 && (
//             <UserCredentials
//               mode={formMode}
//               onBack={() => setStep(2)}
//               onSubmit={() => {
//                 console.log('FINAL PAYLOAD:', formData);
//                 setView('list');
//               }}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

'use client';

import { useState } from 'react';
import { Search, Filter, Upload } from 'lucide-react';
import ManagementTable from '@/app/components/dashboards/institution-admin/user-management/ManagementTable';
import ProfileForm from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep1';
import UserPermission from '@/app/components/dashboards/institution-admin/user-management/management-form/FormStep2';
import UserCredentials from '@/app/components/dashboards/institution-admin/user-management/management-form/FornStep3';
import { CategoryKey, RoleKey } from '@/app/constants/roleConfig';

/* ---------- TYPES ---------- */

type UserFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;

  permissions?: {
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
  };

  id?: number;
  status?: 'Active' | 'Inactive';
};

/* ---------- ROLE NORMALIZER (MATCHES ROLE_CONFIG KEYS EXACTLY) ---------- */
const roleNormalize: Record<string, RoleKey> = {
  'Category admin': 'Category Admin',
  'Institution admin': 'Institution Admin',
  'Placement Officer': 'Placement Officer',
  'H.O.D': 'Department Admin (HOD)',
  Faculty: 'Faculty',
};

const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  console.log('Uploaded file:', file.name, file.type);
};

const Page = () => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<UserFormData>({});
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [search, setSearch] = useState('');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl p-4 gap-4 shadow-[0_0_16px_0_#0F172A26] w-full">
      {view === 'list' ? (
        <>
          <div className="w-full">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
                Total User <span>(20)</span>
              </h2>

              <div className="flex gap-2">
                {' '}
                <label
                  htmlFor="bulk-upload"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium text-purple-600 border border-current gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#904BFF]" />
                  Bulk Upload
                </label>
                <input
                  id="bulk-upload"
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.doc,.docx,.pdf"
                  onChange={handleBulkUpload}
                />
                <button
                  onClick={() => {
                    setFormMode('create');
                    setFormData({});
                    setStep(1);
                    setView('form');
                  }}
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-medium !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] shadow-md hover:shadow-lg transition-shadow gap-1"
                >
                  <span>+</span>
                  Add User
                </button>
              </div>
            </div>

            {/* SEARCH */}
            <div className="flex gap-3 mb-4">
              <div className="relative max-w-[400px] w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search for users"
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
                />
              </div>

              <button
                onClick={() => setShowColumnFilters((p) => !p)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
              >
                <Filter className="w-4 h-4" />
                {showColumnFilters ? 'Hide Filters' : 'Filter'}
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ManagementTable
              globalFilter={search}
              onGlobalFilterChange={setSearch}
              showColumnFilters={showColumnFilters}
              onEdit={(user) => {
                const [firstName = '', lastName = ''] = user.name.split(' ');

                setFormMode('edit');
                setFormData({
                  id: user.id,
                  status: user.status,
                  firstName,
                  lastName,
                  permissions: {
                    roleHierarchy: roleNormalize[user.role],
                    roleCategory: user.Department as CategoryKey,
                    roleDepartment: undefined,

                    selectedModules: [],
                    userRoleAndManagement: [],
                    organizationStructure: [],
                    studentManagement: [],
                    assessmentManagement: [],
                    reportAndAnalytics: [],
                  },
                });

                setStep(1);
                setView('form');
              }}
            />
          </div>
        </>
      ) : (
        /* FORM */
        <div className="flex-1 min-h-0 overflow-y-auto">
          {step === 1 && (
            <ProfileForm
              mode={formMode}
              defaultValues={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobile: formData.mobile,
              }}
              onBack={() => setView('list')}
              onSubmit={(data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <UserPermission
              mode={formMode}
              defaultValues={formData.permissions}
              onBack={() => setStep(1)}
              onSubmit={(permissions) => {
                setFormData((prev) => ({ ...prev, permissions }));
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <UserCredentials
              mode={formMode}
              onBack={() => setStep(2)}
              onSubmit={() => {
                console.log('FINAL PAYLOAD:', formData);
                setView('list');
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
