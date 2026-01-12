type Props = {
  selectedCategory?: string;
  register: any;
  categories: string[];
};

const CategorySelector = ({ selectedCategory, register, categories }: Props) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-sm font-medium text-gray-700">Role Category</h4>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const selected = selectedCategory === cat;

          return (
            <label
              key={cat}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm
                ${
                  selected
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
                }`}
            >
              <input type="radio" value={cat} {...register('roleCategory')} className="sr-only" />
              {selected && <span>✓</span>}
              {cat}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
