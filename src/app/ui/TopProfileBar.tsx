'use client';
import React, { useEffect, useMemo, useState } from 'react';
import SuperAdminIcon from '../components/icons/SuperAdminIcon';
import Profile from './Profile';
import { Bell, Radio } from 'lucide-react';
import NotificationPopover from './NotificationPopover';
import { useNotifications } from '../hooks/useNotifications';

type topBarSchema = {
  userRole: string;
  RoleIcon: React.ReactNode;
};

export type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  createdAt: Date;
  isNew?: boolean;
};

const TopProfileBar = ({ userRole, RoleIcon }: topBarSchema) => {
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  // const notifications: Notification[] = [
  //   {
  //     id: 1,
  //     title: 'New assessment published',
  //     description: 'A new assessment has been assigned to you.',
  //     time: '5 mins ago',
  //     createdAt: new Date(),
  //     isNew: true,
  //   },
  //   {
  //     id: 2,
  //     title: 'Results published for Practice Test – Python',
  //     description: 'Evaluation is complete. Results are now available.',
  //     time: '8:15 AM',
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 3,
  //     title: 'New assessment published',
  //     description: 'A new assessment has been assigned to you.',
  //     time: '8:15 AM',
  //     createdAt: new Date(Date.now() - 86400000),
  //   },
  //   {
  //     id: 4,
  //     title: 'Results published for Practice Test – Python',
  //     description: 'Evaluation is complete. Results are now available.',
  //     time: '8:15 AM',
  //     createdAt: new Date(Date.now() - 86400000),
  //   },
  // ];

  const { data, isLoading } = useNotifications();

  const notifications = useMemo(() => {
    if (!data) return [];
    return [...data.today, ...data.yesterday, ...data.older].map((n) => ({
      id: Number(n.id),
      title: n.title,
      description: n.message,
      createdAt: new Date(n.created_at),
      isNew: !n.is_read,
    }));
  }, [data]);

  useEffect(() => {
    setHasNew(notifications.some((n) => n.isNew));
  }, [notifications]);

  return (
    <>
      {/* header */}
      <div className="flex   relative px-4 py-2 rounded-2xl items-center justify-between gap-4 min shadow-[0_0_16px_0_#1D2F5126]">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-[#1A2C50] text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {RoleIcon}
          <span className="truncate">{userRole}</span>
        </h1>

        <div className="shrink-0 flex items-center gap-4 relative">
          <Radio size={28} className="text-[#474748]" />
          <div className="relative">
            <button
              onClick={() => {
                setOpen((v) => !v);
                setHasNew(false);
              }}
              className="relative"
            >
              <Bell size={28} className="text-[#474748]" />

              {hasNew && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#EF4444] border-2 border-white" />
              )}
            </button>

            <NotificationPopover
              open={open}
              onClose={() => setOpen(false)}
              notifications={notifications}
            />
          </div>

          {/* <Bell size={30} className="text-[#474748]" /> */}
          <Profile />
        </div>
      </div>
    </>
  );
};

export default TopProfileBar;
