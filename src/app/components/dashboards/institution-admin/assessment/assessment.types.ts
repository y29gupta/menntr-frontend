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



export type AssessmentMetaResponse = {
  assessmentCategories: string[];
  assessmentTypes: string[];
  questionTypes: string[];
};


export type CreateAssessmentPayload = {
  feature_id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  tags: string[];

  category: string;
  assessment_type: string;
  question_type: string;
};