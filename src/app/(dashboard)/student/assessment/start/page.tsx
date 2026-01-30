// 'use client';

// import { useState } from 'react';
// import AssessmentHeaders from '@/app/components/dashboards/student/assessment/assessmentHeaders';

// export default function AssessmentStartPage() {
//   const [checked, setChecked] = useState(false);

//   return (
//     <div className="min-h-screen">
//       <AssessmentHeaders />

//       {/* Main Card */}
//       <div
//         className="
//           bg-white
//           border border-gray-200
//           rounded-2xl
//           shadow-[0_6px_24px_rgba(16,24,40,0.08)]
//           p-4 sm:p-5 md:p-6
//         "
//       >
//         {/* Top Row */}
//         <div className="flex justify-between items-start flex-wrap gap-3">
//           <div className="mt-2 sm:mt-4">
//             <button className="text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900">
//               <img src="/Go-back.svg" alt="goback" />
//               Go back
//             </button>
//           </div>

//           <div className="flex flex-col items-end gap-2 sm:gap-3">
//             <div className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-lg font-medium">
//               On-Going
//             </div>

//             <p className="text-xs text-slate-500">
//               Assigned on : <span className="font-medium text-slate-500">21st June 2025</span>
//             </p>
//           </div>
//         </div>

//         {/* Title */}
//         <div className="flex flex-col mt-3">
//           <p className="text-base sm:text-lg text-slate-800 leading-[20px] font-medium">
//             Mid-Term Coding Test
//           </p>

//           <p className="flex flex-wrap items-center text-[11px] sm:text-[12px] text-slate-500 leading-[16px] mt-[2px]">
//             <span>Data Structures</span>

//             <span className="mx-2 text-[14px] sm:text-[16px] font-semibold text-slate-400">•</span>

//             <span>3rd Year</span>

//             <span className="mx-2 text-[14px] sm:text-[16px] font-semibold text-slate-400">•</span>

//             <span>Section A</span>
//           </p>
//         </div>

//         {/* ================= OVERVIEW ================= */}
//         <div
//           className="
//             bg-[#FAFBFC]
//             border border-gray-200
//             rounded-xl
//             shadow-[0_4px_16px_rgba(16,24,40,0.06)]
//             p-3 sm:p-4 md:p-5
//             mb-5
//           "
//         >
//           <h3 className="text-sm font-semibold text-gray-800">Assessment Overview</h3>

//           <div className="h-px bg-gray-200 mt-3 mb-4" />

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//             <OverviewItem label="Duration" value="120 minutes" />
//             <OverviewItem label="Assessment Type" value="MCQ + Coding" />
//             <OverviewItem label="Total Questions" value="30" />
//             <OverviewItem label="MCQ Questions" value="25" />
//             <OverviewItem label="Coding Questions" value="5" />
//             <OverviewItem label="Total Marks" value="100" />
//           </div>
//         </div>

//         {/* ================= RULES ================= */}
//         <div
//           className="
//             bg-[#FAFBFC]
//             border border-gray-200
//             rounded-xl
//             shadow-[0_4px_16px_rgba(16,24,40,0.06)]
//             p-3 sm:p-4 md:p-5
//             mb-5
//           "
//         >
//           <h3 className="text-sm font-semibold text-gray-800">Assessment Rules</h3>

//           <div className="h-px bg-gray-200 mt-3 mb-4" />

//           <ul className="space-y-3 text-sm text-gray-700">
//             <Rule text="You can attempt this assessment only once." />
//             <Rule text="The timer will start immediately after you begin." />
//             <Rule text="Do not refresh or close the browser during the assessment." />
//             <Rule text="Your responses are saved automatically." />
//             <Rule text="The assessment will be submitted automatically when time ends." />
//           </ul>
//         </div>

//         {/* ================= EVALUATION ================= */}
//         <div
//           className="
//             bg-[#FAFBFC]
//             border border-gray-200
//             rounded-xl
//             shadow-[0_4px_16px_rgba(16,24,40,0.06)]
//             p-3 sm:p-4 md:p-5
//           "
//         >
//           <h3 className="text-sm font-semibold text-gray-800">Evaluation & Results</h3>

//           <div className="h-px bg-gray-200 mt-3 mb-4" />

//           <p className="text-sm text-gray-600 mb-4">
//             MCQ answers will be evaluated automatically after submission. Coding answers will be
//             evaluated after all test cases are executed.
//           </p>

//           {/* Checkbox */}
//           <label className="flex items-start gap-2 text-sm text-gray-800 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={checked}
//               onChange={(e) => setChecked(e.target.checked)}
//               className="
//                 mt-[3px]
//                 peer relative h-4 w-4 appearance-none rounded border border-gray-300
//                 checked:border-transparent
//                 checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
//                 checked:after:content-['✔']
//                 checked:after:absolute
//                 checked:after:inset-0
//                 checked:after:flex
//                 checked:after:items-center
//                 checked:after:justify-center
//                 checked:after:text-[11px]
//                 checked:after:text-white
//               "
//             />

//             <span className="font-semibold leading-tight">
//               I have read and understood the assessment instructions
//             </span>
//           </label>

