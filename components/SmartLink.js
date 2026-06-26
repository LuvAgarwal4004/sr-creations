"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { setGlobalLoading } from "@/components/RouteLoader";

export default function SmartLink({ href, children, ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        e.preventDefault();

        // 🔥 If already on same page (like "/")
        if (pathname === href) {
          // optional: smooth UX (scroll to top instead of reload)
          window.location.reload();
          return;
        }

        if (typeof setGlobalLoading === "function") {
          setGlobalLoading(true);
        }

        router.push(href);
      }}
    >
      {children}
    </Link>
  );
}