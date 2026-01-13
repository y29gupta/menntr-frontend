// import { api } from "@/app/lib/api";
// import { getAssessmentListResponse } from "./assessment.schema";

// export const assessmentApi = {
//     getAssessmentList: async ():Promise<getAssessmentListResponse[]> => {
//         const res = await api.get('/assessments')
//              return res.data
//     }
// }
import { api } from "@/app/lib/api";
import { getAssessmentListResponse } from "./assessment.schema";
import { AssessmentMetaResponse, CreateAssessmentPayload } from "./assessment.types";

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

};
