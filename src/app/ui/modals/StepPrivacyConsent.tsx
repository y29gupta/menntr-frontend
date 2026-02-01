type Props = {
  consentChecked: boolean;
  setConsentChecked: (v: boolean) => void;
};

export default function StepPrivacyConsent({
  consentChecked,
  setConsentChecked,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[16px] text-[#1A2C50]">Privacy & Permissions</h3>

      <p className="text-[14px] text-[#1A2C50] font-medium">
        We use your microphone and camera only during this assessment to:
      </p>

      <ul className="flex flex-col gap-3 text-[14px] text-[#344054]">
        <li className="flex items-center gap-2">
          <span>◆</span>
          Prevent malpractice
        </li>

        <li className="flex gap-2">
          <span>◆</span>
          Ensure fair evaluation
        </li>

        <li className="flex gap-2">
          <span>◆</span>
          Maintain test integrity
        </li>

        <li className="text-[#344054] mt-1 font-medium">
          Your data is not stored beyond the assessment.
        </li>
      </ul>

      <div className="h-px bg-[#E4E7EC]" />

      <label className="flex items-start gap-2 cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="
            mt-0.75
            peer
            relative
            h-4
            w-4
            appearance-none
            rounded
            border
            border-gray-300
            checked:border-transparent
            checked:bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
            checked:after:content-['✔']
            checked:after:absolute
            checked:after:inset-0
            checked:after:flex
            checked:after:items-center
            checked:after:justify-center
            checked:after:text-[11px]
            checked:after:text-white
          "
        />

        <span className="text-[14px] font-medium text-[#1A2C50] leading-tight">
          I consent to audio and video access for this assessment
        </span>
      </label>
    </div>
  );
}
