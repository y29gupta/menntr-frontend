import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { CategoryFormData } from './category.types';
import CategoryForm from './CategoryForm';

const categoriesData = [
  {
    name: 'Engineering',
    departments: 5,
    students: 900,
    head: 'Dr. Ram Shankar',
    code: 'Eng',
  },
  {
    name: 'Agriculture',
    departments: 2,
    students: 300,
    head: 'Dr. Haritha',
    code: 'Eng',
  },
  {
    name: 'Management',
    departments: 3,
    students: 500,
    head: 'Dr. Mathew',
    code: 'Eng',
  },
];

type Props = {
  setCategoryView: (view: 'list' | 'form') => void;
};

export default function Categories({ setCategoryView }: Props) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedFormData, setSelectedFormData] = useState<CategoryFormData | null>(null);

  useEffect(() => {
    setCategoryView(view === 'list' ? 'list' : 'form');

    return () => setCategoryView('list');
  }, [view, setCategoryView]);

  if (view !== 'list') {
    return (
      <CategoryForm
        mode={view}
        defaultValues={selectedFormData ?? undefined}
        onCancel={() => setView('list')}
        onSubmitSuccess={() => setView('list')}
      />
    );
  }
  return (
    <div className="mt-6">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Total Categories ({categoriesData.length})
        </h2>

        <button
          onClick={() => {
            setSelectedFormData(null);
            setView('add');
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 !text-white px-5 py-2 rounded-full text-sm font-medium shadow"
        >
          <span className="text-lg leading-none">+</span>
          Add Categories
        </button>
      </div>

      {/* Cards Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <CategoryCard
            key={category.name}
            {...category}
            onEdit={() => {
              setSelectedFormData({
                name: category.name,
                code: category.code,
                assignedUserId: '', // comes from details API later
                departments: [], // comes from details API later
              });

              setView('edit');
            }}
          />
        ))}
      </div>
    </div>
  );
}
