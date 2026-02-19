import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { CategoryFormData, CategoryApiItem } from './category.types';
import CategoryForm from './CategoryForm';
import { getCategories, getCategoryById } from '@/app/lib/institutions.api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  setCategoryView: (view: 'list' | 'form') => void;
};

export default function Categories({ setCategoryView }: Props) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedFormData, setSelectedFormData] = useState<CategoryFormData | null>(null);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<CategoryApiItem[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

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
    <div className="mt-6 px-4 mb-4">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Total Categories ({categories.length})
        </h2>

        <button
          onClick={() => {
            setSelectedFormData(null);
            setView('add');
          }}
          className="rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-5 py-2 text-sm !text-white cursor-pointer"
        >
          <span className="text-lg pr-2 leading-none">+</span>
          Add Categories
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={{
              ...category,
              departments: category.departmentCount,
              students: 0, // not provided by API
            }}
            onEdit={async () => {
              try {
                const categoryDetails = await getCategoryById(String(category.id));

                setSelectedFormData({
                  id: String(categoryDetails.id),
                  name: categoryDetails.name,
                  code: categoryDetails.code,
                  assignedUserId: categoryDetails.head?.id ?? '',
                });
              } catch (error) {
                // fallback
                setSelectedFormData({
                  id: String(category.id),
                  name: category.name,
                  code: category.code,
                  assignedUserId: category.head?.id ?? '',
                });
              }

              setView('edit');
            }}
          />
        ))}
      </div>
    </div>
  );
}
