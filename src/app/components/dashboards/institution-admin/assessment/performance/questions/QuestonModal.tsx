import { X } from 'lucide-react';

type ModalSection = {
  title: string;
  content: React.ReactNode;
};

type QuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  metadata: string;
  sections: ModalSection[];
};

function QuestionModal({ isOpen, onClose, title, metadata, sections }: QuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#101828] break-words">
              {title}
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#667085] break-words">{metadata}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} className="sm:hidden text-[#667085]" />
            <X size={24} className="hidden sm:block text-[#667085]" />
          </button>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-4 sm:space-y-6">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-[#101828]">
                {section.title}
              </h3>
              <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 sm:p-6">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
