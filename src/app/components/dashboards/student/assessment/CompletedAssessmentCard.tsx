'use client';

type CompletedAssessmentCardProps = {
  title: string;
  type: string;
  submittedOn: string;
  status: 'UNDER_EVALUATION' | 'RESULT_PUBLISHED';
};

export default function CompletedAssessmentCard({
  title,
  type,
  submittedOn,
  status,
}: CompletedAssessmentCardProps) {
  const isResultPublished = status === 'RESULT_PUBLISHED';

  return (
    <div
      className="
        flex items-center justify-between
        w-full rounded-xl border border-gray-200
        bg-white p-4
        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
      "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-[#1A2C50]">{title}</h3>

        <p className="text-[13px] text-gray-500">Type: {type}</p>

        <p className="text-[14px] text-gray-600 font-medium ">Submitted on: {submittedOn}</p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex gap-2">
          {isResultPublished && (
            <button
              className="
                rounded-full
                !bg-purple-500
                px-4 py-2
                text-xs font-medium
                !text-white
                hover:!bg-purple-600
                hover:!text-white
            "
            >
              View Results
            </button>
          )}

          <button
            className="
              rounded-full
              border border-purple-500
              bg-white
              px-4 py-2
              text-xs font-medium
              !text-purple-500
              hover:bg-purple-50
            "
          >
            View Details
          </button>
        </div>

        <span
          className={`text-xs font-medium ${
            isResultPublished ? 'text-green-600' : 'text-orange-500'
          }`}
        >
          {isResultPublished ? 'Results Published' : 'Under Evaluation'}
        </span>
      </div>
    </div>
  );
}
