import { CategoryType } from '../lib/types';

export default function CategoryCheckbox({
  category,
  selectedCategories,
  onChange,
}: {
  category: CategoryType;
  selectedCategories: CategoryType[];
  onChange: (categories: CategoryType[]) => void;
}) {
  const isChecked = selectedCategories.some((cat) => cat.id === category.id);

  const handleCheckboxChange = () => {
    if (isChecked) {
      onChange(selectedCategories.filter((cat) => cat.id !== category.id));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div key={category.id} className='flex items-center'>
      <input
        type='checkbox'
        id={`category-${category.id}`}
        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={`category-${category.id}`}
        className='ml-2 text-sm cursor-pointer'
      >
        {category.name}
      </label>
    </div>
  );
}
