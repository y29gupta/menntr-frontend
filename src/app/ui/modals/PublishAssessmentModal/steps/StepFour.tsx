import { CARD } from '../constants';

export default function StepFour() {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-medium text-[#101828]">Student Access</h3>

      <div className={CARD}>
        <Check label="Shuffle Questions" defaultChecked />
        <Check label="Shuffle Options" defaultChecked />
        <Check label="Allow Re-attempts" />
        <Check label="Show correct answers after submission" />
        <Check label="Show score immediately" />
      </div>
    </div>
  );
}

function Check({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="mb-3 flex items-center gap-3 last:mb-0 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="
      h-5 w-5
      appearance-none
      rounded
      border border-[#D0D5DD]
      checked:bg-gradient-to-r
      checked:from-[#904BFF]
      checked:to-[#C053C2]
      checked:border-none
      relative
      checked:after:content-['✔']
      checked:after:absolute
      checked:after:text-white
      checked:after:text-sm
      checked:after:left-1/2
      checked:after:top-1/2
      checked:after:-translate-x-1/2
      checked:after:-translate-y-1/2
    "
      />
      <span className="text-[16px] text-[#636771]">{label}</span>
    </label>
  );
}
