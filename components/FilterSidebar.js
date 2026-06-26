"use client";
export default function FilterSidebar({
  maxPrice,
  setMaxPrice,
}) {
  return (
    <aside className="
      hidden lg:block
      w-64
      bg-white
      border-r
      p-6
      sticky top-24 h-fit
    ">
      <h2 className="text-2xl font-bold mb-8">
        Filters
      </h2>

      <div className="mb-10">
        <div className="flex justify-between mb-3">
          <h3 className="font-medium">
            Price Range
          </h3>

          <span className="text-sm text-gray-500">
            ₹{maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="
            w-full
            accent-black
            cursor-pointer
          "
        />

        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>₹0</span>
          <span>₹5000</span>
        </div>
      </div>
    </aside>
  );
}