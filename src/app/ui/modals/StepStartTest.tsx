import { CircleCheckBig } from 'lucide-react';

export default function StepStartTest() {
  return (
    <div className="flex flex-col h-full justify-center">
      {/* Title */}
      <h3 className="text-[16px] font-semibold text-[#0F172A] mb-2">
        Quick setup tips
      </h3>

      {/* Tips list */}
      <ul className="flex flex-col gap-3 text-[14px] text-[#344054] mb-6">
        <li className="flex items-center gap-2">
          <span className="text-[#1A2C50]">◆</span>
          Sit in a quiet place
        </li>

        <li className="flex items-center gap-2">
          <span className="text-[#1A2C50]">◆</span>
          Ensure good lighting
        </li>

        <li className="flex items-center gap-2">
          <span className="text-[#1A2C50]">◆</span>
          Keep your face visible
        </li>

        <li className="flex items-center gap-2">
          <span className="text-[#1A2C50]">◆</span>
          Avoid switching tabs
        </li>
      </ul>

      {/* Success message */}
      <div className="flex items-center justify-center gap-2 text-green-600 text-[14px] font-medium mt-2">
        <CircleCheckBig size={18} />
        You're all set – give it your best
      </div>
    </div>
  );
}
