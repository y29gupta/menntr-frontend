export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'MCQ' | 'CODING';

export interface QuestionReport {
  id: number;
  questionNo: string;
  title: string;
  type: QuestionType;
  difficulty: Difficulty;
  totalMarks: number;
  marksObtained: number;

  // MCQ
  options?: string[];
  selectedOption?: number;
  correctOption?: number;

  // Coding
  language?: string;
  code?: string;
  testPassed?: number;
  testTotal?: number;
}
