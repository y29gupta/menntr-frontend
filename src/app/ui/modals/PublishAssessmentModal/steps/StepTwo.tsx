import { CARD } from '../constants';
export type AssessmentAssignedToResponse = {
  institutionCategory: string;
  department: string;
  batches: string[];
};

export default function StepTwo({ assignedTo }: { assignedTo: AssessmentAssignedToResponse }) {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">Assigned To</h3>

      <div className={CARD}>
        <Item label="Institution Category" value={assignedTo.institutionCategory} />
        <Item label="Department" value={assignedTo.department} />
        <Item label="Batch" value={assignedTo.batches.join(',')} />
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
