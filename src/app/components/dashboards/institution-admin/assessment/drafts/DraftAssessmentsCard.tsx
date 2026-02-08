// import { Pencil, Trash2 } from 'lucide-react';
// import clsx from 'clsx';

// const DraftAssessmentCard = ({ assessment }: any) => {
//   const { name, batch, publishDate, expiryDate, type, lastEdited } = assessment;

//   return (
//     <div
//       className="
//         bg-white
//         rounded-2xl
//         border border-[#EAEAF0]
//         shadow-[0px_4px_20px_rgba(0,0,0,0.04)]
//         p-5
//       "
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-[16px] font-semibold text-[#1A1A1A]">{name}</h3>

//           <div className="mt-1 text-[13px] text-[#6B7280]">{batch}</div>
//         </div>

//         <span
//           className={clsx(
//             'text-[12px] px-3 py-1 rounded-full font-medium',
//             type === 'Aptitude' && 'bg-[#ECFCCB] text-[#3F6212]',
//             type === 'Domain' && 'bg-[#E0F2FE] text-[#075985]'
//           )}
//         >
//           {type}
//         </span>
//       </div>

//       {/* Dates */}
//       <div className="mt-3 flex justify-between items-center text-[13px] text-[#6B7280]">
//         <div>
//           <span className="italic">Pub :</span> {publishDate} &nbsp;|&nbsp;
//           <span className="italic">Exp :</span> {expiryDate}
//         </div>

//         <div>Last Edited : {lastEdited}</div>
//       </div>

//       <div className="my-4 border-t border-[#EAEAF0]" />

//       {/* Footer */}
//       <div className="flex justify-between items-center">
//         <button
//           className="
//             px-4 py-2
//             rounded-full
//             border border-[#7C3AED]
//             text-[#7C3AED]
//             text-[14px]
//             font-medium
//           "
//         >
//           Publish Assessment
//         </button>

//         <div
//           className="
//             flex items-center
//             bg-[#F3F4F6]
//             rounded-lg
//             overflow-hidden
//           "
//         >
//           <button className="p-2">
//             <Pencil size={16} />
//           </button>

//           <div className="w-px h-5 bg-[#D1D5DB]" />

//           <button className="p-2">
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DraftAssessmentCard;
