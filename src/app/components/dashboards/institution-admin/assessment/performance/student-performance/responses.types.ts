// responses.types.ts
export type QuestionType = 'MCQ' | 'CODING';

export type QuestionReport = {
  id: number;
  questionNo: string;
  type: QuestionType;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marksObtained: number;
  totalMarks: number;

  // MCQ
  options?: string[];
  selectedOption?: number;
  correctOption?: number;

  // Coding
  language?: string;
  code?: string;
  testPassed?: number;
  testTotal?: number;
};
