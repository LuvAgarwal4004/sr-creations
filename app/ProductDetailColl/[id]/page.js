import ProductZoom from "@/components/ProductZoom";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import AddToCartButton from "@/components/AddToCartButton";


export default async function ProductPage({ params }) {
  const { id } = await params;

  // "cap-1"
  const [collectionId, seq] = id.split("-");

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products?collectionId=${collectionId}`
  );
  const products = await res.json();

  const trend = products.find(
    p => p.sequence === Number(seq)
  );
  const displayPrice =
    trend.isDiscount
      ? Number(trend.discountedPrice)
      : Number(trend.price);

  const taxableAmount =
    displayPrice / 1.18;

  const gstAmount =
    displayPrice - taxableAmount;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <FilterSidebar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

          <div className="mb-4">
            <MobileFilterDrawer />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT: Image + Zoom */}
            <div className="lg:w-auto">
              <ProductZoom image={trend.image} />
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex-1 min-w-[300px] space-y-6 lg:sticky lg:top-10 h-fit">

              <h1 className="text-2xl sm:text-3xl font-bold">
                {trend.title}
              </h1>
              {trend.isDiscount ? (
                <div>

                  <p className="line-through text-gray-400">
                    ₹{trend.price}
                  </p>

                  <p className="text-green-600 text-3xl font-bold">
                    ₹{trend.discountedPrice}
                  </p>
                  <p className="text-sm text-gray-500">
                    Inclusive of GST
                  </p>

                  <p className="text-sm text-gray-600">
                    Exclusive of GST: ₹{taxableAmount.toFixed(2)}
                  </p>

                  {/* <p className="text-sm text-gray-600">
                    GST (18%): ₹{gstAmount.toFixed(2)}
                  </p> */}

                  <span
                    className="
      inline-block
      bg-red-600
      text-white
      px-3
      py-1
      rounded-full
      mt-2
      text-sm
    "
                  >
                    {trend.discountPercent}% OFF
                  </span>

                </div>
              ) : (
                <>
                  <p className="text-xl sm:text-2xl text-green-600 font-semibold">
                    ₹{trend.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Inclusive of GST
                  </p>

                  <p className="text-sm text-gray-600">
                    Exclusive of GST: ₹{taxableAmount.toFixed(2)}
                  </p>
                </>
              )}

              <p className="text-gray-600">
                {trend.description}
              </p>
              <div className="border-t pt-5">

                <h2 className="font-bold text-xl mb-3">
                  Specifications
                </h2>

                <p className="text-gray-700 whitespace-pre-wrap">
                  {trend.specifications}
                </p>

              </div>

              <AddToCartButton id1={collectionId} id2={seq} image={trend.image} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}