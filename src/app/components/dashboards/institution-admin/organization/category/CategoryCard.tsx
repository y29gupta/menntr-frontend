import CardEditIcon from '../../../../icons/CardEditIcon';
import { CategoryApiItem } from './category.types';

type Props = {
  category: CategoryApiItem & {
    departments?: number;
    students?: number;
  };
  onEdit: () => void;
};

export default function CategoryCard({ category, onEdit }: Props) {
  const { name, departmentCount, code } = category;
  const departments = category.departments ?? departmentCount;
  const students = category.students ?? 0;

  const assignedUsersText = category.head?.name || '—';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-800">{name}</h3>
        <button type="button" onClick={onEdit} className="text-gray-400 hover:text-gray-600">
          <CardEditIcon />
        </button>
      </div>

      {/* Meta */}
      <div className="flex justify-between gap-6 mt-2 text-sm text-gray-500">
        <span>{departments} Departments</span>
        <span>{students} students</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-medium text-gray-700" title={assignedUsersText}>
          {assignedUsersText}
        </p>
        <span className="text-xs bg-gray-100 px-3 py-1 font-semibold rounded-lg text-gray-600">
          Code: {code}
        </span>
      </div>
    </div>
  );
}
