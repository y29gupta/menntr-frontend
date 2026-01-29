import Editor from '@monaco-editor/react';

type Props = {
  code: string;
  setCode: (v: string) => void;
  onRun: () => void;
};

export default function CodeEditor({ code, setCode, onRun }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <span className="text-sm font-medium">Code Editor</span>
        <button onClick={onRun} className="text-sm text-purple-600 font-semibold">
          Run Code
        </button>
      </div>

      <Editor
        height="260px"
        language="python"
        value={code}
        onChange={(v) => setCode(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
