import { useRef, useState } from 'react';
import { CircleCheckBig } from 'lucide-react';

type MicStatus = 'idle' | 'error' | 'analyzing' | 'success';

type Props = {
  micStatus: MicStatus;
  setMicStatus: (s: MicStatus) => void;
};

export default function StepMicCheck({ micStatus, setMicStatus }: Props) {
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const successDelayRef = useRef<NodeJS.Timeout | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(6);

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (successDelayRef.current) clearTimeout(successDelayRef.current);

    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();

    rafRef.current = null;
    timerRef.current = null;
    successDelayRef.current = null;
    streamRef.current = null;
    audioCtxRef.current = null;
  };

  const startMicTest = async () => {
    setMicStatus('analyzing');
    setSecondsLeft(6);

    try {
      // 🎤 Request mic
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;

      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.fftSize);

      const GRACE_TIME = 1000;
      const LISTEN_TIME = 6000;
      const startAt = Date.now() + GRACE_TIME;
      const endAt = startAt + LISTEN_TIME;

      const VOICE_THRESHOLD = 0.035; // 🔥 filters background noise
      const REQUIRED_FRAMES = 15; // sustained voice
      let activeFrames = 0;

      // ⏱ Countdown
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);

      const detectVoice = () => {
        const now = Date.now();

        if (now < startAt) {
          rafRef.current = requestAnimationFrame(detectVoice);
          return;
        }

        analyser.getByteTimeDomainData(buffer);

        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          const v = (buffer[i] - 128) / 128;
          sum += v * v;
        }

        const rms = Math.sqrt(sum / buffer.length);

        // 🔊 Strong voice only
        if (rms > VOICE_THRESHOLD) {
          activeFrames += 1;
        } else {
          activeFrames = 0;
        }

        // ✅ Voice confirmed (but delay success)
        if (activeFrames >= REQUIRED_FRAMES) {
          stopMic();

          successDelayRef.current = setTimeout(() => {
            setMicStatus('success');
          }, 1500); // 👌 smooth UX delay

          return;
        }

        if (now > endAt) {
          stopMic();
          setMicStatus('error');
          return;
        }

        rafRef.current = requestAnimationFrame(detectVoice);
      };

      detectVoice();
    } catch {
      stopMic();
      setMicStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full text-left mb-2">
        <h3 className="text-[16px] font-semibold text-[#1A2C50]">Microphone Check</h3>

        <p className="text-[14px] text-[#667085] mt-1">
          Please say “Hello” to test your microphone
        </p>
      </div>

      <div className="w-full flex justify-center my-3">
        <img src="/assets/Mic-test-waves.svg" alt="wave" className="w-full max-w-167.5" />
      </div>

      <div className="flex flex-col items-center mt-3 min-h-17.5">
        {micStatus === 'idle' && (
          <button
            onClick={startMicTest}
            className="
              border border-[#904BFF]
              text-[#904BFF]
              px-6 py-2
              rounded-full
              text-sm
              hover:bg-purple-50
              transition
            "
          >
            speak
          </button>
        )}

        {micStatus === 'analyzing' && (
          <p className="text-[#1A2C50] font-normal text-sm">
            Analyzing your voice ({secondsLeft}s)
          </p>
        )}

        {micStatus === 'success' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CircleCheckBig />
              Microphone detected — you sound good!
            </div>

            <p className="text-[#6E788C] text-xs">Click next to proceed</p>
          </div>
        )}

        {micStatus === 'error' && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-[#F44336] text-sm font-medium">
              <span>✕</span>
              We couldn’t hear you — check mic settings
            </div>

            <button
              onClick={startMicTest}
              className="
                border border-[#904BFF]
                text-[#904BFF]!
                px-5 py-2
                rounded-full
                text-sm
                hover:bg-purple-50
              "
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
