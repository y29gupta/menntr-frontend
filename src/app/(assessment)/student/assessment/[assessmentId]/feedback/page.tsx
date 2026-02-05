'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { assessmentApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';

const EMOJIS = [
  { id: 1, src: '/assets/sad-face.png' },
  { id: 2, src: '/assets/sad.png' },
  { id: 3, src: '/assets/confused.png' },
  { id: 4, src: '/assets/smile.png' },
  { id: 5, src: '/assets/happy.png' },
];

const FLOW_OPTIONS = [
  { label: 'Very smooth', value: 'very_smooth' },
  { label: 'Acceptable', value: 'acceptable' },
  { label: 'Needs Improvement', value: 'needs_improvement' },
];

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.assessmentId as string;

  const [rating, setRating] = useState<number | null>(null);
  const [flow, setFlow] = useState<string>('very_smooth');
  const [comment, setComment] = useState('');

  const feedbackMutation = useMutation({
    mutationFn: () =>
      assessmentApi.submitFeedback(assessmentId, {
        overall_rating: rating!,
        flow_rating: flow,
        comments: comment,
      }),
    onSuccess: () => {
      router.replace('/student/assessment');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F6FB] px-4">
      <div className="w-full max-w-[720px] bg-white rounded-2xl shadow-lg px-8 py-7">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-[#1A2C50]">Platform Feedback</h2>
          <p className="text-sm text-gray-500">Help us improve your experience on Menntr.</p>
        </div>

        {/* Q1 */}
        <div className="mb-6">
          <p className="font-medium mb-3">
            1. How was your overall experience with this assessment on Menntr?
          </p>
          <div className="flex justify-between">
            {EMOJIS.map((e) => (
              <img
                key={e.id}
                src={e.src}
                className={`w-12 h-12 cursor-pointer transition ${
                  rating === e.id ? 'scale-110' : 'opacity-60'
                }`}
                onClick={() => setRating(e.id)}
              />
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-6">
          <p className="font-medium mb-3">2. Was the assessment flow smooth and easy to follow?</p>
          <div className="flex gap-3">
            {FLOW_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFlow(opt.value)}
                className={`px-4 py-1 rounded-full border text-sm ${
                  flow === opt.value
                    ? 'bg-purple-100 border-purple-500 text-purple-700'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="mb-6">
          <p className="font-medium mb-2">3. Anything we can do better?</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your feedback, suggestions, or report an issue"
            className="w-full border rounded-xl p-3 text-sm resize-none h-24"
          />
        </div>

        <p className="text-xs text-gray-400 text-center mb-4">
          Your feedback is anonymous and used only to improve Menntr.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.replace('/student/assessment')}
            className="px-6 py-2 rounded-full border border-purple-500 text-purple-600"
          >
            Skip
          </button>

          <button
            disabled={!rating}
            onClick={() => feedbackMutation.mutate()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
