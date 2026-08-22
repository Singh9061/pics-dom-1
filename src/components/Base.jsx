import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Base() {
  const whatsappNumber = "919235513863";
  const whatsappMessage = encodeURIComponent(
    "Hello! I'm interested in booking a photography session with Picsdom."
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text transition-colors duration-300">
      {/* Lightweight studio backdrop — no heavy multi-blur layers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(197, 168, 128, 0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(245,242,235,0.28)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-transparent text-text">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* WhatsApp FAB — no continuous ping animation (CPU) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.25)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </div>
  );
}
