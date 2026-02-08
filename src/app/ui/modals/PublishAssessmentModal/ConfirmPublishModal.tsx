export function ConfirmPublishModal({
  onCancel,
  onPublish,
}: {
  onCancel: () => void;
  onPublish: () => void;
}) {
  return (
    <>
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      <div className="relative  rounded-xl   ">
        <h3 className="text-[18px] font-semibold text-[#0F172A]">Confirmation</h3>

        <p className="mt-2 text-[14px] text-[#667085]">
          Once published, this assessment will be visible to students. You can edit questions but
          cannot change the assigned audience.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={onPublish}
            className="h-11 rounded-full bg-gradient-to-r from-[#904BFF] to-[#C053C2] !text-white text-[14px] font-medium"
          >
            Publish Assessment
          </button>

          <button
            onClick={onCancel}
            className="h-11 rounded-full border border-[#D0D5DD] text-[14px] text-[#344054]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
