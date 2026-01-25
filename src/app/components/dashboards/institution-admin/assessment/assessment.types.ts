export type AssessmentTab = 'active' | 'draft' | 'completed';

export type AssessmentStatus = 'published' | 'draft' | 'completed';

export interface Assessment {
  id: string;
  assessmentName: string;
  category: string;
  departmentBatch: string;
  questions: number;
  publishedOn: string;   // "-" or date
  expiryOn: string;     // "-" or date
  lastEdited: string;
  status: AssessmentStatus;
}

export type AssessmentRow = {
  id: string;
  assessmentName: string;
  category: string;
  departmentBatch: string;
  questions: number;
  publishedOn: string;
  expiryOn: string;
  lastEdited: string;
  status: string;
};


export interface getAssessmentListResponse {
  id: string;
  assessmentName: string;
  category: string;
  departmentBatch: string;
  questions: number;
  publishedOn: string;
  expiryOn: string;
  lastEdited: string;
  status: "published" | "draft" | "completed";
}

export interface AssessmentQuestionResponse {
  // id: string;
  assessment_question_id: string;
  question_id: string;
  questionNo: number;
  questionText: string;
  marks: number;
  isMandatory: boolean;
  topic: string;
  questionTypeLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}


export type AssessmentMetaResponse = {
  assessmentCategories: string[];
  assessmentTypes: string[];
  questionTypes: string[];
};


export type CreateAssessmentPayload = {
  // feature_id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  tags: string[];

  category: string;
  assessment_type: string;
  question_type: string;
};


export type AssessmentAccessPayload = {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowReattempts: boolean;
  showCorrectAnswers: boolean;
  showScoreImmediately: boolean;
};




export type mcqMetaResponse = {
  topics: string[];
  difficulties: string[];
  questionTypes: string[];
};


export interface CodingQuestionMetaResponse {
  topics: string[];
  difficulties: string[];
  timeLimits: number[];
  languages: string[];
}


  export type QuestionMetaType = 'MCQ' | 'CODING';


//   export type BaseUpdateQuestionPayload = {
//   type: 'mcq' | 'coding';
//   topic: string;
//   difficulty_level: string;
//   points: number;
// };

export type CreateCodingQuestionPayload = {
  topic: string; // array (backend expects this)
  difficulty_level: string;
  points: number;
  time_limit_minutes: number;
  problem_title: string;
  problem_statement: string;
  constraints: string;
  input_format: string;
  output_format: string;
  supported_languages: string[];
  sample_test_cases: {
    input: string;
    output: string;
  }[];
  is_mandatory: boolean;
};

export type UpdateMCQQuestionPayload = {
  topic: string;
  question_text: string;
  question_type: string; // single_correct | multiple_correct | true_false
  difficulty_level: string;
  points: number;
  is_mandatory: boolean;
  options: {
    option_text: string;
    is_correct: boolean;
  }[];
};
export type UpdateCodingQuestionPayload = {
  type: 'coding';
  topic: string;
  difficulty_level: string;
  points: number;
  time_limit_minutes: number;
  problem_title: string;
  problem_statement: string;
  constraints: string;
  input_format: string;
  output_format: string;
  supported_languages: string[];
  sample_test_cases: {
    input: string;
    output: string;
  }[];
};

export type UpdateQuestionPayload =
  | UpdateMCQQuestionPayload
  | UpdateCodingQuestionPayload;
