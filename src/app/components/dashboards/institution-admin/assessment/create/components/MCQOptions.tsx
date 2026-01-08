// import { Plus } from 'lucide-react';
// import { Option } from '../hooks/useMCQOptions';

// type Props = {
//   options: Option[];
//   showOptions: boolean;
//   onAddOptions: () => void;
//   onToggleCorrect: (id: string) => void;
//   onTextChange: (id: string, text: string) => void;
// };

// export default function MCQOptions({
//   options,
//   showOptions,
//   onAddOptions,
//   onToggleCorrect,
//   onTextChange,
// }: Props) {
//   return (
//     <div>
//       <div className="mb-3 flex items-center justify-between">
//         <h4 className="text-sm font-medium text-[#101828]">Add Options</h4>
//         <button
//           type="button"
//           onClick={onAddOptions}
//           className="flex py-2 px-3 rounded-full items-center gap-1 text-sm border border-[#BE83DF] !text-[#BE83DF]"
//         >
//           <Plus size={14} /> Add Options
//         </button>
//       </div>

//       {showOptions && options.length > 0 && (
//         <div className="space-y-3">
//           {options.map((opt, i) => (
//             <div key={opt.id} className="flex items-center gap-3">
//               <label className="inline-flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={opt.correct}
//                   onChange={() => onToggleCorrect(opt.id)}
//                   className="peer hidden"
//                 />
//                 <span className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500">
//                   <svg
//                     className="peer-checked:block w-4 h-4 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={3}
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M5 13l4 4L19 7" />
//                   </svg>
//                 </span>
//               </label>

//               <span className="text-sm text-[#101828]">Option {i + 1}</span>

//               <input
//                 value={opt.text}
//                 onChange={(e) => onTextChange(opt.id, e.target.value)}
//                 placeholder="Type your option here..."
//                 className="flex-1 rounded-lg border border-[#D0D5DD] px-3 py-2 text-sm"
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
