// type Props = {
//   question: {
//     id: number;
//     question: string;
//     options: string[];
//     correctOption: number;
//   };
//   questionIndex: number;
//   setQuestionStatus: React.Dispatch<any>;
// };

// export default function McqQuestion({ question, questionIndex, setQuestionStatus }: Props) {
//   return (

//     <div>

//       <h2 className="font-medium text-[#1A2C50] mb-4">{question.question}</h2>

//       <div className="space-y-3">
//         {question.options.map((opt, idx) => (
//           <label key={idx} className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name={`q-${question.id}`}
//               onChange={() =>
//                 setQuestionStatus((prev: any) => ({
//                   ...prev,
//                   [questionIndex]: {
//                     ...prev[questionIndex],
//                     attempted: true,
//                   },
//                 }))
//               }
//             />
//             {opt}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }
type Props = {
  question: any;
  selectedOptions: number[];
  onSelectOption: (ids: number[]) => void;
};

export default function McqQuestion({ question, selectedOptions, onSelectOption }: Props) {
  return (
    <div className="space-y-3">
      {question.options.map((opt: any, idx: any) => (
        <label
          key={idx}
          className={`flex items-center gap-3 cursor-pointer ${
            selectedOptions.includes(Number(opt.id)) ? 'text-[#7939E8]' : 'text-[#6C768A]'
          }`}
        >
          <input
            type="radio"
            name={`q-${question.question_id}`}
            className="h-4 w-4 accent-purple-600"
            // onChange={() =>
            //   setQuestionStatus((prev: any) => ({
            //     ...prev,
            //     [questionIndex]: {
            //       ...prev[questionIndex],
            //       attempted: true,
            //     },
            //   }))
            // }
            checked={selectedOptions.includes(Number(opt.id))}
            onChange={() => onSelectOption([Number(opt.id)])}
          />
          <span className="text-sm font-semibold text-[16px] ">
            {' '}
            {opt.label}. {opt.text}
          </span>
        </label>
      ))}
    </div>
  );
}
