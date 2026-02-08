'use client';

export default function FaceAlignmentOverlay() {
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-0 m-auto w-[120px] h-[150px]" fill="none">
      <ellipse
        cx="100"
        cy="120"
        rx="100" // horizontal radius (less)
        ry="120" // vertical radius (more)
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="animate-pulse"
      />
    </svg>
  );
}
