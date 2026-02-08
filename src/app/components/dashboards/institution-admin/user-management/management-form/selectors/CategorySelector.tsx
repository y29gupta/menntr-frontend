type Category = {
  id: number;
  name: string;
};

type Props = {
  selectedCategory?: string;
  register: any;
  categories: Category[];
};

const CategorySelector = ({ selectedCategory, register, categories }: Props) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-sm font-medium text-gray-700">
        Assign Role <span className="text-red-500">*</span>
      </h4>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const selected = selectedCategory === cat.name;

          return (
            <label
              key={cat.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm
                ${
                  selected
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                }`}
            >
              <input
                type="radio"
                value={cat.name}
                {...register('roleCategory')}
                className="sr-only"
              />
              {selected && <span>✓</span>}
              {cat.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
