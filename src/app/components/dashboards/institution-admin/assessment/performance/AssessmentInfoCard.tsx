'use client';
import { Popover } from 'antd';

type ScoreBreakdown = Record<string, { label: string; count: number }[]>;

type AssessmentInfoCardProps = {
  title?: string;
  category?: string;
  type?: string;
  department?: string;
  batch?: string;
  totalScore?: number;
  duration?: string;
  publishedOn?: string;
  expiresOn?: string;
  scoreBreakdown?: ScoreBreakdown;
};

export const ScoreTooltip = ({ data }: { data: ScoreBreakdown }) => {
  const entries = Object.entries(data);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      {entries.map(([section, items], index) => (
        <div key={section} className="flex items-start gap-6">
          {/* Section content */}
          <div className="w-fit">
            <p className="mb-2 text-sm font-semibold text-gray-800">{section}</p>

            <ul className="space-y-1.5">
              {items.map((i, idx) => (
                <li key={idx} className="flex items-center justify-between gap-3">
                  <span className="text-gray-600 whitespace-nowrap">{i.label}</span>
                  <span className="w-6 text-right font-semibold text-gray-900">{i.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {index !== entries.length - 1 && (
            <div className="hidden sm:block w-px self-stretch bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

const AssessmentInfoCard = ({
  title,
  category,
  type,
  department,
  batch,
  totalScore,
  duration,
  publishedOn,
  expiresOn,
  scoreBreakdown,
}: AssessmentInfoCardProps) => {
  return (
    <div>
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-[#1A2C50]">{title}</h3>

        {(publishedOn || expiresOn) && (
          <div className=" flex flex-col gap-0 text-xs text-gray-500">
            {publishedOn && <span>Published on: {publishedOn}</span>}
            {publishedOn && expiresOn && ' · '}
            {expiresOn && <span>Expires on: {expiresOn}</span>}
          </div>
        )}
      </div>

      <div
        className={`${title ? 'mt-3' : ''} w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
      >
        <div className="grid gap-6 text-sm grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          <InfoItem label="Category" value={category} showDivider />
          <InfoItem label="Type" value={type} showDivider />
          <InfoItem label="Department" value={department} showDivider />
          <InfoItem label="Batch" value={batch} showDivider />
          <InfoItem
            label="Total Score"
            showDivider
            value={
              scoreBreakdown ? (
                <Popover content={<ScoreTooltip data={scoreBreakdown} />} trigger="hover">
                  <span className="cursor-pointer">{totalScore}</span>
                </Popover>
              ) : (
                totalScore
              )
            }
          />

          <InfoItem label="Duration" value={duration} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentInfoCard;

const InfoItem = ({
  label,
  value,
  showDivider = false,
}: {
  label: string;
  value?: React.ReactNode;
  showDivider?: boolean;
}) => {
  if (value === undefined) return null;
  return (
    <div className="relative flex flex-col px-4">
      {showDivider && (
        <span className="absolute right-[-0.75rem] top-1/2 h-12 w-px -translate-y-1/2 bg-gray-300" />
      )}

      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};
