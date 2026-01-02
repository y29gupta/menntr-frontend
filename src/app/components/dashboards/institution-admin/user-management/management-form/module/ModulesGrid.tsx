'use client';

import ModuleCard from './ModuleCard';

const ModulesGrid = ({ selectedModules, moduleOptions, onOpenPermissions }: any) => {
  return (
    <div
      className="grid gap-4 w-full max-w-7xl"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
    >
      {selectedModules.map((m: string) => (
        <ModuleCard
          key={m}
          moduleName={m}
          options={moduleOptions[m]}
          onSetPermissions={() => onOpenPermissions(m)}
        />
      ))}
    </div>
  );
};

export default ModulesGrid;
