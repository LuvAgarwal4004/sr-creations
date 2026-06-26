import CollectionClient from "@/components/CollectionClient";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/products?collectionId=${id}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <CollectionClient
      products={products}
      collectionId={id}
    />
  );
}