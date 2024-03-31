export default function CategoryList({ categories, setCategory }) {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto py-16 sm:py-24 lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          {/* Start with a 3-column grid layout, adjust for larger screens if necessary */}
          <div className="mt-6 grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="group relative">
                <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg bg-white">
                  <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-sm text-gray-500">
                    <button onClick={() => setCategory(category.name)}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </button>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
