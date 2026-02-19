import { ZodTypeAny  } from 'zod';
import { FieldValues } from 'react-hook-form';

export interface CreateEvaluationApi {
  create: (payload: any) => Promise<any>;
  update?: (id: string, payload: any) => Promise<any>;
  getById?: (id: string) => Promise<any>;
  updateAudience?: (id: string, batchIds: number[]) => Promise<any>;
  getQuestions?: (id: string) => Promise<any>;
  deleteQuestion?: (entityId: string, questionId: string) => Promise<any>;
  bulkUpload?: (id: string, type: string, file: File) => Promise<any>;
}

export interface CreateEvaluationConfig<
  TForm extends FieldValues
> {
  entityLabel: string;
  basePath: string;

  schema: ZodTypeAny   // 🔥 FIXED

  api: CreateEvaluationApi;

  buildCreatePayload: (values: TForm) => any;
  buildUpdatePayload?: (values: TForm) => any;
}
