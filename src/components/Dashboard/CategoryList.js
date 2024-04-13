export default function CategoryList({ categories, handleChangeCategory }) {
  return (
    <div className="mx-auto py-4 lg:py-8">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="my-9 grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group relative hover:underline m-1"
          >
            <button onClick={() => handleChangeCategory(category.name)}>
              <span className="absolute inset-0" />
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}
