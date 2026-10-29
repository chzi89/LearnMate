"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const APP_ROUTES = [
  "/learn",
  "/dashboard",
  "/quiz",
  "/progress",
  "/profile",
  "/settings",
  "/entry-quiz",
  "/login",
  "/register",
  "/auth",
];

export default function SiteChrome({ children }) {
  const pathname = usePathname() || "/";
  const isAppRoute = APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <>
      {!isAppRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAppRoute && <Footer />}
    </>
  );
}
