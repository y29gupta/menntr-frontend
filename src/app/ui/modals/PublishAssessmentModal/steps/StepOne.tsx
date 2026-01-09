import { AssessmentData } from '../types';
import { CARD } from '../constants';

export default function StepOne({ data }: { data: AssessmentData }) {
  return (
    <div className="">
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">Assessment Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className={CARD}>
          <Item label="Assessment Name" value={data.title} />
          <Item label="Category" value="Aptitude" />
          <Item label="Assessment Type" value="Practice" />
          <Item label="Question Type" value="MCQ" />
        </div>

        <div className={CARD}>
          <Item label="Total Questions" value={data.questions.length} />
          <Item label="Total Marks" value={data.totalMarks} />
          <Item label="Difficulty Mix" value="Easy (10) • Medium (12) • Hard (8)" />
          <Item label="Mandatory" value="Yes" />
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: any }) {
  return (
    <div className="mb-3 last:mb-0 border-b border-[#C3CAD9]">
      <p className="text-[12px] text-[#667085]">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-[#101828]">{value}</p>
    </div>
  );
}
