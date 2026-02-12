import { api } from '@/app/lib/api';

export type StudentDashboardResponse = {
  pending: number;
  completed: number;
  cgpa: number;
  currentRank: number | null;
  totalStudents: number;
};


export type DashboardAssessment = {
  id: string;
  title: string;
  durationMinutes: number;
  type: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'ongoing' | 'upcoming';
};

export type DashboardAssessmentsResponse = {
  pending: DashboardAssessment[];
  ongoing: DashboardAssessment[];
  upcoming: DashboardAssessment[];
};

export const studentApi = {
  getDashboardStats: async (): Promise<StudentDashboardResponse> => {
    const res = await api.get('/student/dashboard');
    return res.data;
    },
    
     getDashboardAssessments: async (): Promise<DashboardAssessmentsResponse> => {
    const res = await api.get('/student/dashboard/assessments');
    return res.data;
  },
};
