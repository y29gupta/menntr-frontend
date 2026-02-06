'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/api';

type ApiEvent = {
  event_type: string;
  imageSasUrl?: string;
  videoSasUrl?: string;
  created_at: string;
};

export function useProctoringData(attemptId?: number) {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [cameraOff, setCameraOff] = useState(false);
  const [tabChanged, setTabChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!attemptId) return;

    async function fetchData() {
      setLoading(true);

      const { data } = await api.get<ApiEvent[]>(`/proctoring/evidence/${attemptId}`);

      // ✅ Screenshots
      setScreenshots(
        data.filter((e) => e.imageSasUrl).map((e) => e.imageSasUrl!) // non-null
      );

      // ✅ First available video
      const firstVideo = data.find((e) => e.videoSasUrl);
      setVideoUrl(firstVideo?.videoSasUrl ?? null);

      // ✅ Flags
      setCameraOff(data.some((e) => e.event_type === 'CAMERA_OFF'));
      setTabChanged(data.some((e) => e.event_type === 'TAB_SWITCH'));

      setLoading(false);
    }

    fetchData();
  }, [attemptId]);

  return {
    loading,
    screenshots,
    videoUrl,
    cameraOff,
    tabChanged,
  };
}
