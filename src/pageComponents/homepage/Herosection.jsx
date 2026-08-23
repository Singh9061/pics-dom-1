import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { herosection_video } from "../../Assets/video";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative flex h-screen w-full transform-gpu items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=60"
          className="h-full w-full object-cover opacity-70"
          src={herosection_video}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-30 mx-auto max-w-4xl px-6 text-center text-white">
        {/* Top line */}
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/80 animate-[fadeUp_0.8s_ease_both]">
          Luxury Wedding &amp; Heritage Photography · Raebareli
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-4xl font-bold leading-[1.2] tracking-wide sm:text-5xl md:text-6xl lg:text-7xl animate-[fadeUp_1s_ease_both]">
          Timeless{" "}
          <span className="italic font-semibold text-gold">Legacies</span>
        </h1>

        {/* Sub text */}
        <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-8 tracking-wide text-white/80 md:text-base md:leading-9 animate-[fadeUp_1.2s_ease_both]">
          Life&apos;s most beautiful memories aren&apos;t posed — they&apos;re felt.
          The unsaid glances, joyful tears, bursts of laughter, and quiet moments of love.
          We become a part of your journey.
        </p>

        {/* CTAs - bold + hover animation */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-[fadeUp_1.4s_ease_both]">
          <Link
            to="/gallery"
            className="flex h-12 w-52 items-center justify-center bg-gold px-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-400 hover:bg-gold-hover hover:scale-105 hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] sm:w-auto"
          >
            View Gallery
          </Link>

          <Link
            to="/reserve"
            className="flex h-12 w-52 items-center justify-center border border-white/30 bg-white/5 px-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-400 hover:border-gold hover:bg-gold/20 hover:scale-105 hover:shadow-[0_0_25px_rgba(197,168,128,0.25)] sm:w-auto"
          >
            Reserve Date
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 z-30 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <FiChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Simple fade-up keyframes */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
