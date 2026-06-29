"use client";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Product Added 🔥");
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
          Add Product
        </h1>

        <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-zinc-800">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}