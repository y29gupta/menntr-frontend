// 'use client';

// import React, { useState } from 'react';
// import { Search, Settings, Filter } from 'lucide-react';

// export default function InstitutionsDashboard() {
//   const [institutions] = useState([
//     {
//       id: 1,
//       name: 'ABC Engineering College',
//       code: 'ABC-ENG-001',
//       plan: 'Premium',
//       students: '1200 / 2000',
//       status: 'Active',
//     },
//     {
//       id: 2,
//       name: 'XYZ Agriculture University',
//       code: 'XYZ-AGR-002',
//       plan: 'Basic',
//       students: '567 / 1000',
//       status: 'Active',
//     },
//     {
//       id: 3,
//       name: 'PQR Business School',
//       code: 'PQR-BUS-003',
//       plan: 'Premium',
//       students: '890 / 3000',
//       status: 'Active',
//     },
//   ]);

//   const getPlanColor = (plan: string) => (plan === 'Premium' ? 'bg-[#C89A2A]' : 'bg-[#E8F0FF]');

//   return (
//     <div className="flex flex-col gap-4 w-full overflow-x-hidden">
//       {/* ================= Header ================= */}
//       <div className="flex items-center justify-between gap-4">
//         <h1 className="font-semibold text-[#0F172A] text-base sm:text-lg">All Institutions</h1>

//         <button className="whitespace-nowrap text-xs sm:text-sm !text-white bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 font-medium">
//           <span className="text-lg">+</span> Onboard Institution
//         </button>
//       </div>

//       {/* ================= Search & Filter ================= */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search for Institution"
//             className="
//               w-full
//               pl-9 pr-4 py-2
//               border border-gray-300
//               rounded-lg
//               text-xs sm:text-sm
//               focus:outline-none focus:ring-2 focus:ring-purple-500
//             "
//           />
//         </div>

//         <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50">
//           <Filter className="w-4 h-4" />
//           Filter
//         </button>
//       </div>

//       {/* ================= TABLE (ONLY THIS SCROLLS) ================= */}
//       <div className="relative w-full overflow-x-auto">
//         <table className="min-w-[900px] w-full border border-gray-200 rounded-lg text-xs sm:text-sm">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-3 text-left font-semibold text-gray-900">Institution</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-900">Plan</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-900">Students</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
//               <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {institutions.map((institution, index) => (
//               <tr
//                 key={institution.id}
//                 className={index !== institutions.length - 1 ? 'border-b border-gray-200' : ''}
//               >
//                 {/* Institution */}
//                 <td className="px-4 py-3">
//                   <div className="max-w-[260px]">
//                     <p className="font-medium text-gray-900 truncate" title={institution.name}>
//                       {institution.name}
//                     </p>
//                     <p className="text-[11px] sm:text-xs text-gray-500 truncate">
//                       {institution.code}
//                     </p>
//                   </div>
//                 </td>

//                 {/* Plan */}
//                 <td className="px-4 py-3">
//                   <span
//                     className={`${getPlanColor(
//                       institution.plan
//                     )} px-3 py-1 rounded text-[11px] sm:text-xs font-medium inline-block`}
//                   >
//                     {institution.plan}
//                   </span>
//                 </td>

//                 {/* Students */}
//                 <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
//                   {institution.students}
//                 </td>

//                 {/* Status */}
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-2 whitespace-nowrap">
//                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                     <span className="text-gray-900">{institution.status}</span>
//                   </div>
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-3 text-[#3B82F6]">
//                   <button className="flex items-center gap-2 font-medium whitespace-nowrap">
//                     <Settings className="w-4 h-4" />
//                     Configure
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
