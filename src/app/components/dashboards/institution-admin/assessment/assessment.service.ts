
import { api } from "@/app/lib/api";

import { AssessmentAccessPayload, AssessmentListResult, AssessmentMetaResponse, AssessmentQuestionResponse, CreateAssessmentPayload, CreateCodingQuestionPayload, getAssessmentListResponse, QuestionMetaType, UpdateQuestionPayload } from "./assessment.types";

export type AssessmentTab = "active" | "draft" | "completed";

export const assessmentApi = {
 
getAssessmentList: async (
  tab: 'active' | 'draft' | 'completed',
  page = 1,
  search?: string,
  filters: Record<string, string> = {}
): Promise<AssessmentListResult> => {

  const params: Record<string, any> = {
    tab,
    page,
  };

  // ✅ Only attach search if exists
  if (search && search.trim() !== '') {
    params.search = search;
  }

  // ✅ Attach column filters only if exist
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params[key] = value;
  });

  const res = await api.get('/assessments', { params });

  return {
    rows: res.data.data,
    meta: res.data.meta,
  };
},


   getAssessmentMeta: async (): Promise<AssessmentMetaResponse> => {
    const res = await api.get("/assessments/meta");
    return res.data;
  },
   
  createAssessment: async (payload: CreateAssessmentPayload) => {
    console.log(payload,"pyaldo")
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


  // ------------------assessment coding api-------------------

  
  getCodingQuestionMeta: async () => {
    const res = await api.get('/questions/coding/meta');
    return res.data;
  },



  getQuestionMeta: (type: string) => {
    switch (type) {
      case 'MCQ':
        return assessmentApi.getMCQMeta();

      case 'Coding':
        return assessmentApi.getCodingQuestionMeta();

      default:
        throw new Error('Unsupported question type');
    }
  },

bulkUploadQuestions: async (
  assessmentId: string,
  type: 'mcq' | 'coding',
  file: File
) => {
  const formData = new FormData();
  formData.append('file', file);
  console.log(assessmentId,"ent")
  const endpoint =
    type === 'mcq'
      ? `/assessments/${assessmentId}/mcq/bulk-create`
      : `/assessments/${assessmentId}/questions/coding/bulk-upload`;

  const res = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
},

  getQuestionById: async (questionId: string) => {
    // const { data } = await api.get(`/assessments/questions/${questionId}`);
    const { data } = await api.get(`/assessments/questions/${questionId}`);
    return data;
  },

  createCodingQuestion: (
  assessmentId: string,
  payload: CreateCodingQuestionPayload
) =>
  api.post(
    `/assessments/${assessmentId}/questions/coding`,
    payload
  ),



updateQuestion: (questionId: string, payload: UpdateQuestionPayload) =>
    api.put(`/assessments/questions/${questionId}`, payload),

deleteAssessmentQuestion: async (
  assessmentId: string | null,
  questionId: string
) => {
  console.log(assessmentId,questionId,"delete")
  const res = await api.delete(
    `/assessments/${assessmentId}/questions/${questionId}`
  );
  return res.data;
  },

  

  
deleteDraftAssessment: async (
  assessmentId: string | null,
  
) => {
  console.log(assessmentId,"delete assessment")
  const res = await api.delete(
    `/assessments/${assessmentId}`
  );
  return res.data;
  },


  getAssessmentById: async (assessmentId: string) => {
    console.log("edit ",assessmentId)
    const { data } = await api.get(`/assessments/${assessmentId}`);
    return data;
  },

  
  updateAssessment: async (
    assessmentId: string,
    payload: {
      title: string;
      description?: string;
      duration_minutes?: number;
      instructions?: string;
      tags?: string[];
      category: string;
      assessment_type: string;
      question_type: string;
    }
  ) => {
    const { data } = await api.put(`/assessments/${assessmentId}`, payload);
    return data;
  },


};
