export interface AssessmentQuestion {
  id: string;
  title: string;
  type: string;
}

// export interface AssessmentData {
//   id: string;
//   title: string;
//   description?: string;
//   questions: AssessmentQuestion[];
//   duration?: number;
//   totalMarks?: number;
// }
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




export type StepFourHandle = {
  submit: () => {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowReattempts: boolean;
    showCorrectAnswers: boolean;
    showScoreImmediately: boolean;
  };
};

type Props = {
  data?: {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowReattempts: boolean;
    showCorrectAnswers: boolean;
    showScoreImmediately: boolean;
  };
};