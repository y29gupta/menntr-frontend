export type SubmitPreviewResponse = {
  attended: number;
  unanswered: number;
  time_taken_minutes: number;
};

export type SubmitAssessmentResponse = {
  success: boolean;
  message: string;
  submission: {
    attended: number;
    unanswered: number;
    time_taken_minutes: number;
  };
  show_feedback: boolean;
};
