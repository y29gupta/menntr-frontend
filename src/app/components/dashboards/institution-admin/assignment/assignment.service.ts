import { api } from "@/app/lib/api";
import { AssignmentMeta } from "./assignment.types";
import { dummyActiveAssignments } from "./dummyActiveAssignment";


const USE_DUMMY = true;
let assignmentStore: any[] = [];


export const assignmentApi = {
  getAssignmentList: async (
    status: string,
    page: number,
    search: string,
    filters: Record<string, string>
  ) => {
    if (USE_DUMMY) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyActiveAssignments);
        }, 500);
      });
    }

    // later real API call
  },

    getAssignmentMeta: async (): Promise<AssignmentMeta> => {
    const res = await api.get("/assignments/meta");

    return {
      assignmentCategories: res.data?.categories ?? [],
      assignmentTypes: res.data?.assignmentTypes ?? [],
    };
  },

createAssignment: async (payload: any) => {
  console.log("FORM PAYLOAD:", payload);

  const requestBody = {
    title: payload.title,
    description: payload.description,
    category: payload.category, // already ENUM
    assignment_type:
      payload.assignmentType ?? payload.assignment_type, // already ENUM
    question_type: payload.questionType ?? "MCQ",
  };

  console.log("FINAL BODY:", requestBody);

  const res = await api.post("/assignments", requestBody);
  return res.data;
},

getAssignmentAudienceMeta: async () => {
  const res = await api.get("/assignments/audience/meta");

  return {
    institutionCategories: res.data?.categories ?? [],
  };
},

getAssignmentQuestionMeta: async () => {
  const res = await api.get("/assignments/questions/meta");

  return {
    topics: res.data?.topics ?? [],

    //  MUST be string[]
    questionTypes:
      res.data?.questionTypes?.map((q: any) => q.value) ?? [],

    //  MUST be string[]
    difficulties:
      res.data?.difficulties?.map((d: any) => d.value) ?? [],
  };
},


   getAssignmentById: async (id: string) => {
  const found = assignmentStore.find((a) => a.id === id);

  if (!found) {
    throw new Error("Assignment not found");
  }

  // return shape compatible with container hydration
  return {
    id: found.id,
    title: found.title,
    description: found.description,
    category: found.metadata?.category,
    assignmentType: found.metadata?.assignmentType,
  };
},

updateAssignment: async (id: string, payload: any) => {
  const found = assignmentStore.find((a) => a.id === id);

  if (!found) {
    throw new Error("Assignment not found");
  }

  console.log("Updating Assignment:", id, payload);

  found.title = payload.title;
  found.description = payload.description;
  found.metadata.category = payload.category;
  found.metadata.assignmentType = payload.assignment_type;
  found.updated_at = new Date().toISOString();

  return found;
},

deleteDraftAssignment: async (id: string) => {
  const index = assignmentStore.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new Error("Assignment not found");
  }

  assignmentStore.splice(index, 1);

  return { success: true };
},


updateAssignmentAudience: async (id: string, batchIds: number[]) => {
  const res = await api.put(`/assignments/${id}/audience`, {
    batch_ids: batchIds,
  });

  return res.data;
},



createAssignmentMCQQuestion: async (assignmentId: string, payload: any) => {
  const res = await api.post(
    `/assignments/${assignmentId}/questions/mcq`,
    payload
  );

  return res.data;
  },


updateAssignmentMCQQuestion: async (
  assignmentId: string,
  questionId: string,
  payload: any
) => {
  const res = await api.put(
    `/assignments/${assignmentId}/questions/${questionId}/mcq`,
    payload
  );

  return res.data;
},


      getAssignmentQuestions: async (id: string) => {
    const found = assignmentStore.find((a) => a.id === id);
    return found?.questions ?? [];
  },

getAssignmentQuestionById: async (assignmentId: string, questionId: string) => {
  const res = await api.get(
    `/assignments/${assignmentId}/questions/${questionId}`
  );
  return res.data;
},


      
      deleteAssignmentQuestion: async (id: string, questionId: string) => {
    const found = assignmentStore.find((a) => a.id === id);
    if (found) {
      found.questions = found.questions.filter((q: any) => q.id !== questionId);
    }
    return { success: true };
  },


    bulkUploadQuestions: async (
  assignmentId: string,
  type: 'mcq' | 'coding' | 'theory',
  file: File
) => {
  const formData = new FormData();
  formData.append('file', file);

  let endpoint = '';

  switch (type) {
    case 'mcq':
      endpoint = `/assignments/${assignmentId}/questions/mcq/bulk-upload`;
      break;

    // 🔮 future ready
    case 'coding':
      endpoint = `/assignments/${assignmentId}/questions/coding/bulk-upload`;
      break;

    case 'theory':
      endpoint = `/assignments/${assignmentId}/questions/theory/bulk-upload`;
      break;

    default:
      throw new Error('Unsupported question type');
  }

  const res = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
},





  //assignment publish modal api

  getAssignmentSummary: async (id: string) => {
  const found = assignmentStore.find((a) => a.id === id);

  if (!found) {
    throw new Error("Assignment not found");
  }

  return {
    assignmentName: found.title,
    category: found.metadata?.category ?? "Aptitude",
    assignmentType: found.metadata?.assignmentType ?? "Practice",
    questionType: "Theory",
    totalQuestions: found.questions?.length ?? 0,
    totalMarks: 100,
    difficultyMix: {
      easy: 2,
      medium: 2,
      hard: 1,
    },
    mandatory: true,
  };
},

  
  getAssignmentAssignedToDetail: async (id: string) => {
  const found = assignmentStore.find((a) => a.id === id);

  return {
    institutionCategory: "Engineering",
    department: "Computer Science",
    batches: found?.batches?.map((b: any) => b.batch?.name) ?? ["Batch 1"],
  };
},
getAssignmentAccess: async (id: string) => {
  return {
    shuffleQuestions: false,
    shuffleOptions: false,
    allowReattempts: true,
    showCorrectAnswers: false,
    showScoreImmediately: false,
  };
},
updateAssignmentAccess: async (id: string, payload: any) => {
  console.log("Updating Assignment Access:", id, payload);
  return { success: true };
},
updateAssignmentSchedule: async (id: string, payload: any) => {
  console.log("Updating Assignment Schedule:", id, payload);

  const found = assignmentStore.find((a) => a.id === id);
  if (found) {
    found.published_at = payload.publish_at;
    found.expiry_at = payload.expiry_at ?? null;
  }

  return { success: true };
},
publishAssignment: async (id: string) => {
  const found = assignmentStore.find((a) => a.id === id);

  if (!found) throw new Error("Assignment not found");

  found.published_at = new Date().toISOString();

  console.log("Assignment Published:", id);

  return { success: true };
},

};
