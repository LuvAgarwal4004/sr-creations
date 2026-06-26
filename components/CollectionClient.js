"use client";

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import SmartLink from "./SmartLink";
import Image from "next/image";

export default function CollectionClient({
  products,
  collectionId,
}) {
  const [maxPrice, setMaxPrice] = useState(5000);

  // FILTER PRODUCTS
  const filteredProducts = products.filter(
    product => Number(product.price) <= maxPrice
  );

  return (
  <div className="min-h-screen bg-gray-50">

    <div className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-10
      flex
      gap-10
    ">

      {/* SIDEBAR */}
      <div className="shrink-0">
        <FilterSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>

      {/* PRODUCTS */}
      <div className="flex-1 min-w-0">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Collection
          </h1>

          <p className="text-gray-500 mt-2">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        ">
          {filteredProducts.map((product) => (
            <SmartLink
              key={product._id}
              href={`/ProductDetailColl/${collectionId}-${product.sequence}`}
            >
              <div className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                group
              ">

                {/* IMAGE */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h3 className="
                    font-semibold
                    text-lg
                    text-gray-900
                  ">
                    {product.title}
                  </h3>

                  <p className="
                    text-gray-500
                    mt-2
                  ">
                    ₹{product.price}
                  </p>

                </div>

              </div>
            </SmartLink>
          ))}
        </div>

      </div>

    </div>

  </div>
);
}