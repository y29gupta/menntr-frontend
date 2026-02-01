'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type AssessmentStatus = { kind: 'pending' } | { kind: 'ends'; timeLeft: string };

type AssessmentCardProps = {
  title: string;
  type: string;
  duration: string;
  status: AssessmentStatus;
};

export default function AssessmentCard({ title, type, duration, status }: AssessmentCardProps) {
  // const router = useRouter();
  const isPending = status.kind === 'pending';

  const router = useRouter();

  return (
    <div
      className={`
        flex justify-between  items-center w-full rounded-xl p-4 transition-all
        border shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        ${
          isPending
            ? 'bg-linear-to-r from-white to-[#FFF7EF] border-[#C46800] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
            : 'bg-white border-gray-200 hover:bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
        }
      `}
    >
      {/* LEFT */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#1A2C50] text-[15px] font-medium">{title}</h1>

        <p className="text-gray-500 text-[13px]">Type: {type}</p>

        <div className="flex items-center gap-1 text-gray-500 text-[13px]">
          <Image src="/assets/stopwatch.svg" alt="Duration" width={18} height={18} />
          <span>{duration}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-4">
        <span
          className={`text-[13px] font-medium ${isPending ? 'text-[#C46800]' : 'text-gray-500'}`}
        >
          {isPending ? 'Pending' : `Ends in: ${status.timeLeft}`}
        </span>

        <button
          className="
            rounded-full
            bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            px-5 py-2
            text-sm font-medium
            text-white!
            hover:opacity-90
            transition
          "
          // onClick={() => router.push(`/student/assessment/${2}`)}
          onClick={() => router.push('/student/assessment/start')}
        >
          Take Assessment
        </button>
      </div>
    </div>
  );
}
