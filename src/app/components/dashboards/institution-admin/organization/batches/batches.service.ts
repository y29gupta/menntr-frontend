import { api } from '@/app/lib/api';
import { BatchApiResponse } from './batches.columns';
import { CreateBatchPayload } from './batches.types';

export const getBatches = async (): Promise<BatchApiResponse> => {
  const res = await api.get('/organization/batches');
  // Backend returns { meta: {...}, data: [...] }
  // Extract the data array
  return res.data.data || [];
};

export const createBatch = (payload: CreateBatchPayload) =>
  api.post('/organization/batches', payload);

export const updateBatch = ({
  id,
  payload,
}: {
  id: number;
  payload: Partial<CreateBatchPayload>;
}) => api.put(`/organization/batches/${id}`, payload);

export const getBatchMeta = () => api.get('/organization/batches/meta');
