'use client';

import Image from 'next/image';

type Props = {
  imageSrc: string;
  title: string;
  description: string;
};

export default function EmptyAssessmentState({ imageSrc, title, description }: Props) {
  return (
    <div className="flex h-95 w-full flex-col items-center justify-center text-center mt-8">
      <Image src={imageSrc} alt="No assessments" width={400} height={400} priority />

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-1 max-w-md text-[12px] text-gray-500">{description}</p>
    </div>
  );
}
