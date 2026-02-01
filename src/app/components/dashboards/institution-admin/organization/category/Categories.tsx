import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { CategoryFormData, CategoryApiItem } from './category.types';
import CategoryForm from './CategoryForm';
import { getCategories, getCategoryById } from '@/app/lib/institutions.api';
import { useQuery } from '@tanstack/react-query';

// const categoriesData = [
//   {
//     name: 'Engineering',
//     departments: 5,
//     students: 900,
//     head: 'Dr. Ram Shankar',
//     code: 'Eng',
//   },
//   {
//     name: 'Agriculture',
//     departments: 2,
//     students: 300,
//     head: 'Dr. Haritha',
//     code: 'Eng',
//   },
//   {
//     name: 'Management',
//     departments: 3,
//     students: 500,
//     head: 'Dr. Mathew',
//     code: 'Eng',
//   },
// ];

type Props = {
  setCategoryView: (view: 'list' | 'form') => void;
};

export default function Categories({ setCategoryView }: Props) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedFormData, setSelectedFormData] = useState<CategoryFormData | null>(null);

  const institutionId = 'INSTITUTION_ID';

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<CategoryApiItem[]>({
    queryKey: ['categories', institutionId],
    queryFn: () => getCategories(institutionId),
    enabled: !!institutionId,
  });
  console.log(categories, 'category list');

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
    <div className="mt-6 px-4 ">
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
        {categories.map((category) => (
          // <CategoryCard
          //   key={category.name}
          //   {...category}
          //   onEdit={() => {
          //     setSelectedFormData({
          //       name: category.name,
          //       code: category.code,
          //       assignedUserId: '', // comes from details API later
          //       departments: [], // comes from details API later
          //     });

          //     setView('edit');
          //   }}
          // />
          <CategoryCard
            key={category.id}
            category={{
              ...category,
              departments: category.departmentCount,
              students: 0, // API doesn't give this yet
            }}
            onEdit={async () => {
              // Fetch full category details including program
              try {
                const categoryDetails = await getCategoryById(String(category.id));
                setSelectedFormData({
                  id: String(categoryDetails.id),
                  name: categoryDetails.name,
                  code: categoryDetails.code,
                  programs: categoryDetails.program
                    ? [
                        {
                          program_code: categoryDetails.program.program_code,
                          program_name: categoryDetails.program.program_name,
                        },
                      ]
                    : [],
                });
              } catch (error) {
                // Fallback to basic data if fetch fails
                setSelectedFormData({
                  id: String(category.id),
                  name: category.name,
                  code: category.code,
                  programs: [],
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