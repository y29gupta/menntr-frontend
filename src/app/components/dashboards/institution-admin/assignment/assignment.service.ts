import { dummyActiveAssignments } from "./dummyActiveAssignment";


const USE_DUMMY = true;
let assignmentStore: any[] = [];

export type AssignmentMeta = {
  assignmentCategories: string[];
  assignmentTypes: string[];
};

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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assignmentCategories: [
          'Aptitude',
          'Domain',
         
        ],
        assignmentTypes: [
          'Homework',
          'Practice',
          'Test',
        ],
      });
    }, 300);
  });
},


  createAssignment: async (payload: any) => {
      console.log("Creating Assignment:", payload);
    const newAssignment = {
      id: crypto.randomUUID(),
      ...payload,
      metadata: {
        category: payload.category,
        assignmentType: payload.assignment_type,
      },
      batches: [],
      questions: [],
      published_at: null,
      updated_at: new Date().toISOString(),
    };

    assignmentStore.push(newAssignment);

    return newAssignment;
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
    const found = assignmentStore.find((a) => a.id === id);
    if (found) {
      found.batches = batchIds.map((b) => ({
        batch_id: b,
        batch: { name: `Batch ${b}` },
      }));
    }
    return { success: true };
  },



     createAssignmentQuestion: async (assignmentId: string, payload: any) => {
  const found = assignmentStore.find((a) => a.id === assignmentId);

  if (!found) {
    throw new Error("Assignment not found");
  }

  const newQuestion = {
    id: crypto.randomUUID(),
    ...payload,
  };

  found.questions.push(newQuestion);

  return newQuestion;
},
updateAssignmentQuestion: async (assignmentId: string, questionId: string, payload: any) => {
  const found = assignmentStore.find((a) => a.id === assignmentId);

  if (!found) throw new Error("Assignment not found");

  const question = found.questions.find((q: any) => q.id === questionId);

  if (!question) throw new Error("Question not found");

  Object.assign(question, payload);

  return question;
},

      getAssignmentQuestions: async (id: string) => {
    const found = assignmentStore.find((a) => a.id === id);
    return found?.questions ?? [];
  },
      
      deleteAssignmentQuestion: async (id: string, questionId: string) => {
    const found = assignmentStore.find((a) => a.id === id);
    if (found) {
      found.questions = found.questions.filter((q: any) => q.id !== questionId);
    }
    return { success: true };
  },

  bulkUploadQuestions: async (id: string, type: any, file: File) => {
    console.log('Mock bulk upload', id, type, file.name);
    return { success: true };
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
