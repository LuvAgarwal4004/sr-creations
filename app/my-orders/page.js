"use client";

import { useEffect, useState } from "react";
import SmartLink from "@/components/SmartLink";

export default function MyOrdersPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/my-orders");

    const data = await res.json();

    setOrders(data);
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";
      case "confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";

      case "returned":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="
      min-h-screen
      bg-gray-50
      p-4
      md:p-8
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        <div className="mb-10">

          <h1 className="
            text-4xl
            font-bold
            text-gray-900
          ">
            My Orders
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Track your recent purchases
          </p>

        </div>
        {orders.length === 0 && (
          <div className="
    bg-white
    rounded-3xl
    border
    shadow-sm
    p-16
    text-center
  ">

            <div className="
      w-24
      h-24
      mx-auto
      mb-6
      rounded-full
      bg-gray-100
      flex
      items-center
      justify-center
      text-5xl
    ">
              📦
            </div>

            <h2 className="
      text-2xl
      font-bold
      text-gray-900
      mb-3
    ">
              No Orders Yet
            </h2>

            <p className="
      text-gray-500
      max-w-md
      mx-auto
      mb-8
    ">
              Looks like you haven’t placed any orders yet.
              Start exploring and place your first order.
            </p>

            <SmartLink href="/">
              <button className="
        bg-black
        text-white
        px-8
        py-3
        rounded-2xl
        hover:bg-gray-800
        transition
      ">
                Continue Shopping
              </button>
            </SmartLink>

          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-6
              "
              >

                {/* TOP */}
                <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
                mb-6
              ">

                  <div>

                    <p className="
                    text-gray-500
                    mt-1
                  ">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="
                  flex
                  items-center
                  gap-4
                  flex-wrap
                ">

                    <div className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${getStatusColor(order.status)}
                  `}>
                      {order.status}
                    </div>

                  </div>

                </div>

                {/* ITEMS */}
                <div className="space-y-4">

                  {order.items.map((item, index) => (

                    <div
                      key={index}
                      className="
                      flex
                      items-center
                      gap-4
                      border
                      rounded-2xl
                      p-4
                    "
                    >

                      <img
                        src={item.image}
                        className="
                        w-24
                        h-24
                        object-cover
                        rounded-xl
                      "
                      />

                      <div className="flex-1">

                        <h3 className="
                        font-semibold
                        text-lg
                      ">
                          {item.name}
                        </h3>

                        <p className="
                        text-gray-500
                        mt-1
                      ">
                          Qty: {item.qty}
                        </p>

                      </div>
                      {
                        item.discountPercent > 0 && (
                          <p className="
      text-red-500
      text-sm
    ">
                            {item.discountPercent}% OFF
                          </p>
                        )
                      }

                      <div className="
                      font-bold
                      text-lg
                    ">
                        ₹{item.finalPrice * item.qty}
                      </div>

                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="
                flex
                justify-end
                mt-6
              ">

                  {/* <div className="
                  bg-gray-900
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  text-lg
                  font-bold
                ">
                    Total ₹{order.total}
                  </div> */}
                  <div className="space-y-2 border-t pt-4">

                    <div className="flex justify-between">
                      <span>Original Amount</span>
                      <span>₹{order.originalAmount}</span>
                    </div>

                    <div className="flex justify-between text-red-500">
                      <span>Discount</span>
                      <span>-₹{order.discountAmount}</span>
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

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {order.shippingCost === 0
                          ? "FREE"
                          : `₹${order.shippingCost}`}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>

                  </div>

                </div>
                {/* <a
                  href={`/api/order/${order._id}/invoice`}
                  target="_blank"
                >
                  Download Invoice
                </a> */}
              </div>

            ))}

          </div>
        )}

      </div>

    </div>

  );
}