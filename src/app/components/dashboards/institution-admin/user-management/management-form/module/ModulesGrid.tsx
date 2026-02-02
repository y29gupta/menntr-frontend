// 'use client';

// import { Module } from '@/app/lib/api/fetchModules';
// import ModuleCard from './ModuleCard';

// const ModulesGrid = ({ selectedModules, modules, onOpenPermissions }: any) => {
//   return (
//     <div
//       className="grid gap-4 w-full max-w-7xl"
//       style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
//     >
//       {modules
//         .filter((m: Module) => selectedModules.includes(String(m.id)))
//         .map((m: Module) => (
//           <ModuleCard
//             key={m.id}
//             module={m}
//             onSetPermissions={() => onOpenPermissions(m)}
//           />
//         ))}
//     </div>
//   );
// };

// export default ModulesGrid;

'use client';

import { Module, Feature } from '@/app/lib/api/fetchModules';
import ModuleCard from './ModuleCard';

const ModulesGrid = ({
  selectedModules,
  modules,
  onOpenPermissions,
  roleId,
}: {
  selectedModules: string[];
  modules: Module[];
  onOpenPermissions: (module: Module, features: Feature[]) => void;
  roleId?: number;
}) => {
  return (
    <div
      className="grid gap-4 w-full max-w-7xl"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
    >
      {modules
        .filter((m: Module) => selectedModules.includes(String(m.id)))
        .map((m: Module) => (
          <ModuleCard
            key={m.id}
            module={m}
            roleId={roleId}
            onSetPermissions={(features: Feature[]) => onOpenPermissions(m, features)}
          />
        ))}
    </div>
  );
};

export default ModulesGrid;
