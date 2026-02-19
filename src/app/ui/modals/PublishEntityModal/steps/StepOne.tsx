import { CARD } from '../constants';

export default function StepOne({ data, entityLabel }: { data: any; entityLabel: string }) {
  if (!data) return null;

  return (
    <div className="">
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">{entityLabel} Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className={CARD}>
          <Item label={`${entityLabel} Name`} value={data.assessmentName ?? data.assignmentName} />

          <Item label="Category" value={data.category} />
          <Item label={`${entityLabel} Type`} value={data.assessmentType ?? data.assignmentType} />

          <Item label="Question Type" value={data.questionType} />
        </div>

        <div className={CARD}>
          <Item label="Total Questions" value={data.totalProblems} />
          <Item label="Total Marks" value={data.totalMarks} />
          <Item
            label="Difficulty Mix"
            value={`Easy (${data.difficultyMix.easy}) • Medium (${data.difficultyMix.medium}) • Hard (${data.difficultyMix.hard})`}
          />
          <Item label="Mandatory" value={data.mandatory ? 'Yes' : 'No'} />
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: any }) {
  return (
    <div className="mb-3 last:mb-0 border-b border-[#C3CAD9]">
      <p className="text-[12px]  text-[#636771]">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}
