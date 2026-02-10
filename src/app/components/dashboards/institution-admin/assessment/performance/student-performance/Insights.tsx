'use client';

import { useState } from 'react';
import { InfoCard } from './InfoCard';
import { InterruptionsSection } from './InterruptionsSection';
import { ProctoringData } from './proctoring.types';
import { X } from 'lucide-react';

type Props = ProctoringData;

export default function ProctoringInsights({
  screenshots,
  cameraOff,
  tabChanged,
  interruptions = [],
  videoUrl,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const resolvedVideoUrl = videoUrl ?? null; // ✅ FIX

  const [selectedMedia, setSelectedMedia] = useState<{
    type: 'video' | 'image';
    url: string;
    metadata?: {
      time?: string;
      eventType?: string;
      question?: string;
    };
  } | null>(null);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // ❌ DO NOT set videoUrl here anymore (comes from backend)
    setIsGenerating(false);
  };

  const openMediaModal = (type: 'video' | 'image', url: string, metadata?: any) => {
    setSelectedMedia({ type, url, metadata });
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#475467] max-w-2xl">
        Detailed proctoring insights for this candidate, including interruptions, suspicious
        activities, and captured screenshots during the assessment.
      </p>

      <div className="rounded-2xl flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0_8px_24px_rgba(16,24,40,0.08)] p-4 sm:p-6">
        {!resolvedVideoUrl && (
          <>
            {isGenerating ? (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-8 sm:p-12 flex items-center justify-center w-fit">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#904BFF] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium text-[#101828]">Generating Video</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGenerateInsights}
                className="self-start px-10 py-2.5 rounded-full text-sm font-medium 
                bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
                text-white! cursor-pointer hover:opacity-90 transition-opacity"
              >
                Generate Insights
              </button>
            )}
            <hr className="border-[#DBE3E9]" />
          </>
        )}

        {resolvedVideoUrl && (
          <>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-[#101828]">Proctoring Video</h3>

              <div
                className="relative w-fit cursor-pointer group"
                onClick={() =>
                  openMediaModal('video', resolvedVideoUrl, {
                    time: '19:05',
                    eventType: 'Suspicious Activity',
                  })
                }
              >
                <video
                  className="rounded-lg border border-[#EAECF0] max-w-full h-auto"
                  src={resolvedVideoUrl}
                  style={{ maxHeight: '400px' }}
                >
                  Your browser does not support the video tag.
                </video>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Click to expand
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-[#DBE3E9]" />
          </>
        )}

        <InterruptionsSection interruptions={interruptions} />

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#101828]">Screenshots</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {screenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="h-[72px] w-full rounded-md object-cover border border-[#EAECF0] cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => openMediaModal('image', src)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            title="Camera Turned off"
            value={cameraOff ? 'Detected' : 'No Proctored image'}
          />
          <InfoCard title="Changed Tabs" value={tabChanged ? 'Detected' : 'No Proctored image'} />
        </div>
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={closeMediaModal}
        >
          <div
            className="relative bg-white rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMediaModal}
              className="absolute top-3 right-3 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {selectedMedia.type === 'video' ? (
              <video controls autoPlay className="w-full" src={selectedMedia.url} />
            ) : (
              <div>
                <img src={selectedMedia.url} alt="Screenshot" className="w-full rounded-lg" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
