import { Module } from "@/app/lib/api/fetchModules";

const ModuleSelector = ({ modules, selectedModules, register }: any) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {modules.map((m: Module) => (
      <label
        key={m.id}
        className={`px-4 py-2 rounded-full cursor-pointer text-sm border
          ${
            selectedModules.includes(String(m.id))
              ? "bg-purple-100 text-purple-700 border-purple-300"
              : "bg-gray-100 text-gray-600 border-gray-200 hover:border-purple-300"
          }`}
      >
        <input
          type="checkbox"
          value={m.id}
          {...register("selectedModules")}
          className="sr-only"
        />
        {selectedModules.includes(String(m.id)) && "✓ "} {m.name}
      </label>
    ))}
  </div>
);

export default ModuleSelector;
