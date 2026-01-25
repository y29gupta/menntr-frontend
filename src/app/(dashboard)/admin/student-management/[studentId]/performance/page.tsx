import ReusableBarChart from '@/app/components/charts/PerformanceBarChart';
import { AssessmentPerformanceTable } from '@/app/components/dashboards/institution-admin/student-management/performance';
import PerformanceCard from '@/app/ui/ProgressCard';
import { Avatar } from 'antd';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
type AssessmentStatus = 'Completed' | 'In-Progress' | 'Not started yet';

type AssessmentCategory = 'Aptitude' | 'Domain';

type AssessmentRow = {
  assessmentName: string;
  category: AssessmentCategory;
  attempt: number;
  duration: string;
  score: number;
  scorePercent: number;
  status: AssessmentStatus;
};
const assessmentTableData: AssessmentRow[] = [
  {
    assessmentName: 'Aptitude Mock – Jan 2025',
    category: 'Aptitude',
    attempt: 1,
    duration: '25 mins',
    score: 85,
    scorePercent: 85,
    status: 'Completed',
  },
  {
    assessmentName: 'Aptitude Mock – Jan 2025',
    category: 'Domain',
    attempt: 1,
    duration: '25 mins',
    score: 85,
    scorePercent: 85,
    status: 'In-Progress',
  },
  {
    assessmentName: 'Aptitude Mock – Jan 2025',
    category: 'Aptitude',
    attempt: 1,
    duration: '25 mins',
    score: 85,
    scorePercent: 85,
    status: 'Not started yet',
  },
];

const performanceCards = [
  { label: 'Attempt Rate', valueText: '100%', percentage: 100 },
  { label: 'Average Score', valueText: '46%', percentage: 46 },
  { label: 'Highest Score', valueText: '87', percentage: 87 },
  { label: 'Lowest Score', valueText: '25', percentage: 25 },
];
const performanceChartData = [
  {
    label: 'Aptitude – Jan 2025',
    score: 35,
    attempt: 1,
    rawScore: '35/100',
  },
  {
    label: 'Aptitude – Feb 2025',
    score: 52,
    attempt: 1,
    rawScore: '52/100',
  },
  {
    label: 'Aptitude – Mar 2025',
    score: 90,
    attempt: 1,
    rawScore: '90/100',
  },
  {
    label: 'Aptitude – Apr 2025',
    score: 46,
    attempt: 1,
    rawScore: '46/100',
  },
  {
    label: 'Aptitude – May 2025',
    score: 63,
    attempt: 1,
    rawScore: '63/100',
  },
  {
    label: 'Aptitude – Jun 2025',
    score: 38,
    attempt: 1,
    rawScore: '38/100',
  },
];

const page = () => {
  return (
    <>
      <div
        className=" 
        w-full  gap-3 h-full flex-1 flex flex-col 
       
        rounded-2xl
      "
      >
        {/* top header  */}
        <div
          className="
            w-full
            px-4
            py-4
            rounded-2xl
            bg-white/70
            backdrop-blur-xl
            shadow-[0_0_8px_rgba(15,23,42,0.08)]
            flex
            flex-col
            gap-6
           "
        >
          {/* Top row */}
          <div className="flex  flex-col ">
            <Link
              className="flex items-center gap-2 text-md font-medium text-[#192B4F] hover:text-slate-700"
              href={'/admin/student-management'}
            >
              <span className="text-lg">
                <Image src="/Go-back.svg" alt="goback" width={16} height={16} />
              </span>
              Go back
            </Link>
          </div>

          {/* User info */}
          <div className="flex items-center gap-4 justify-between items-center">
            <div className="flex gap-3 py-1">
              <Avatar src="/assets/avatar.jpg" style={{ width: '48px', height: '50px' }} />

              <div className="flex flex-col ">
                <span className="text-xl font-semibold text-[#323746] ">Arun Kumar</span>
                <span className="text-sm text-slate-500">arun.kumar@college.edu</span>
              </div>
            </div>
            <button
              className="
              rounded-[64px]
              border border-violet-400
              px-3 py-2
              text-sm font-medium
              !text-violet-600
              hover:bg-violet-50
              transition
              flex gap-2 items-center
            "
            >
              <Upload size={14} /> Export
            </button>
          </div>
        </div>

        {/* overall performance progress bar */}
        <div
          className="
         backdrop-blur-[100px]
        shadow-[0_0_8px_0_rgba(15,23,42,0.12)]
        rounded-2xl
        flex flex-col 
        p-4
        "
        >
          <div>
            <h3 className="text-[#192B4F] text-lg font-semibold">Overall Performance</h3>
            <p className="text-[#636771] text-[16px] font-light">
              Overall Performance of the student
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mt-4">
            {performanceCards.map((card, index) => (
              <div key={index} className="w-full md:w-[calc(50%-8px)]">
                <PerformanceCard {...card} />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-full  bg-white/30 backdrop-blur-[100px] shadow-[0_0_8px_0_rgba(15,23,42,0.12)] rounded-2xl flex flex-col p-4   w-full">
          <div className="px-4">
            <h3 className="font-semibold  text-[#192B4F] text-lg">Performance Overview</h3>
            <p>Assessment-wise performance trend for this student</p>
          </div>
          <div className="px-4 ">
            <ReusableBarChart data={performanceChartData} />
          </div>
        </div>
        <div
          className="rounded-2xl p-4  backdrop-blur-[100px] shadow-[0_0_8px_0_rgba(15,23,42,0.12)]
"
        >
          <div className="flex  p-4 flex-col">
            <div className="px-4">
              <h3 className="text-[#192B4F] text-lg font-semibold">Assessment Taken</h3>
              <p className="text-[#636771] text-[16px] font-light">
                List of all assessment attempted by this student with performance summary
              </p>
            </div>
            <div className="broder  px-4">
              <AssessmentPerformanceTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
