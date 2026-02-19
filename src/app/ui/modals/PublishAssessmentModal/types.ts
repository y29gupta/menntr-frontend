export interface AssessmentQuestion {
  id: string;
  title: string;
  type: string;
}

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

export interface PublishAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // assessmentData: {
  //   id: string; // 🔑 required for API
  // };
  assessmentId:string
}

export interface AssessmentData {
  summary?: AssessmentSummary;
}




export type Props = {
  data?: {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowReattempts: boolean;
    showCorrectAnswers: boolean;
    showScoreImmediately: boolean;
  };
};



export interface PublishEntityModalProps {
  isOpen: boolean;
  onClose: () => void;

  entityId: string;
  entityLabel: string; // "Assessment" | "Assignment"
  entityName: string;
  redirectPath: string;

  fetchSummary: (id: string) => Promise<any>;
  fetchAssignedTo: (id: string) => Promise<any>;
  fetchAccess: (id: string) => Promise<any>;
  updateAccess: (id: string, payload: any) => Promise<any>;
  updateSchedule: (id: string, payload: any) => Promise<any>;
  publishEntity: (id: string) => Promise<any>;
}

export type StepFourHandle = {
  submit: () => {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowReattempts: boolean;
    showCorrectAnswers: boolean;
    showScoreImmediately: boolean;
  };
};
