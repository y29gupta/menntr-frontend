'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import FormDropdown from '@/app/ui/FormDropdown';

type Props = {
  code: string;
  setCode: (v: string) => void;
  onRun: () => void;
};

const LANGUAGE_OPTIONS = [
  { label: 'Python', value: 'python' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'C++', value: 'cpp' },
];

export default function CodeEditor({ code, setCode, onRun }: Props) {
  const [language, setLanguage] = useState('python');

  return (
    <div className="h-full border border-[#C3CAD9] rounded-xl bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <span className="text-[14px] font-medium text-[#1A2C50]">Code Editor</span>

        <div className="flex items-center gap-3">
          <div className="">
            <FormDropdown
              value={language}
              placeholder="Language"
              options={LANGUAGE_OPTIONS}
              onChange={(v) => setLanguage(v as string)}
              triggerClassName="border-none px-5 py-0 text-sm text-[#636771]"
            />
          </div>

          <button
            onClick={onRun}
            className="px-4 py-1.5 text-sm font-semibold text-[#904BFF]! border border-[#904BFF] rounded-full cursor-pointer"
          >
            Run Code
          </button>
        </div>
      </div>

      <hr className="text-[#C3CAD9] mx-4 my-1 flex-shrink-0" />

      {/* Editor - takes remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(v) => setCode(v ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            overviewRulerLanes: 0,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
