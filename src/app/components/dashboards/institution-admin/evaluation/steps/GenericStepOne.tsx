// import { UseFormReturn } from 'react-hook-form';
// import { useQuery } from '@tanstack/react-query';

// type FieldConfig = {
//   name: string;
//   label: string;
//   type: 'text' | 'datetime' | 'select';
//   optionsKey?: string;
// };

// interface Props<TForm> {
//   form: UseFormReturn<TForm>;
//   onNext: () => void;
//   onCancel: () => void;
//   entityLabel: string;
//   fields: FieldConfig[];
//   metaQuery?: () => Promise<any>;
// }

// export default function GenericStepOne<TForm>({
//   form,
//   onNext,
//   onCancel,
//   entityLabel,
//   fields,
//   metaQuery,
// }: Props<TForm>) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = form;

//   const { data: metaData } = useQuery({
//     queryKey: ['evaluation-meta', entityLabel],
//     queryFn: metaQuery,
//     enabled: !!metaQuery,
//   });

//   return (
//     <>
//       <div className="rounded-2xl px-6 py-4 shadow">
//         <div className="mb-5 border-b border-[#8f9cb7]">
//           <h3 className="font-medium text-[#101828]">{entityLabel} Details</h3>
//           <p className="text-sm text-[#667085] mb-6">
//             Define the basic information for this {entityLabel}.
//           </p>
//         </div>

//         <div className="flex flex-col gap-6">
//           {fields.map((field) => {
//             const value = watch(field.name as any);
//             const error = (errors as any)?.[field.name];

//             if (field.type === 'text') {
//               return (
//                 <div key={field.name}>
//                   <label className="text-sm font-medium">{field.label}</label>
//                   <input
//                     {...register(field.name as any)}
//                     className="w-full border-b border-[#C3CAD9] py-2"
//                   />
//                   {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
//                 </div>
//               );
//             }

//             if (field.type === 'datetime') {
//               return (
//                 <div key={field.name}>
//                   <label className="text-sm font-medium">{field.label}</label>
//                   <input
//                     type="datetime-local"
//                     {...register(field.name as any)}
//                     className="w-full border-b border-[#C3CAD9] py-2"
//                   />
//                   {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
//                 </div>
//               );
//             }

//             if (field.type === 'select') {
//               const options = metaData?.[field.optionsKey ?? ''] ?? [];

//               return (
//                 <div key={field.name}>
//                   <label className="text-sm font-medium">{field.label}</label>

//                   <div className="flex flex-wrap gap-3 mt-2">
//                     {options.map((v: string) => (
//                       <button
//                         key={v}
//                         type="button"
//                         onClick={() =>
//                           setValue(field.name as any, v, {
//                             shouldDirty: true,
//                             shouldValidate: true,
//                           })
//                         }
//                         className={`px-4 py-1.5 rounded-full border
//                           ${value === v ? 'border-[#7C3AED] bg-[#F6F0FF]' : 'border-gray-300'}`}
//                       >
//                         {v}
//                       </button>
//                     ))}
//                   </div>

//                   {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
//                 </div>
//               );
//             }

//             return null;
//           })}
//         </div>
//       </div>

//       <div className="flex justify-center gap-3 mt-6">
//         <button
//           type="button"
//           onClick={onNext}
//           className="px-8 py-2 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500"
//         >
//           Continue
//         </button>

//         <button type="button" onClick={onCancel} className="px-8 py-2 rounded-full border">
//           Cancel
//         </button>
//       </div>
//     </>
//   );
// }
