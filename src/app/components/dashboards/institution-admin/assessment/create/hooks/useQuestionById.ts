import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../../assessment.service';

export const QUESTION_QUERY_KEY = 'assessment-question';

export function useQuestionById(questionId?: string) {
  return useQuery({
    queryKey: [QUESTION_QUERY_KEY, questionId],
    queryFn: () => assessmentApi.getQuestionById(questionId!),
    enabled: !!questionId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
