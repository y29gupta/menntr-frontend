export interface AssessmentQuestion {
  id: string;
  title: string;
  type: string;
}

export interface AssessmentData {
  id: string;
  title: string;
  description?: string;
  questions: AssessmentQuestion[];
  duration?: number;
  totalMarks?: number;
}

export interface PublishAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentData: AssessmentData;
}
