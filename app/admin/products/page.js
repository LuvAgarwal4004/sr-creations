"use client";
import SmartLink from "@/components/SmartLink";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchProducts = async () => {
                const url = search
                    ? `/api/products?search=${search}`
                    : `/api/admin/products`;

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            };

            fetchProducts();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const deleteProduct = async (id) => {
        const res = await fetch(`/api/admin/products/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            setProducts((prev) =>
                prev.filter((p) => String(p._id) !== String(id))
            );
            toast.success("Product deleted");
        } else {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Products
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all your products
                </p>
            </div>

            {/* Search */}
            <div className="max-w-7xl mx-auto mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="
            w-full
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-5
            py-4
            text-black
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-500
          "
                />
            </div>

            {/* Products Grid */}
            <div
                className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
            >
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-md
              border
              hover:shadow-xl
              transition-all
              duration-300
            "
                    >
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="
                  w-full
                  h-56
                  object-cover
                "
                            />
                        )}

                        <div className="p-5">

                            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                {product.title}
                            </h2>

                            <p className="text-green-600 font-bold text-xl mt-2">
                                ₹{product.price}
                            </p>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-2.5
                    rounded-xl
                    font-medium
                    transition
                  "
                                >
                                    Delete
                                </button>

                                <SmartLink
                                    href={`/admin/products/${product._id}`}
                                    className="flex-1"
                                >
                                    <button
                                        className="
                      w-full
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-black
                      py-2.5
                      rounded-xl
                      font-medium
                      transition
                    "
                                    >
                                        Edit
                                    </button>
                                </SmartLink>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {products.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
}