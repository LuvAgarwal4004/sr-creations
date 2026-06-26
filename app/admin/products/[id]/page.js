"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import Loading from "@/app/loading";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/products/${id}`);
      const data = await res.json();
      console.log("Fetched product:", data);
      setForm(data);
    };

    fetchProduct();
  }, [id]);

  if (!form) return <p><Loading /></p>;

  const handleUpdate = async (updatedData) => {
    console.log("BEFORE FETCH");
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    console.log("BEFORE ALERT");
    if (data.success) {
      alert("Updated 🔥");
      router.push("/admin/products");
    }
    console.log("AFTER ALERT");
  };

  return (
    <div className="p-10 text-white max-w-2xl mx-auto">
      <h1 className="text-3xl mb-6 font-bold">Edit Product</h1>

      <ProductForm
        initialData={form}
        onSubmit={handleUpdate}
      />
    </div>
  );
}