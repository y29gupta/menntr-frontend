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
  id: string;
  questionNo: number;
  questionText: string;
  marks: number;
  isMandatory: boolean;
  topic: string;
  questionTypeLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
