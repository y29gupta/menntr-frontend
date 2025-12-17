import * as React from 'react';
const CollapseIcon = (props: any) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_578_501)">
      <rect x={8} y={4} width={48} height={48} rx={24} fill="white" />
      <rect x={8.5} y={4.5} width={47} height={47} rx={23.5} stroke="#DBDFE7" />
      <path
        d="M31.92 35.92L24 28L31.92 20.08L33.33 21.5L27.83 27H42V29H27.83L33.34 34.5L31.92 35.92ZM24 28V18H22V38H24V28Z"
        fill="#636771"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_578_501"
        x={0}
        y={0}
        width={64}
        height={64}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.164706 0 0 0 0.12 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_578_501" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_578_501" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default CollapseIcon;
