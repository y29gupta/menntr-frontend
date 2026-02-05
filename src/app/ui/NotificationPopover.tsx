'use client';

import { useEffect, useRef } from 'react';

export type Notification = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  isNew?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  loading?: boolean;
};

/* ---------- grouping logic ---------- */
function groupNotifications(notifications: Notification[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groups: Record<string, Notification[]> = {};

  notifications.forEach((n) => {
    const d = new Date(n.createdAt);
    d.setHours(0, 0, 0, 0);

    let label = '';

    if (+d === +today) label = 'Today';
    else if (+d === +yesterday) label = 'Yesterday';
    else {
      const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
      label = `${diff} days ago`;
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });

  return groups;
}

export default function NotificationPopover({ open, onClose, notifications, loading }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  if (!open) return null;
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const grouped = groupNotifications(notifications);

  return (
    <div
      ref={ref}
      className="
        absolute right-0 top-[52px] z-50
        w-[360px] max-w-[90vw]
        rounded-2xl border border-[#E5E7EB]
        bg-white
        shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      "
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#EEF2F7]">
        <h3 className="text-[16px] font-semibold text-[#1A2C50]">Notifications</h3>
        <p className="text-[13px] text-[#6B7280]">
          All updates, alerts, and announcements in one place
        </p>
      </div>

      {/* Body */}
      <div className="max-h-[420px] overflow-y-auto px-3 py-3 space-y-4">
        {loading && <p className="text-sm text-gray-500 px-2">Loading...</p>}
        {!loading &&
          Object.entries(grouped).map(([label, items]) => (
            <div key={label}>
              <div className="bg-[#F1F5F9] rounded-lg px-3 py-1.5 mb-3">
                <span className="text-[13px] font-medium text-[#1A2C50]">{label}</span>
              </div>

              <div className="space-y-3">
                {items.map((n, i) => (
                  <div key={n.id}>
                    <div className="flex gap-2">
                      {n.isNew && <span className="mt-2 h-2 w-2 rounded-full bg-[#EF4444]" />}

                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="text-[14px] font-semibold text-[#1A2C50]">{n.title}</p>
                          <span className="text-[12px] text-[#6B7280] whitespace-nowrap">
                            {formatTime(n.createdAt)}
                          </span>
                        </div>

                        <p className="text-[13px] text-[#6B7280] mt-1">{n.description}</p>
                      </div>
                    </div>

                    {i !== items.length - 1 && <div className="h-px bg-[#EEF2F7] mt-3" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
