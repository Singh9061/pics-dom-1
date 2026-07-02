import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Base() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text transition-colors duration-300">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      {/* Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}