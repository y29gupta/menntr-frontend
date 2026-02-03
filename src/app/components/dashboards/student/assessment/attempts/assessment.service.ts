import { api } from '@/app/lib/api';
import { SubmitAssessmentResponse, SubmitPreviewResponse } from './assessment.types';

export type StartAssessmentResponse = {
  success: boolean;
  message: string;
  assessment_id: string;
  attempt_id: string;
  session_token: string;
  ui: {
    button_label: string;
    next_screen: string;
  };
};


export type AssessmentRuntimeResponse = {
  duration_minutes: number;
  total_questions: number;
  allow_backtrack: boolean;
  allow_question_skip: boolean;
  shuffle_questions: boolean;
  shuffle_options: boolean;
  auto_submit: boolean;
  end_time: string;
};

export const attemptsApi = {
  startAssessment: async (assessmentId: string): Promise<StartAssessmentResponse> => {
    const res = await api.post(
      `/student/assessments/${assessmentId}/start`
    );
    return res.data;
  },
};


export const assessmentApi = {
  getRuntime: async (assessmentId: string): Promise<AssessmentRuntimeResponse> => {
    const res = await api.get(
      `/student/assessments/${assessmentId}/runtime`
    );
    return res.data;
    },
    
    
  /* ================= Questions ================= */

  getQuestion: async (assessmentId: string, index: number) => {
    const res = await api.get(
      `/student/assessments/${assessmentId}/questions/${index}`
    );
    return res.data;
    },
  
  
  saveMcqAnswer: async (
    assessmentId: string,
    payload: {
      assessment_question_id: string;
      question_id: string;
      selected_option_ids: number[];
      time_taken_seconds: number;
    }
  ) => {
    return api.post(
      `/student/assessments/${assessmentId}/answers/mcq`,
      payload
    );
  },

  getSubmitPreview: async (assessmentId: string): Promise<SubmitPreviewResponse> => {
    const res = await api.get(
      `/student/assessments/${assessmentId}/submit-preview`
    );
    return res.data;
  },

  submitAssessment: async (assessmentId: string): Promise<SubmitAssessmentResponse> => {
    const res = await api.post(
      `/student/assessments/${assessmentId}/submit`
    );
    return res.data;
  },
  submitFeedback: (
  assessmentId: string,
  payload: {
    overall_rating: number;
    flow_rating: string;
    comments: string;
  }
) => {
  return api.post(
    `/student/assessments/${assessmentId}/feedback`,
    payload
  );
},

};


// ------------------assessmets api for question -------------------


