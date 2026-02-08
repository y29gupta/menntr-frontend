import { api } from './client';

export type Feature = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  usage_limit: number | null;
};

export type Module = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  sort_order: number;
  features: Feature[];
};

export type Plan = {
  id: number;
  code: string;
  name: string;
  price_monthly: number | null;
  price_yearly: number | null;
  max_students: number | null;
  max_admins: number | null;
  storage_gb: number;
  ai_queries_per_month: number;
  description: string | null;
  modules: Module[];
};

export type PlansApiResponse = {
  data: Plan[];
};

export const plansApi = {
  getPlans: async (): Promise<PlansApiResponse> => {
    const { data } = await api.get('/plans');
    return data;
  },
};
