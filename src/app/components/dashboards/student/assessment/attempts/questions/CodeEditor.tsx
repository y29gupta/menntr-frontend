'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import FormDropdown from '@/app/ui/FormDropdown';

// type Props = {
//   code: string;
//   setCode: (v: string) => void;
//   onRun: () => void;
//   onSubmit: () => void;
//   supportedLanguages?: string[];
// };
type Props = {
  code: string;
  setCode: (v: string) => void;
  supportedLanguages: string[];
  selectedLanguage: string[];
  setSelectedLanguage: (v: string[]) => void;
  onRun: () => void;
  onSubmit: () => void;
  supportedLanguages?: string[];
  isSubmitting?: boolean;
};

export default function CodeEditor({
  code,
  setCode,
  onRun,
  onSubmit,
  supportedLanguages,
  isSubmitting,
}: Props) {
  const LANGUAGE_OPTIONS = supportedLanguages?.map((lang) => ({
    label: lang,
    value: lang.toLowerCase(),
  })) ?? [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
  ];

  // const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);

  return (
    <div className="h-full border border-[#C3CAD9] rounded-xl bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <span className="text-[14px] font-medium text-[#1A2C50]">Code Editor</span>

        <div className="flex items-center gap-3">
          <FormDropdown
            value={selectedLanguage[0]}
            placeholder="Language"
            options={LANGUAGE_OPTIONS}
            onChange={(v) => setSelectedLanguage([v as string])}
            triggerClassName="border-none px-5 py-0 text-sm text-[#636771]"
          />

          <button
            onClick={onRun}
            className="px-4 py-1.5 text-sm font-semibold text-[#904BFF]! border border-[#904BFF] rounded-full"
          >
            Run Code
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-[64px] text-sm font-medium transition-opacity ${
              isSubmitting
                ? 'bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white opacity-60 cursor-not-allowed'
                : 'bg-linear-to-r from-[#904BFF] to-[#C053C2] !text-white cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Code'}
          </button>
        </div>
      </div>

      <hr className="text-[#C3CAD9] mx-4 my-1 flex-shrink-0" />

      {/* Editor */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Editor
          height="100%"
          language={selectedLanguage[0]}
          value={code}
          onChange={(v) => setCode(v ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
