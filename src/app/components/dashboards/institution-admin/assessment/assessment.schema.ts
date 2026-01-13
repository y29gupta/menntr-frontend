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
