// 'use client';

import { Button } from 'antd';
import Image from 'next/image';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';
import Link from 'next/link';

export interface RoleCardProps {
  label: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  gradient?: string;
  // onClick?: () => void;
  redirect: string;
}

export default function CampusUserCard({
  label,
  title,
  description,
  image,
  buttonText,
  gradient = 'bg-[linear-gradient(90deg,#904BFF_0%,#BD47BF_100%)]',
  // onClick,
  redirect,
}: RoleCardProps) {
  // return;
  // (
  //   <div className="w-[320px] flex flex-col items-center">
  //     {/* LABEL */}
  //     <div
  //       // className="mb-5 px-4 py-2 rounded-full bg-white/80 shadow-md text-[16px] font-medium text-[#0F172A]"
  //       className="
  //   px-6
  //   py-2
  //   rounded-full
  //   text-[#0F172A]
  //   bg-white/10
  //   backdrop-blur-md
  //   shadow-[inset_0_0_8px_rgba(70,93,149,0.25)]
  // "
  //     >
  //       {label}
  //     </div>

  //     {/* CARD */}
  //     <div className="w-full rounded-2xl bg-white shadow-lg px-6 pt-6 pb-5 flex flex-col items-center text-center">
  //       {/* ICON */}
  //       <div className="w-[90px] h-[90px] flex items-center justify-center">
  //         <Image src={image} alt={title} width={90} height={90} priority />
  //       </div>

  //       <h2 className="mt-4 mb-2 text-[20px] font-semibold leading-[28px]">{title}</h2>

  //       <p className="text-[14px] text-gray-600 leading-5 min-h-[40px]">{description}</p>

  //       {/* STATIC DIVIDER (NO ANT-D) */}
  //       <div className="w-full h-px bg-gray-200 my-4" />

  //       {/* BUTTON */}
  //       <Link href={redirect}>
  //         <Button
  //           // onClick={onClick}
  //           type="text"
  //           className="
  //           !p-0
  //           !h-[44px]
  //           !leading-[44px]
  //           flex
  //           items-center
  //           gap-2
  //           text-[#3B82F6]
  //           font-medium
  //           text-[15px]
  //         "
  //         >
  //           <span className="whitespace-nowrap">{buttonText}</span>

  //           {/* ICON BOX (fixed size = no shift) */}
  //           <span
  //             className={`w-[32px] h-[32px] flex items-center justify-center rounded-md ${gradient}`}
  //           >
  //             <ArrowUpRightIcon className="w-3 h-3 text-white" />
  //           </span>
  //         </Button>
  //       </Link>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-[320px] flex-none flex flex-col items-center gap-5">
      {/* LABEL */}
      <div
        className="
        px-6
        py-2
        rounded-full
        text-[#0F172A]
        bg-white/10
        backdrop-blur-md
        shadow-[inset_0_0_8px_rgba(70,93,149,0.25)]
      "
      >
        {label}
      </div>

      {/* CARD */}
      <div
        className="
    w-full
    flex
    flex-col
    items-center
    gap-4
    rounded-[36px]
    border
    border-[#CDD4E4]
    bg-white
    px-4
    py-5
    text-center
    shadow-[0_0_24px_rgba(15,23,42,0.1)]
  "
      >
        {/* ICON */}
        <div className="w-[90px] h-[90px] flex items-center justify-center">
          <Image src={image} alt={title} width={90} height={90} priority />
        </div>

        {/* TITLE */}
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#0F172A] mt-1">{title}</h2>

        {/* DESCRIPTION */}
        <p className="text-[14px] leading-[22px] text-[#636771] max-w-[260px]">{description}</p>

        {/* DASHED DIVIDER */}
        <div
          className="
    w-full
    h-[1px]
    bg-[repeating-linear-gradient(90deg,#BCC1CC_0_16px,transparent_16px_28px)]
  "
        />

        {/* BUTTON */}
        <Link href={redirect}>
          <Button
            type="text"
            className={`
      group
      relative
      overflow-hidden
      !p-0
      !h-auto
      flex
      items-center
      gap-3
      px-4
      py-2
      rounded-full
      transition-all
      duration-300
      ease-out
      hover:bg-[#F4EFFF]
    `}
          >
            {/* Gradient Text */}
            <span
              className="
        whitespace-nowrap
        font-semibold
        bg-[linear-gradient(90deg,#904BFF,#BD47BF)]
        bg-clip-text
        text-transparent
        transition-all
        duration-300
        group-hover:tracking-wide
      "
            >
              {buttonText}
            </span>

            {/* Circle */}
            <span
              className={`
        w-8
        h-8
        flex
        items-center
        justify-center
        rounded-full
        ${gradient}
        transition-all
        duration-300
        ease-out
        group-hover:scale-110
        group-hover:shadow-md
      `}
            >
              <ArrowUpRightIcon className="w-4 h-6 text-white transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
