type Props = {
  consentChecked: boolean;
  setConsentChecked: (v: boolean) => void;
};

export default function StepPrivacyConsent({
  consentChecked,
  setConsentChecked,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[16px] text-[#1A2C50]">
        Privacy & Permissions
      </h3>

      <p className="text-[14px] font-medium text-[#1A2C50]">
        We use your microphone and camera only during
        this assessment to:
      </p>

      <ul className="flex flex-col gap-2 text-[14px] text-[#344054]">
        <li className="flex gap-2">
          <span>◆</span> Prevent malpractice
        </li>
        <li className="flex gap-2">
          <span>◆</span> Ensure fair evaluation
        </li>
        <li className="flex gap-2">
          <span>◆</span> Maintain test integrity
        </li>
      </ul>

      <p className="text-[14px] font-medium text-[#344054]">
        Your data is not stored beyond the assessment.
      </p>

      <div className="h-px bg-[#E4E7EC]" />

      <label className="flex gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) =>
            setConsentChecked(e.target.checked)
          }
          className="h-4 w-4"
        />

        <span className="text-[14px] font-medium text-[#1A2C50]">
          I consent to audio and video access for this
          assessment
        </span>
      </label>
    </div>
  );
}
