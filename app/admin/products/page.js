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
        }, 200);

        return () => clearTimeout(timeout);
    }, [search]);
    // const editProduct = async (id) => {
    //     await fetch(`/api/admin/products/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     });
    // };

    const deleteProduct = async (id) => {
        console.log("Deleting:", id);

        const res = await fetch(`/api/admin/products/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        console.log("Response:", data);

        if (data.success) {
            setProducts(prev => prev.filter(p => String(p._id) !== String(id)));
        } else {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="
p-4
sm:p-6
md:p-8
lg:p-10
">
            <h1 className="
text-2xl
sm:text-3xl
font-bold
text-black
mb-6
">All Products</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
mb-6
sm:mb-8
w-full
px-4
py-3
rounded-xl
border
border-gray-300
bg-white
text-black
placeholder-gray-500
focus:outline-none
focus:ring-2
focus:ring-yellow-500
"
            />

            <div className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-3
sm:gap-4
md:gap-6
">
                {products.map(product => (
                    <div key={product._id} className="
bg-[#111]
p-3
sm:p-4
rounded-xl
shadow-lg
hover:scale-[1.02]
transition
">

                        {product.image && (
                            <img
                                src={product.image}
                                className="w-full h-40 object-cover rounded"
                            />
                        )}

                        <h2 className="
mt-2
text-sm
sm:text-base
md:text-lg
font-medium
line-clamp-2
">{product.title}</h2>
                        <p className="
text-green-400
font-semibold
text-sm
sm:text-base
">₹{product.price}</p>

                        <div className="
flex
flex-col
sm:flex-row
gap-2
mt-3
">
                            <button
                                onClick={() => deleteProduct(product._id)}
                                className="
w-full
bg-red-500
py-2
rounded
text-sm
hover:bg-red-600
"
                            >
                                Delete
                            </button>

                            <SmartLink href={`/admin/products/${product._id}`}>
                                <button className="
w-full
bg-yellow-500
py-2
rounded
text-sm
hover:bg-yellow-600
">
                                    Edit
                                </button>
                            </SmartLink>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}