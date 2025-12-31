'use client';

export default function DragOverlayUI({
  label,
  feedback,
}: {
  label: string;
  feedback?: {
    type: 'success' | 'error';
    message: string;
  } | null;
}) {
  return (
    <div className="pointer-events-none flex flex-col items-start sm:items-start">
      <div className="px-5 py-2 rounded-full border bg-white shadow-md text-sm">{label}</div>

      {feedback && (
        <div
          className={`mt-2 text-xs flex items-center gap-2 ${
            feedback.type === 'success' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {feedback.type === 'success' ? '✔' : '✖'} {feedback.message}
        </div>
      )}
    </div>
  );
}
