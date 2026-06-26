"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";
import SmartLink from "@/components/SmartLink";

export default function OrderSuccess() {
  const params = useSearchParams();
  const id = params.get("id");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/order/${id}`);
      const data = await res.json();
      setOrder(data.order);

    };

    if (id) fetchOrder();
  }, [id]);
  useEffect(() => {

    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handleBack = () => {

      window.history.pushState(
        null,
        "",
        window.location.href
      );

    };

    window.addEventListener(
      "popstate",
      handleBack
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handleBack
      );

    };

  }, []);

  if (!order || !order.items) return <Loading />;
  // const subtotal = order.items.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );
  // const originalAmount =
  //   order.originalAmount;

  const discountAmount =
    order.discountAmount;

  const subtotal =
    order.subtotal;

  const shipping =
    order.shippingCost;

  const total =
    order.total;

  // const shipping = subtotal > 500 ? 0 : 20;

  // const total = subtotal + shipping;


  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mb-6">Order ID: {order._id}</p>

      {/* ITEMS */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              {/* <p className="text-gray-500">₹{Number(item.price)}</p> */}
              {
                item.discountPercent > 0
                  ? (
                    <>
                      <p className="line-through text-gray-400">
                        ₹{item.originalPrice}
                      </p>

                      <p className="text-green-600 font-bold">
                        ₹{item.finalPrice}
                      </p>

                      <p className="text-red-500 text-sm">
                        {item.discountPercent}% OFF
                      </p>
                    </>
                  )
                  : (
                    <p>
                      ₹{item.finalPrice}
                    </p>
                  )
              }
            </div>

            <div className="text-right">
              <p className="font-medium">Qty: {item.qty}</p>
              <p className="text-green-600 font-semibold">
                ₹{Number(item.finalPrice) * item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6 space-y-3">
        <div className="flex justify-between">
          <span>Original Amount</span>
          <span>
            ₹{order.originalAmount}
          </span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Discount Off</span>
          <span>
            - ₹{order.discountAmount}
          </span>
        </div>

        {/* <div className="flex justify-between">
          <span>Taxable Amount</span>
          <span>₹{order.taxableAmount}</span>
        </div> */}

        {order.cgst > 0 && (
          <div className="flex justify-between">
            <span>CGST</span>
            <span>₹{order.cgst}</span>
          </div>
        )}

        {order.sgst > 0 && (
          <div className="flex justify-between">
            <span>SGST</span>
            <span>₹{order.sgst}</span>
          </div>
        )}

        {order.igst > 0 && (
          <div className="flex justify-between">
            <span>IGST</span>
            <span>₹{order.igst}</span>
          </div>
        )}
        {/* <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{Number(subtotal || 0).toFixed(2)}</span>
        </div> */}

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE 🚚" : `₹${shipping}`}
          </span>
        </div>

        {shipping === 0 && (
          <p className="text-sm text-green-600">
            🎉 You got free shipping on orders above ₹500!
          </p>
        )}

        <div className="flex justify-between text-lg font-bold border-t pt-3">
          <span>Total</span>
          <span>₹{Number(total || 0).toFixed(2)}</span>
        </div>
        <div className="mt-8">

          {
            order?._id && (
              <SmartLink
                href={`/track-order`}
              >

                <button className="
      w-full
      bg-black
      text-white
      py-4
      rounded-2xl
      font-semibold
      hover:bg-gray-800
      transition
    ">
                  Track Order
                </button>

              </SmartLink>
            )
          }

        </div>

      </div>

    </div>

  );
}