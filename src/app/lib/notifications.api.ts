import { api } from '@/app/lib/api';

export type NotificationApiItem = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  broadcast_id: string | null;
};

export type NotificationsApiResponse = {
  today: NotificationApiItem[];
  yesterday: NotificationApiItem[];
  older: NotificationApiItem[];
};

export const getNotifications = async (): Promise<NotificationsApiResponse> => {
  const res = await api.get('/notifications');
  return res.data;
};
