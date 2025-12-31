// 'use client';
// import SuperAdminIcon from '@/app/components/icons/SuperAdminIcon';
// import Profile from '@/app/ui/Profile';
// import TopProfileBar from '@/app/ui/TopProfileBar';
// import React, { useState } from 'react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { InstitutionFormValues } from '@/app/lib/institution';
// import { createInstitution } from '@/app/lib/api/institution';
// import { fetchInstitutions, Institution, mapInstitutions } from '@/app/lib/institutions.api';
// import { Search, Filter } from 'lucide-react';
// import { Spin } from 'antd';
// import DataTable from '@/app/components/table/DataTable';
// import { institutionColumns } from '@/app/components/dashboards/super-admin/institution.columns';

// type View = 'dashboard' | 'create' | 'edit';

// const page = () => {
//   const [view, setView] = useState<View>('dashboard');
//   const [editData, setEditData] = useState<InstitutionFormValues | null>(null);
//   const [search, setSearch] = useState('');
//   const [showColumnFilters, setShowColumnFilters] = useState(false);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['institutions'],
//     queryFn: fetchInstitutions,
//   });

//   const institutions: Institution[] = data ? mapInstitutions(data.data) : [];

//   const queryClient = useQueryClient();

//   const createMutation = useMutation({
//     mutationFn: createInstitution,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['institutions'] });
//       setView('dashboard');
//     },
//     onError: (err) => {
//       console.error('Create institution failed', err);
//     },
//   });
//   const onEditInstitution = (row) => {
//     setEditData(row);
//     setView('edit');
//   };
//   return (
//     <>
//       <main className="h-screen px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col gap-6 text-[13px] sm:text-sm lg:text-base overflow-y-auto hide-scrollbar">
//         <TopProfileBar userRole="Super Admin Portal- System Admin" RoleIcon={<SuperAdminIcon />} />
//         <div
//           className="
//                   w-full
//                   rounded-3xl
//                   border border-[#DBDFE7]
//                   bg-white
//                   p-4 sm:p-6 lg:p-8

//                 "
//         >
//           <div className="flex items-center justify-between gap-4 mb-4">
//             <h2 className="hidden sm:block font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
//               All Institutions
//             </h2>

//             <button
//               // onClick={onCreateInstitution}
//               className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-4 sm:px-6 !py-2.5 sm:py-1 rounded-full flex items-center justify-center gap-2 font-medium"
//             >
//               <span>+</span> Onboard Institution
//             </button>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 type="text"
//                 placeholder="Search for Institution"
//                 className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <button
//               onClick={() => setShowColumnFilters((prev) => !prev)}
//               className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
//             >
//               <Filter className="w-4 h-4" />
//               {showColumnFilters ? 'Hide Filters' : 'Filter'}
//             </button>
//           </div>

//           {/* TanStack Table */}
//           {isLoading && (
//             <div className="flex items-center justify-center min-h-[60vh]">
//               <Spin size="large" />
//             </div>
//           )}
//           {isError && <p className="text-red-500">Failed to load institutions</p>}

//           {!isLoading && !isError && (
//             <DataTable
//               columns={institutionColumns(onEditInstitution)}
//               data={institutions}
//               globalFilter={search}
//               onGlobalFilterChange={setSearch}
//               showColumnFilters={showColumnFilters}
//             />
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default page;
import React from 'react';

const page = () => {
  return <div>manage insitution</div>;
};

export default page;
