"use client";

import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import SmartLink from "@/components/SmartLink";
import toast from "react-hot-toast";

export default function TrackOrderPage() {

  // const { id } = useParams();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchOrder();

    const interval =
      setInterval(() => {
        fetchOrder();
      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const fetchOrder = async () => {

    try {

      const res = await fetch(
        `/api/order/live`
      );

      const data = await res.json();

      setOrders(data.order);

    } catch (err) {
    }
    setLoading(false);
  };

  const steps = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered"
  ];

  const labels = {
    pending: "Order Placed",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered"
  };

  // const currentStep = steps.indexOf(
  //   order?.status
  // );

  // LOADING
  if (loading) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
      ">
        <div className="
          animate-spin
          rounded-full
          h-20
          w-20
          border-b-4
          border-black
        " />
      </div>
    );
  }

  // NO ORDER FOUND
  if (orders.length === 0) {
    return (
      <div className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        p-6
      ">

        <div className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          p-16
          text-center
          max-w-xl
          w-full
        ">

          <div className="
            text-6xl
            mb-6
          ">
            📦
          </div>

          <h1 className="
            text-3xl
            font-bold
            mb-4
          ">
            No Active Orders
          </h1>

          <p className="
            text-gray-500
            mb-8
          ">
            You currently don't have any live
            orders to track.
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

      </div>
    );
  }
  const cancelOrder = async (orderId) => {

    const res = await fetch(
      `/api/order/${orderId}`,
      {
        method: "PATCH"
      }
    );

    const data = await res.json();

    if (data.success) {

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
              ...o,
              status: "cancelled"
            }
            : o
        )
      );

    } else {

      toast.error(data.error);

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
        <div className="space-y-10">

          {orders.map((order) => {

            const currentStep =
              steps.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="space-y-8 pb-10 border-b"
              >

                {/* HEADER */}
                <div className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-8
            mb-8
            ">

                  <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            ">

                    <div >

                      <h1 className="
                text-4xl
                font-bold
                text-gray-900
              ">
                        Track Order
                      </h1>

                      <p className="
                text-gray-500
                mt-3
              ">
                        Order ID:
                        {" "}
                        {order._id}
                      </p>

                      <p className="
                text-sm
                text-gray-400
                mt-2
              ">
                        Ordered on{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="
              bg-black
              text-white
              px-8
              py-5
              rounded-3xl
              text-center
            ">

                      <p className="
                text-sm
                opacity-70
                mb-1
              ">
                        Total
                      </p>

                      <p className="
                text-3xl
                font-bold
              ">
                        ₹{(order.total).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* CANCELLED */}
                {
                  ["cancelled", "returned"].includes(order.status) && (

                    <div className="
            bg-red-50
            border
            border-red-200
            rounded-3xl
            p-8
            mb-8
          ">

                      <h2 className={`
  text-3xl
  font-bold
  mb-3

  ${order.status === "returned"
                          ? "text-orange-700"
                          : "text-red-700"
                        }
`}>
                        {
                          order.status === "returned"
                            ? "Order Returned"
                            : "Order Cancelled"
                        }
                      </h2>

                      <p className={`
  ${order.status === "returned"
                          ? "text-orange-500"
                          : "text-red-500"
                        }
`}>
                        {
                          order.status === "returned"
                            ? "This order has been returned."
                            : "This order has been cancelled."
                        }
                      </p>

                    </div>

                  )
                }

                {/* TIMELINE */}
                {
                  !["cancelled", "returned"].includes(order.status) && (

                    <div className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-8
            mb-8
          ">

                      <h2 className="
              text-2xl
              font-bold
              mb-10
            ">
                        Delivery Progress
                      </h2>

                      <div className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-8
            ">

                        {steps.map((step, index) => {

                          const active =
                            index <= currentStep;

                          return (

                            <div
                              key={step}
                              className="
                      flex-1
                      flex
                      flex-col
                      items-center
                      text-center
                      relative
                    "
                            >

                              {/* LINE */}
                              {index !== steps.length - 1 && (
                                <div className={`
                        hidden md:block
                        absolute
                        top-5
                        left-1/2
                        w-full
                        h-1
                        z-0
                        ${active
                                    ? "bg-black"
                                    : "bg-gray-200"
                                  }
                      `} />
                              )}

                              {/* CIRCLE */}
                              <div className={`
                      relative
                      z-10
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold
                      mb-4
                      transition-all
                      ${active
                                  ? "bg-black text-white"
                                  : "bg-gray-200 text-gray-500"
                                }
                    `}>
                                {index + 1}
                              </div>

                              <p className={`
                      text-sm
                      font-semibold
                      ${active
                                  ? "text-black"
                                  : "text-gray-400"
                                }
                    `}>
                                {labels[step]}
                              </p>

                            </div>
                          );
                        })}

                      </div>

                    </div>

                  )
                }

                {/* ITEMS */}
                <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
          mb-8
        ">

                  <h2 className="
            text-2xl
            font-bold
            mb-8
          ">
                    Ordered Items
                  </h2>

                  <div className="space-y-5">

                    {order.items.map((item, index) => (

                      <div
                        key={index}
                        className="
                  flex
                  items-center
                  gap-5
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
                    text-lg
                    font-semibold
                  ">
                            {item.name}
                          </h3>

                          <p className="
                    text-gray-500
                    mt-1
                  ">
                            Quantity: {item.qty}
                          </p>

                        </div>

                        <div className="
                  text-right
                ">

                          <p className="
                    text-lg
                    font-bold
                  ">
                            ₹{item.finalPrice * item.qty}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>
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
                    <span>₹{(order.total).toFixed(2)}</span>
                  </div>

                </div>
                {/* ADDRESS */}
                <div className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
        ">

                  <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
                    Delivery Address
                  </h2>

                  <div className="
            text-gray-700
            leading-8
          ">

                    <p>
                      {order.addressSnapshot?.firstName}
                      {" "}
                      {order.addressSnapshot?.lastName}
                    </p>

                    <p>
                      {order.addressSnapshot?.streetAddress}
                    </p>

                    <p>
                      {order.addressSnapshot?.city},
                      {" "}
                      {order.addressSnapshot?.state}
                    </p>

                    <p>
                      {order.addressSnapshot?.mobile}
                    </p>

                  </div>

                </div>
                {
                  ![
                    "shipped",
                    "out_for_delivery",
                    "delivered",
                    "cancelled",
                    "returned"
                  ].includes(order.status) && (

                    <button
                      onClick={() =>
                        cancelOrder(order._id)
                      }
                      className="
      mt-8
      bg-red-500
      text-white
      px-6
      py-3
      rounded-2xl
      hover:bg-red-600
      transition
    "
                    >
                      Cancel Order
                    </button>

                  )
                }
              </div>
            );
          })}
        </div >
      </div >

    </div >
  );
}