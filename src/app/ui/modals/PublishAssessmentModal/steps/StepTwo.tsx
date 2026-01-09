import { CARD } from '../constants';

export default function StepTwo() {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">Assigned To</h3>

      <div className={CARD}>
        <Item label="Institution Category" value="Engineering" />
        <Item label="Department" value="CSE" />
        <Item label="Batch" value="CSE – 2022–26, CSE – 2023–27" />
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 last:mb-0 border-b border-[#C3CAD9]">
      <p className="text-[12px] text-[#667085]">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-[#101828]">{value}</p>
    </div>
  );
}
