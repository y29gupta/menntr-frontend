'use client';

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
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 lg:grid-cols-6">
          <InfoItem label="Category" value={category} showDivider />
          <InfoItem label="Type" value={type} showDivider />
          <InfoItem label="Department" value={department} showDivider />
          <InfoItem label="Batch" value={batch} showDivider />
          <InfoItem label="Total Score" value={totalScore} showDivider />
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
  value?: string | number;
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
