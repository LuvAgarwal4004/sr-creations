"use client";

import { useState } from "react";

export default function MobileFilterDrawer({
  maxPrice,
  setMaxPrice,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          px-5 py-3
          rounded-xl
          border
          bg-white
          shadow-sm
        "
      >
        Filters
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`
          fixed top-0 left-0
          h-full w-80
          bg-white z-50
          transition-transform duration-300
          p-6
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="mb-8 text-gray-500"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-8">
          Filters
        </h2>

        <div>
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
            "
          />

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>₹0</span>
            <span>₹5000</span>
          </div>
        </div>
      </div>
    </>
  );
}