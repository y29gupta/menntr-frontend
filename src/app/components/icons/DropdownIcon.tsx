import * as React from 'react';
const DropdownIcon = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
      stroke="#636771"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M16.5 10.5L12 15L7.5 10.5"
      stroke="#636771"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DropdownIcon;
