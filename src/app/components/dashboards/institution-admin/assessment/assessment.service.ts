// import { api } from "@/app/lib/api";
// import { getAssessmentListResponse } from "./assessment.schema";

// export const assessmentApi = {
//     getAssessmentList: async ():Promise<getAssessmentListResponse[]> => {
//         const res = await api.get('/assessments')
//              return res.data
//     }
// }
import { api } from "@/app/lib/api";
import { AssessmentQuestionResponse, getAssessmentListResponse } from "./assessment.schema";
import { AssessmentAccessPayload, AssessmentMetaResponse, CreateAssessmentPayload } from "./assessment.types";

export type AssessmentTab = "active" | "draft" | "closed";

export const assessmentApi = {
  getAssessmentList: async (
    tab: AssessmentTab
  ): Promise<getAssessmentListResponse[]> => {
    const res = await api.get("/assessments", {
      params: { tab }
    });
    return res.data;
  },
   getAssessmentMeta: async (): Promise<AssessmentMetaResponse> => {
    const res = await api.get("/assessments/meta");
    return res.data;
  },
   
  createAssessment: async (payload: CreateAssessmentPayload) => {
    const res = await api.post("/assessments", payload);
    return res.data;
  },
  // assessment.service.ts
  getInstitutionMeta: async () => {
  const res = await api.get('/assessments/audience/meta');
  return res.data;
  },
  updateAssessmentAudience: async (assessmentId: string, payload: { batch_ids: number[] }) =>
  await api.put(`/assessments/${assessmentId}/audience`, payload),

  getMCQMeta: async () => {
  const res = await api.get('/questions/meta');
  return res.data;
  },
  
 
    createAssessmentQuestion: async (
    assessmentId: string,
    payload: {
      topic: string;
      question_text: string;
      question_type: string;
      difficulty_level: string;
      points: number;
      is_mandatory: boolean;
      options: {
        option_text: string;
        is_correct: boolean;
      }[];
    }
    ) => {
      
      console.log(payload,assessmentId,"create qs")
    const res = await api.post(
      `/assessments/${assessmentId}/questions/create`,
      payload
    );
    return res.data;
  },
  getAssessmentQuestions: async (
    assessmentId: string
  ): Promise<AssessmentQuestionResponse[]> => {
    console.log(assessmentId,"idis")
    const res = await api.get(`/assessments/${assessmentId}/questions`);
    console.log(res,"qstion")

    return res.data;
  },
  getAssessmentSummary: async (assessmentId: string) => {
  const res = await api.get(`/assessments/${assessmentId}/summary`);
  return res.data;
},

  getAssessmentAssignedToDetail: async (assessmentId: string) => {
  const res = await api.get(`/assessments/${assessmentId}/audience`);
  return res.data;
  },
 updateAssessmentSchedule: async (
  assessmentId: string,
  payload: {
    publish_at: string;
    expiry_at?: string;
  }
 ) => {
   console.log(payload,assessmentId,"schedule")
  const res = await api.put(
    `/assessments/${assessmentId}/schedule`,
    payload
  );
  return res.data;
},

 
  getAssessmentAccess: (assessmentId: string | number) =>
    api.get(`/assessments/${assessmentId}/access`).then(res => res.data),

  updateAssessmentAccess: (
    assessmentId: string | number,
    payload: AssessmentAccessPayload
  ) =>
    api.put(`/assessments/${assessmentId}/access`, payload),

  publishAssessment: (assessmentId: string | number) =>
    api.post(`/assessments/${assessmentId}/publish`),


};