//           {/* Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               disabled={!checked}
//               className="
//                 w-full sm:w-auto
//                 rounded-full
//                 bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
//                 px-6 py-2.5
//                 text-sm font-medium
//                 text-white!
//                 hover:opacity-90
//                 transition
//               "
//             >
//               Go next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Small Components ---------- */

// function OverviewItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="border-r last:border-r-0 border-gray-200 pr-3 sm:pr-4">
//       <p className="text-[12px] sm:text-[13px] text-slate-500 mb-1">{label}</p>
//       <p className="font-semibold text-slate-800 text-[13px] sm:text-[15px]">{value}</p>
//     </div>
//   );
// }

// function Rule({ text }: { text: string }) {
//   return (
//     <li className="flex gap-2 items-start">
//       <span className="mt-1 text-gray-800">◆</span>
//       <span>{text}</span>
//     </li>
//   );
// }

'use client';

'use client';

import { useState } from 'react';
import AssessmentHeaders from '@/app/components/dashboards/student/assessment/assessmentHeaders';
import AssessmentStepModal from '@/app/ui/modals/AssessmentStepModal';

export default function AssessmentStartPage() {
  /* =========================
     CHECKBOX STATE
  ========================= */
  const [checked, setChecked] = useState(false);

  /* =========================
     MODAL OPEN STATE
  ========================= */
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen">
      <AssessmentHeaders />

      {/* ================= MAIN CARD ================= */}
      <div
        className="
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-[0_6px_24px_rgba(16,24,40,0.08)]
          p-4 sm:p-5 md:p-6
        "
      >
        {/* ================= TOP ROW ================= */}
        <div className="flex justify-between items-start flex-wrap gap-3">
          {/* Go Back */}
          <div className="mt-2 sm:mt-4">
            <button className="text-sm flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900">
              <img src="/Go-back.svg" alt="goback" />
              Go back
            </button>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-lg font-medium">
              On-Going
            </div>

            <p className="text-xs text-slate-500">
              Assigned on :<span className="font-medium text-slate-500 ml-1">21st June 2025</span>
            </p>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="flex flex-col mt-3">
          <p className="text-base sm:text-lg text-slate-800 font-medium">Mid-Term Coding Test</p>

          <p className="flex flex-wrap items-center text-[12px] text-slate-500 mt-1">
            <span>Data Structures</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>3rd Year</span>
            <span className="mx-2 text-slate-400">•</span>
            <span>Section A</span>
          </p>
        </div>

        {/* ================= OVERVIEW ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Assessment Overview</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <OverviewItem label="Duration" value="120 minutes" />
            <OverviewItem label="Assessment Type" value="MCQ + Coding" />
            <OverviewItem label="Total Questions" value="30" />
            <OverviewItem label="MCQ Questions" value="25" />
            <OverviewItem label="Coding Questions" value="5" />
            <OverviewItem label="Total Marks" value="100" />
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Assessment Rules</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <ul className="space-y-3 text-sm text-gray-700">
            <Rule text="You can attempt this assessment only once." />
            <Rule text="The timer will start immediately after you begin." />
            <Rule text="Do not refresh or close the browser during the assessment." />
            <Rule text="Your responses are saved automatically." />
            <Rule text="The assessment will be submitted automatically when time ends." />
          </ul>
        </div>

        {/* ================= EVALUATION ================= */}
        <div className="bg-[#FAFBFC] border border-gray-200 rounded-xl p-5 mt-5">
          <h3 className="text-sm font-semibold text-gray-800">Evaluation & Results</h3>

          <div className="h-px bg-gray-200 mt-3 mb-4" />

          <p className="text-sm text-gray-600 mb-4">
            MCQ answers will be evaluated automatically after submission. Coding answers will be
            evaluated after all test cases are executed.
          </p>

          {/* ================= CHECKBOX ================= */}

          <label className="flex items-start gap-2 text-sm text-gray-800 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="
                mt-[3px]
                peer relative h-4 w-4 appearance-none rounded border border-gray-300
                checked:border-transparent
                checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                checked:after:content-['✔']
                checked:after:absolute
                checked:after:inset-0
                checked:after:flex
                checked:after:items-center
                checked:after:justify-center
                checked:after:text-[11px]
                checked:after:text-white
              "
            />

            <span className="font-semibold leading-tight">
              I have read and understood the assessment instructions
            </span>
          </label>

          {/* ================= GO NEXT BUTTON ================= */}
          <div className="flex justify-center mt-6">
            <button
              disabled={!checked}
              /* ✅ OPEN MODAL WHEN CLICK */
              onClick={() => setOpenModal(true)}
              className="
                w-full sm:w-auto
                rounded-full
                bg-gradient-to-r from-[#904BFF] to-[#C053C2]
                px-6 py-2.5
                text-sm font-medium
                text-white!
                hover:opacity-90
                transition
                disabled:opacity-40
              "
            >
              Go next
            </button>
          </div>
        </div>
      </div>

      {/* ================= STEP MODAL ================= */}
      <AssessmentStepModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r last:border-r-0 border-gray-200 pr-3">
      <p className="text-[13px] text-slate-500 mb-1">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <li className="flex gap-2 items-center">
      <span className="mt-1 text-gray-800">◆</span>
      <span>{text}</span>
    </li>
  );
}
