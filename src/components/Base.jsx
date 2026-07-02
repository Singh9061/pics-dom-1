import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Base() {
  // CRITICAL FIX: WhatsApp links break if they include symbols like '+'. 
  // It must be digits only (e.g., "919235513863")
  const whatsappNumber = "919235513863";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in booking a photography session.");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text transition-colors duration-300 selection:bg-white/20">

      {/* --- Fine-Art Photography Studio Canvas Background --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">

        {/* Mirrorless Viewfinder Dot-Matrix Focus Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(var(--color-text) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        {/* Ambient Studio Lighting Gradients (Simulating soft continuous studio keylights) */}
        <div className="absolute -left-1/4 -top-1/4 h-150 w-150 rounded-full bg-blue-500/3 dark:bg-blue-500/5 blur-[140px] mix-blend-screen" />
        <div className="absolute right-[-10%] top-[20%] h-125 w-125 rounded-full bg-indigo-500/3 dark:bg-indigo-500/4 blur-[120px] mix-blend-screen" />
        <div className="absolute left-[25%] bottom-[-10%] h-175 w-175 rounded-full bg-purple-500/2 dark:bg-purple-500/4 blur-[160px] mix-blend-screen" />

        {/* Cinematic Vignette Shader */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none opacity-40 dark:opacity-70" />
      </div>

      {/* --- Main Structural UI Layer --- */}
      <div className="relative flex min-h-screen flex-col z-10">
        <Navbar />

        {/* Framing Main Workspace Container */}
        <main className="flex-1 pt-20 bg-bg text-text">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* --- Premium Fixed WhatsApp Floating Action Button --- */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* Captivating, Subtle Soft Radial Aura Ripple */}
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-[#25D366]/20 opacity-70 duration-1000" />

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <FaWhatsapp size={26} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
        </a>
      </div>

    </div>
  );
}