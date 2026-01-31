'use client';

import { ReactNode, memo } from 'react';
import ReportHeader from './ReportHeader';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

function ReportContainer({ header, children }: Props) {
  return (
    <div className="flex border-4 w-full max-w-4xl flex-col bg-white max-h-[85vh] rounded-xl">
      {header}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

export default memo(ReportContainer);
