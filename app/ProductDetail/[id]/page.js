import ProductZoom from "@/components/ProductZoom";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
    cache: "no-store"
  });
  const trend = await res.json();
  if (!trend) {
    return <div>Product not found</div>;
  }
  const displayPrice =
    trend.isDiscount
      ? Number(trend.discountedPrice)
      : Number(trend.price);

  const taxableAmount =
    displayPrice / 1.18;

  const gstAmount =
    displayPrice - taxableAmount;
  return (
    <div className="min-h-screen bg-gradient-to-br
from-slate-50
via-blue-50
to-indigo-50 flex">
      <FilterSidebar />

      <main className="flex-1">
        <div
          className="
max-w-[1400px]
mx-auto
px-4
sm:px-6
lg:px-8
py-8
"
        >

          {/* <div className="mb-4">
            <MobileFilterDrawer />
          </div> */}

          <div
            className="
  bg-white
  rounded-3xl
  shadow-lg
  border
  border-gray-200
  overflow-hidden
  lg:flex
"
          >

            {/* LEFT: Image + Zoom */}
            <div
              className="
    w-full
    xl:w-1/2
    bg-gray-50
    p-4
    sm:p-6
    lg:p-8
    flex
    justify-center
    items-center
    border-b
    xl:border-b-0
    xl:border-r
  "
            >
              <ProductZoom image={trend.image} />
            </div>

            {/* RIGHT: Product Info */}
            <div
              className="
flex-1
bg-white
rounded-3xl
shadow-lg
border
border-gray-200
p-6
sm:p-8
space-y-8
xl:sticky
xl:top-8
h-fit
"
            >

              <h1
                className="
text-3xl
lg:text-4xl
font-bold
leading-tight
text-gray-900
"
              >
                {trend.title}
              </h1>
              {trend.isDiscount ? (
                <div
                  className="
bg-gray-50
border
rounded-2xl
p-5
space-y-2
"
                >

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
                  {/* 
                  <p className="text-sm text-gray-600">
                    GST (18%): ₹{gstAmount.toFixed(2)}
                  </p> */}

                  <span
                    className="
      inline-flex
items-center
rounded-full
bg-red-100
text-red-600
font-semibold
px-4
py-1
text-sm
    "
                  >
                    {trend.discountPercent}% OFF
                  </span>

                </div>
              ) : (<>
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
              <div
                className="
bg-white
border
rounded-2xl
p-5
"
              >
                <h2 className="font-semibold text-lg mb-3">
                  Description
                </h2>
                <p className="text-gray-600 tracking-wide leading-7">
                  {trend.description}
                </p>
              </div>
              {/* <div className="border-t pt-5">

                <h2 className="font-bold text-xl mb-3">
                  Specifications
                </h2> */}
              <div
                className="
bg-white
border
rounded-2xl
p-5
"
              >

                <h2 className="text-xl font-bold mb-4">
                  Specifications
                </h2>

                <p className="leading-7 text-gray-700 whitespace-pre-wrap">
                  {trend.specifications}
                </p>

              </div>
              <div
                className="
sticky
bottom-4
bg-white
pt-4
"
              >

                <AddToCartButton id2={trend._id} image={trend.image} />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}