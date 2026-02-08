import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/app/lib/notifications.api';

export const NOTIFICATIONS_QUERY_KEY = ['notifications'];

export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: getNotifications,
    staleTime: 60 * 1000, // 1 min
    refetchOnWindowFocus: false,
  });
};
