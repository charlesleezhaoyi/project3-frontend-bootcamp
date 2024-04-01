export default function CategoryList({ categories, setCategory }) {
  return (
    // <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border border-black">
    <div className="mx-auto py-4 lg:py-8">
      <h2 className="text-2xl font-bold">Categories</h2>
      {/* Start with a 3-column grid layout, adjust for larger screens if necessary */}
      <div className="my-9 grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="group relative">
            <button onClick={() => setCategory(category.name)}>
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
