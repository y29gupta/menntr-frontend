'use client';

import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PlacementReadiness() {
  const percentage = 85;
  const target = 75;

  const radius = 80;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    setDashOffset(circumference - progress);
  }, [progress, circumference]);

  return (
    <div
      className="
        relative
        rounded-2xl
        p-6
        border border-[#DBE3E9]
        shadow-[0px_0px_8px_0px_#0F172A1F]
        overflow-hidden
        bg-white
      "
    >
      {/* Decorative Background Image */}
      <img
        src="/assets/placementreadinessCardBG.png"
        alt="celebration"
        className="
          absolute
          right-6
          
          lg:right-16
          top-2/4
          -translate-y-1/2
          w-[180px]
          sm:w-[220px]
          lg:w-[240px]
          opacity-50
          pointer-events-none
          z-0
        "
      />

      <h3 className="text-[16px] font-semibold text-[#1A2C50] mb-6 relative z-10">
        Placement Readiness
      </h3>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
        {/* LEFT SECTION */}
        <div>
          <p className="text-sm text-[#334155] mb-6">Placement readiness score</p>

          <div className="relative w-36 h-36 sm:w-44 sm:h-44">
            <svg className="w-full h-full rotate-90 scale-x-[-1]" viewBox="0 0 200 200">
              <defs>
                <linearGradient
                  id="placementGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  gradientTransform="rotate(27)"
                >
                  <stop offset="18.77%" stopColor="#5BC376" />
                  <stop offset="80.08%" stopColor="#149436" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
              />

              {/* Gradient Progress */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#placementGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{
                  transition: 'stroke-dashoffset 1s ease-in-out',
                }}
              />
            </svg>

            {/* Center circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full"
                style={{
                  background: 'linear-gradient(140deg, #FCFDFF 14%, #D6DCE1 86%)',
                }}
              />
              <div
                className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #EDEFF1 13%, #E5E9EC 85%)',
                }}
              >
                <span className="text-[28px] sm:text-[36px] font-semibold text-[#1A2C50]">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT INFO CARD */}
        <div className="relative w-full border rounded-3xl border-[#008E2D] shadow-[0px_0px_16px_0px_#0F172A26] lg:w-[532px] min-h-[136px] lg:h-[136px]">
          <div
            className="
              relative
              w-full
              h-full
              p-6
              rounded-[24px]
              border
              border-white/40
              bg-gradient-to-br from-white/40 to-white/10
              backdrop-blur-[50px]
              shadow-[0px_0px_8px_0px_#0F172A1F]
              flex
              flex-col
              justify-between
            "
          >
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#1F9D45]" />
              <p className="text-[16px] font-semibold text-[#1A2C50]">Ready for placements</p>
            </div>

            <p className="text-[14px] text-[#475569] leading-[20px]">
              Based on CGPA, completed assessments, and skill coverage
            </p>

            <p className="text-[14px] font-medium text-[#2563EB]">Target readiness: {target}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
