type Props = {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};
export default function AssessmentFooter({ currentIndex, total, onPrev, onNext, onSubmit }: Props) {
  return (
    <div className="py-4   flex justify-center gap-4 bg-[#F7F6FB]">
      {/* <button className="px-6 py-2 rounded-full border text-sm font-medium">Prev Question</button>

      <button className="px-6 py-2 rounded-full bg-purple-600 text-white text-sm font-medium">
        Next Question
      </button> */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="px-6 py-2 rounded-full border border-[#904BFF] !text-[#904BFF] text-sm font-medium"
        >
          Prev Question
        </button>
      )}

      {currentIndex === total - 1 ? (
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded-[64px] bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white text-sm font-medium"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-[64px] bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white text-sm font-medium"
        >
          Next Question
        </button>
      )}
    </div>
  );
}
