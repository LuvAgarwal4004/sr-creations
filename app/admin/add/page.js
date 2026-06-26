"use client";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router=useRouter();

  const handleSubmit = async (data) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    
    if (res.ok) {
      alert("Product Added 🔥");
      router.push("/admin"); 
  }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-6">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}