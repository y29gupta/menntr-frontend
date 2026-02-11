'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, CheckCircle, X } from 'lucide-react';
import FaceAlignmentOverlay from './FaceAlignmentOverlay';
import { getFaceDetector } from '@/app/lib/mediapipeFaceDetector';
import { useMutation } from '@tanstack/react-query';
import { attemptsApi } from '@/app/components/dashboards/student/assessment/attempts/assessment.service';

export type CameraStatus = 'off' | 'starting' | 'working' | 'aligning' | 'success' | 'error';

const ALIGN_TIME_REQUIRED = 3000;
const MAX_WAIT_TIME = 8000;

const VIDEO_WIDTH = 260;
const VIDEO_HEIGHT = 160;

const OVAL = {
  cx: VIDEO_WIDTH / 2,
  cy: VIDEO_HEIGHT / 2,
  rx: 55,
  ry: 85,
};

type Props = {
  cameraStatus: CameraStatus;
  setCameraStatus: React.Dispatch<React.SetStateAction<CameraStatus>>;
  videoStream: MediaStream | null;
  setVideoStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  onCameraReady?: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  cameraMeta?: {
    step: {
      current: number;
      total: number;
      label: string;
    };
    instructions: string;
    can_start_camera: boolean;
  } | null;
  assessmentId: string;
};

