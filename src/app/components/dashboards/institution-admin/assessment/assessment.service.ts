import { api } from "@/app/lib/api";
import { getAssessmentListResponse } from "./assessment.schema";

export const assessmentApi = {
    getAssessmentList: async ():Promise<getAssessmentListResponse[]> => {
        const res = await api.get('/assessments')
             return res.data
    }
}