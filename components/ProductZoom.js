"use client";
import { useState } from "react";

export default function ProductZoom({ image }) {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState("50% 50%");

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition(`${x}% ${y}%`);
  };

  return (
    <div className="flex gap-4 items-start">
      
      {/* LEFT: Main Image (FIXED SIZE) */}
      <div
        className="w-[400px] h-[450px] flex-shrink-0 border rounded-lg overflow-hidden bg-gray-100 cursor-crosshair"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* RIGHT: Zoom Panel (ONLY SHOW ON HOVER) */}
      {showZoom && (
        <div
          className="w-[200px] h-[200px] flex-shrink-0 border rounded-lg bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: zoomPosition,
            backgroundSize: "500%",
          }}
        />
      )}
    </div>
  );
}