export default function StepCameraCheck({
  cameraStatus,
  setCameraStatus,
  videoStream,
  setVideoStream,
  onCameraReady,
  videoRef,
  cameraMeta,
  assessmentId,
}: Props) {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const detectorRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [waitSecondsLeft, setWaitSecondsLeft] = useState(Math.ceil(MAX_WAIT_TIME / 1000));
  const [alignSecondsLeft, setAlignSecondsLeft] = useState(Math.ceil(ALIGN_TIME_REQUIRED / 1000));

  const [backendMessage, setBackendMessage] = useState<string | null>(null);

  /* ================= HELPERS ================= */

  const isInsideOval = (x: number, y: number) => {
    const dx = (x - OVAL.cx) / OVAL.rx;
    const dy = (y - OVAL.cy) / OVAL.ry;
    return dx * dx + dy * dy <= 1;
  };

  const cleanup = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    detectorRef.current?.close?.();
    intervalRef.current = null;
    timeoutRef.current = null;
    detectorRef.current = null;
  };

  const stopCamera = () => {
    cleanup();
    videoStream?.getTracks().forEach((t) => t.stop());
    setVideoStream(null);
    setCameraStatus('off');
  };

  const startCamera = async () => {
    try {
      setCameraStatus('starting');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setCameraStatus('working');
      setTimeout(() => setCameraStatus('aligning'), 500);
    } catch {
      setCameraStatus('error');
    }
  };

  /* ================= ATTACH STREAM ================= */

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  /* ================= FACE DETECTION ================= */

  useEffect(() => {
    if (cameraStatus !== 'aligning') return;
    if (!videoRef.current) return;

    let resolved = false;
    let alignedSince: number | null = null;
    let waitStart = Date.now();
    let lastSent = 0;
    let rafId: number;

    setWaitSecondsLeft(Math.ceil(MAX_WAIT_TIME / 1000));
    setAlignSecondsLeft(Math.ceil(ALIGN_TIME_REQUIRED / 1000));

    (async () => {
      const detector = await getFaceDetector();
      if (!detector) return;

      detector.onResults((results: any) => {
        if (resolved) return;

        const elapsedWait = Date.now() - waitStart;

        setWaitSecondsLeft(Math.max(0, Math.ceil((MAX_WAIT_TIME - elapsedWait) / 1000)));
        if (elapsedWait >= MAX_WAIT_TIME) {
          resolved = true;
          resultMutation.mutate(false);
          return;
        }

        const detection = results?.detections?.[0];
        if (!detection) {
          alignedSince = null;
          setAlignSecondsLeft(Math.ceil(ALIGN_TIME_REQUIRED / 1000));
          return;
        }

        const box = detection.boundingBox;
        const faceX = box.xCenter * VIDEO_WIDTH;
        const faceY = box.yCenter * VIDEO_HEIGHT;

        if (isInsideOval(faceX, faceY)) {
          if (!alignedSince) alignedSince = Date.now();

          const elapsedAlign = Date.now() - alignedSince;
          setAlignSecondsLeft(Math.max(0, Math.ceil((ALIGN_TIME_REQUIRED - elapsedAlign) / 1000)));

          if (elapsedAlign >= ALIGN_TIME_REQUIRED) {
            resolved = true;
            resultMutation.mutate(true);
          }
        } else {
          alignedSince = null;
          setAlignSecondsLeft(Math.ceil(ALIGN_TIME_REQUIRED / 1000));
        }
      });

      const loop = () => {
        if (resolved || !videoRef.current) return;

        const now = performance.now();

        // HARD THROTTLE → 5 FPS (SAFE)
        if (now - lastSent > 200 && videoRef.current.readyState >= 2) {
          lastSent = now;
          detector.send({ image: videoRef.current });
        }

        rafId = requestAnimationFrame(loop);
      };

      loop();
    })();

    return () => {
      resolved = true;
      cancelAnimationFrame(rafId);
    };
  }, [cameraStatus]);

  const startCameraMutation = useMutation({
    mutationFn: () => attemptsApi.startCameraCheck(assessmentId),
    onSuccess: (data) => {
      setBackendMessage(data.message);
      startCamera(); // existing function
    },
    onError: () => setCameraStatus('error'),
  });
  const resultMutation = useMutation({
    mutationFn: (success: boolean) => attemptsApi.submitCameraResult(assessmentId, { success }),
    onSuccess: (data) => {
      setBackendMessage(data.message);

      if (data.success) {
        setCameraStatus('success');
      } else {
        setCameraStatus('error');
      }
    },
  });

  /* ================= UI ================= */

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Camera Box */}
      <div className="relative w-[260px] h-[160px] rounded-xl overflow-hidden bg-[#EEF2F6] flex items-center justify-center">
        {(cameraStatus === 'off' || cameraStatus === 'error') && (
          <CameraOff className="w-10 h-10 text-[#98A2B3]" />
        )}

        {cameraStatus !== 'off' && cameraStatus !== 'error' && (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {cameraStatus === 'aligning' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaceAlignmentOverlay />
              </div>
            )}
          </>
        )}
      </div>

      {/* Messages & Actions */}
      <div className="mt-4 flex flex-col items-center gap-3 min-h-[80px]">
        {/* OFF */}
        {cameraStatus === 'off' && cameraMeta?.can_start_camera && (
          <>
            <p className="text-[#4F46E5] text-sm font-medium">
              {backendMessage || cameraMeta?.instructions || 'Please turn on your camera'}
            </p>

            <button
              disabled={startCameraMutation.isPending}
              onClick={() => startCameraMutation.mutate()}
              className="flex items-center gap-2 border border-[#904BFF] text-[#904BFF]! px-5 py-2 rounded-full text-sm"
            >
              <Camera size={16} />
              {startCameraMutation.isPending ? 'Starting...' : 'Turn on Camera'}
            </button>
          </>
        )}

        {/* ALIGNING */}
        {cameraStatus === 'aligning' && (
          <p className="text-[#4F46E5] text-sm font-medium">
            {backendMessage || 'Please align your face'}
            {alignSecondsLeft < Math.ceil(ALIGN_TIME_REQUIRED / 1000)
              ? ` (${alignSecondsLeft}s)`
              : ` (${waitSecondsLeft}s)`}
          </p>
        )}

        {/* SUCCESS */}
        {cameraStatus === 'success' && (
          <>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <CheckCircle size={16} />
              <span>{backendMessage || 'Camera working – you’re good to go'}</span>
            </div>

            <button
              onClick={stopCamera}
              className="flex items-center gap-2 border border-[#904BFF] text-[#904BFF]! px-5 py-2 rounded-full text-sm"
            >
              <CameraOff size={16} />
              Turn off Camera
            </button>
          </>
        )}

        {/* ERROR */}
        {cameraStatus === 'error' && (
          <>
            <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
              <X size={16} />
              <span>{backendMessage || 'Camera not detected – enable access'}</span>
            </div>

            <button
              onClick={() => startCameraMutation.mutate()}
              className="flex items-center gap-2 border border-[#904BFF] text-[#904BFF]! px-5 py-2 rounded-full text-sm"
            >
              <Camera size={16} />
              Turn on Camera
            </button>
          </>
        )}
      </div>
    </div>
  );
}
