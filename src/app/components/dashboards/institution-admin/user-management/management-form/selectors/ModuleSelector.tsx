const ModuleSelector = ({ modules, selectedModules, register }: any) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {modules.map((m: string) => (
      <label
        key={m}
        className={`px-4 py-2 rounded-full cursor-pointer text-sm border
          ${selectedModules.includes(m) ? 'bg-purple-100 text-purple-700 border border-purple-300' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'}`}
      >
        <input type="checkbox" value={m} {...register('selectedModules')} className="sr-only" />
        {selectedModules.includes(m) && '✓ '} {m}
      </label>
    ))}
  </div>
);

export default ModuleSelector;
