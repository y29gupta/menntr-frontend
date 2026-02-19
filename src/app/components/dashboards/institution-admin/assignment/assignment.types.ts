export interface AssignmentRow {
  id: string;
  title: string;

  metadata: {
    category: string;
    assignmentType: string;
  };

  batches: {
    batch_id: string;
    batch: {
      name: string;
    };
  }[];

  questions: any[];

  published_at: string;
  due_date: string;
  updated_at: string;
}

export interface AssignmentListResult {
  rows: AssignmentRow[];
  meta: {
    totalCount: number;
    pageCount: number;
  };
}



export interface AssignmentSummary {
  assignmentName: string;
  category: string;
  assignmentType: string;
  questionType: string;
  totalQuestions: number;
  totalMarks: number;
  mandatory: boolean;
  // + anything assignment specific
}
