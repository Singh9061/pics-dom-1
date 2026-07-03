import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Base() {
  // Digit-only verification for perfect global routing
  const whatsappNumber = "919235513863";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in booking a photography session with Picsdom.");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text transition-colors duration-300">

      {/* --- Fine-Art Photography Studio Canvas Background --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">

        {/* Mirrorless Viewfinder Dot-Matrix Focus Grid Overlay in Soft Gold Tint */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(rgba(197, 168, 128, 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Ambient Gallery Lighting Gradients (Simulating soft continuous studio reflections) */}
        <div className="absolute -left-1/4 -top-1/4 h-150 w-150 rounded-full bg-surface/40 blur-[130px] mix-blend-multiply" />
        <div className="absolute right-[-10%] top-[15%] h-125 w-125 rounded-full bg-(--color-gold)/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute left-[20%] bottom-[-10%] h-175 w-175 rounded-full bg-surface/50 blur-[150px] mix-blend-multiply" />

        {/* Delicate Fine-Art Warm Vignette Shader */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(245,242,235,0.35)_100%)] pointer-events-none" />
      </div>

      {/* --- Main Structural UI Layer --- */}
      <div className="relative flex min-h-screen flex-col z-10">
        <Navbar />

        {/* Framing Main Workspace Container */}
        <main className="flex-1 pt-20 bg-transparent text-text">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* --- Premium Fixed WhatsApp Floating Action Button --- */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* Captivating, Subtle Soft Radial Aura Ripple aligned with Luxury Vibe */}
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-[#25D366]/15 opacity-60 duration-1000" />

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.25)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <FaWhatsapp size={24} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
        </a>
      </div>

    </div>
  );
}