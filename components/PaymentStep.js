"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setGlobalLoading } from "./RouteLoader";
import { useSession } from "next-auth/react";
import { useCheckout } from "@/context/CheckoutContext";
import toast from "react-hot-toast";

export default function PaymentStep() {
  const { cart, setCart } = useCart();
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  // const {
  //   setOrderCompleted
  // } = useCheckout();

  const handlePayment = async () => {
    setLoading(true);
    if (typeof setGlobalLoading === "function") {
      setGlobalLoading(true);
    }
    if (!session?.user?.email) {
      toast.error("Please login");
      return;
    }
    const raw = localStorage.getItem(`address-${session.user.email}`);

    if (!raw) {
      toast.error("Address missing");
      return;
    }

    const savedAddress = JSON.parse(raw);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart: cart,
          paymentMethod: method,
          address: savedAddress
        })
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Payment failed. Cant order more than once at a time!");
        setLoading(false);
        return;
      }



      toast.success("Order Placed!");
      setCart([]);

      await fetch(
        "/api/checkout/complete",
        {
          method: "POST"
        }
      );
      await fetch("/api/cart/clear", {
        method: "POST"
      });

      setTimeout(() => {
        // setOrderCompleted(true);
        router.push(`/order-success?id=${data.order._id}`);

        setTimeout(() => {
          setGlobalLoading(false); // STOP LOADER AFTER PAGE LOAD FEEL
        }, 800);
      }, 200);



    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div className="max-w-xl mx-auto border p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

      {/* COD OPTION */}
      <div
        onClick={() => setMethod("cod")}
        className={`border p-4 rounded-lg mb-4 cursor-pointer ${method === "cod" ? "border-black bg-gray-100" : ""
          }`}
      >
        <p className="font-semibold">Cash on Delivery</p>
        <p className="text-sm text-gray-500">
          Pay when your order arrives
        </p>
      </div>

      {/* ONLINE PAYMENT */}
      <div
        onClick={() => setMethod("online")}
        className={`border p-4 rounded-lg cursor-pointer ${method === "online" ? "border-black bg-gray-100" : ""
          }`}
      >
        <p className="font-semibold">Pay Online (Card / UPI)</p>
        <p className="text-sm text-gray-500">
          Secure payment via Razorpay
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}