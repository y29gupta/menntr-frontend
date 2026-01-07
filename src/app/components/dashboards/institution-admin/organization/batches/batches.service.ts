// import api from '@/app/lib/api';
import { api } from '@/app/lib/api';
import { BatchApiResponse } from './batches.columns';

export const getBatches = async (): Promise<BatchApiResponse> => {
  const res = await api.get('/organization/batches');
  console.log(res,"batch")
  return res.data; 
};
