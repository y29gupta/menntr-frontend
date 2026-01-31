'use client';

import { FaCalendarAlt } from 'react-icons/fa';

type UpcomingAssessmentCardProps = {
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
};

export default function UpcomingAssessmentCard({
  title,
  type,
  date,
  time,
  duration,
}: UpcomingAssessmentCardProps) {
  return (
    <div
      className="
        flex items-center justify-between
        w-full rounded-xl border border-gray-200
        bg-white p-4
        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        transition hover:bg-gray-50
      "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[15px] font-medium text-[#1A2C50]">{title}</h1>

        <p className="text-[13px] text-gray-500">Type: {type}</p>

        <div className="flex items-center gap-2 text-[13px] text-gray-500">
          <FaCalendarAlt className="text-gray-400" />

          <span>
            {date} • {time} • {duration}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <button
        className="
          rounded-full
          border border-purple-500
          px-4 py-2
          text-sm font-medium
          text-purple-600!
          transition
          hover:bg-purple-50!
        "
      >
        View Details
      </button>
    </div>
  );
}
