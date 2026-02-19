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


// export type AssessmentRow = {
//   id: string;
//   assessmentName: string;
//   category: string;
//   departmentBatch: string;
//   questions: number;
//   publishedOn: string;
//   expiryOn: string;
//   lastEdited: string;
//   status: string;
// };

// assessment.types.ts

export type AssessmentMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
  pageSize: number;
};

export type Batch = {
  id: number;
  institution_id: number;
  name: string;
  code: string;
  category_role_id: number;
  department_role_id: number;
  academic_year: number;
  semester: number | null;
  start_date: string; // ISO date
  end_date: string;   // ISO date
  coordinator_id: string | null;
  metadata: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
export type AssessmentBatch = {
  assessment_id: string;
  batch_id: number;
  assigned_by: string;
  assigned_at: string; // ISO datetime
  batch: Batch;
};


export type AssessmentRow = {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'completed' | 'closed';
  created_at: string;
  updated_at: string;
  published_at: string;
  total_marks: number;
  duration_minutes: number;
  metadata?: {
    category?: string;
    question_type?: string;
    assessment_type?: string;
  };
  tags?: string[];
  questions?: any[];
 batches?: AssessmentBatch[];
};

export type AssessmentListResult = {
  rows: AssessmentRow[];
  meta: AssessmentMeta;
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
  // question_type: string;
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



  export interface AssessmentSummary {
  assessmentName: string;
  category: string;
  assessmentType: string;
  questionType: string;
  totalQuestions: number;
  totalMarks: number;
  difficultyMix: {
    easy: number;
    medium: number;
    hard: number;
  };
  mandatory: boolean;
}
