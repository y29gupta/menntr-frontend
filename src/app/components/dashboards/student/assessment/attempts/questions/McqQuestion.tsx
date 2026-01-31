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
  question: {
    id: number;
    options: string[];
  };
  questionIndex: number;
  setQuestionStatus: React.Dispatch<any>;
};

export default function McqQuestion({ question, questionIndex, setQuestionStatus }: Props) {
  return (
    <div className="space-y-3">
      {question.options.map((opt, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={`q-${question.id}`}
            className="h-4 w-4 accent-purple-600"
            onChange={() =>
              setQuestionStatus((prev: any) => ({
                ...prev,
                [questionIndex]: {
                  ...prev[questionIndex],
                  attempted: true,
                },
              }))
            }
          />
          <span className="text-sm text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}
