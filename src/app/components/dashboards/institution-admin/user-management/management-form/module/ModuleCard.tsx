'use client';

const ModuleCard = ({ moduleName, options, onSetPermissions }: any) => {
  return (
    <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 shadow-sm flex flex-col">
      <header className="font-semibold text-gray-700 text-base pb-4 border-b border-gray-200">
        {moduleName}
      </header>

      <div className="space-y-4 mt-4 flex-grow">
        {options.map((opt: string, index: number) => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={index === 0}
              className="w-5 h-5 shrink-0 rounded border-2 border-gray-300"
            />
            <span className={index === 0 ? 'text-gray-700 font-medium' : 'text-gray-600'}>
              {opt}
            </span>
          </label>
        ))}
      </div>

      <footer className="pt-4 mt-4 border-t border-gray-200 text-[#7B3AEC]">
        <button type="button" onClick={onSetPermissions} className="w-full font-semibold text-base">
          Set Permissions
        </button>
      </footer>
    </div>
  );
};

export default ModuleCard;
