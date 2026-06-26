"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AddToCartButton({ id1, id2, image }) {
  const { addToCart } = useCart();
  const { data: session, status } = useSession();
  const loadingItems = useRef(new Set());
  if (status === "loading") return;

  const router = useRouter();

  const createParticle = (x, y) => {
    const p = document.createElement("div");

    p.style.position = "fixed";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.width = "6px";
    p.style.height = "6px";
    p.style.borderRadius = "50%";
    p.style.background = "#f59e0b"; // 🔥 COLOR (gold)
    p.style.boxShadow = "0 0 20px rgba(245,158,11,1)"; // ✨ GLOW 
    p.style.opacity = "0.7";
    p.style.pointerEvents = "none";
    p.style.zIndex = "9999";

    document.body.appendChild(p);

    setTimeout(() => {
      p.style.transition = "all 0.5s ease-out";
      p.style.transform = "scale(0)";
      p.style.opacity = "0";
    }, 10);

    setTimeout(() => p.remove(), 500);
  };

  const handleAddToCart = async (e) => {
    if (!session) {
      router.push("/login");
      return;
    }


    let id;

    if (id1 && id2) {
      id = `${id1}-${id2}`; // collection item
    } else {
      id = String(id2); // trends item
    }

    if (loadingItems.current.has(id)) return;
    loadingItems.current.add(id);

    // UI update FIRST (instant feedback)
    addToCart(id);

    // ANIMATION
    const cart = document.getElementById("cart-icon");
    const button = e.currentTarget;

    if (cart) {
      const rect = button.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      const img = document.createElement("img");
      img.src = image;

      img.style.position = "fixed";
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.borderRadius = "8px";
      img.style.zIndex = "9999";
      img.style.pointerEvents = "none";

      document.body.appendChild(img);

      let startX = rect.left;
      let startY = rect.top;
      let endX = cartRect.left;
      let endY = cartRect.top;

      let controlX = (startX + endX) / 2;
      let controlY = startY - 250;

      let t = 0;

      const animate = () => {
        t += 0.07;
        const wave = Math.sin(t * 7) * 50;

        const x =
          (1 - t) * (1 - t) * startX +
          2 * (1 - t) * t * controlX +
          t * t * endX + wave;

        const y =
          (1 - t) * (1 - t) * startY +
          2 * (1 - t) * t * controlY +
          t * t * endY;

        img.style.left = x + "px";
        img.style.top = y + "px";
        img.style.transform = `scale(${1 - t * 0.7})`;
        img.style.opacity = 1 - t;

        createParticle(x, y);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          img.remove();
        }
      };

      animate();
    }

    // BACKEND CALL (after UI)
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // email: session.user.email,
          productId: id,
        }),
      });

      const data = await res.json();

    } catch (err) {
    } finally {
      loadingItems.current.delete(id);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-black text-white py-3 rounded-lg"
    >
      Add to Cart
    </button>
  );
}