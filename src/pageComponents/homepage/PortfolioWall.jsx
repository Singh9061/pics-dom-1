import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import PortfolioScene from "../../components/three/PortfolioScene";

/**
 * Phase 1 — True 3D Portfolio Wall
 * - Spatial photo field in WebGL
 * - Mouse look + wheel depth
 * - Hover forward / neighbors back
 * - Click → portal zoom into photo → /gallery
 */
export default function PortfolioWall() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const handleEnterComplete = useCallback(() => {
    navigate("/gallery");
  }, [navigate]);

  return (
    <section className="relative w-full h-[100vh] min-h-[640px] overflow-hidden bg-black select-none">
      {/* UI overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="absolute top-10 left-0 right-0 z-30 px-6 text-center pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-2">
          Spatial Archive
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">
          The Wall
        </h2>
        <p className="mt-3 text-[11px] text-white/40 tracking-wide hidden sm:block">
          Move mouse · Scroll depth · Hover · Click to enter frame
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <PortfolioScene
            entering={entering}
            setEntering={setEntering}
            onEnterComplete={handleEnterComplete}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-auto">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="text-[10px] uppercase tracking-[0.35em] text-white/60 hover:text-gold transition-colors duration-300 border border-white/15 px-6 py-3 hover:border-gold/40"
        >
          Enter Full Archive
        </button>
      </div>
    </section>
  );
}
