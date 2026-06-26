import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";

export default async function AdminPage() {
  const session = await isAdmin();
  if (!session) redirect("/");

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      <div className="flex gap-6">
        <Link href="/admin/add" className="bg-blue-500 px-6 py-3 rounded">
          Add Product
        </Link>

        <Link href="/admin/products" className="bg-green-500 px-6 py-3 rounded">
          Manage Products
        </Link>

        <Link href="/admin/orders" className="bg-purple-500 px-6 py-3 rounded">
          Orders
        </Link>
      </div>
    </div>
  );
}