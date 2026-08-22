import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import LensHeroScene from "../../components/three/LensHeroScene";

/**
 * Full-viewport cinematic 3D hero — Through the Lens
 * Professional WebGL experience with parallax frames + aperture motif
 */
export default function ThroughTheLensHero() {
  const [intro, setIntro] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Intro open animation (aperture reveals)
    const start = performance.now();
    const duration = 2200;
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setIntro(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setReady(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative h-screen w-full min-h-[640px] overflow-hidden bg-[#050403] select-none">
      {/* WebGL layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 11.5], fov: 40, near: 0.1, far: 60 }}
          dpr={[1, 1.6]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <LensHeroScene introProgress={intro} />
          </Suspense>
        </Canvas>
      </div>

      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Top gradient for navbar readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Editorial copy */}
      <div
        className={`relative z-20 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-1000 ${
          ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.5em] text-gold/90 sm:text-[11px]">
          Pics Dom · Raebareli
        </p>

        <h1 className="font-serif text-4xl font-light leading-[1.15] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Through the{" "}
          <span className="italic font-normal text-gold">Lens</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-8 tracking-wide text-white/65 md:text-base md:leading-9">
          Cinematic wedding storytelling — where every glance, ritual, and
          quiet emotion becomes an heirloom framed in light.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/gallery"
            className="group inline-flex h-12 w-52 items-center justify-center gap-3 bg-gold px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-400 hover:bg-gold-hover sm:w-auto"
          >
            <span>Enter Archive</span>
            <FiArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/contact"
            className="inline-flex h-12 w-52 items-center justify-center border border-white/20 bg-white/5 px-8 text-[11px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-sm transition-all duration-400 hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            Reserve a Date
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className={`absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-2 text-white/35 transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[9px] uppercase tracking-[0.35em]">Explore</span>
        <FiChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
