import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import ThroughLensScene from "../../components/three/ThroughLensScene";

/**
 * Through the Lens — heavy cinematic 3D archive
 * Aperture intro · spatial photo field · mouse orbit · scroll depth · portal enter
 */
export default function PortfolioWall() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const handleEnterComplete = useCallback(() => {
    navigate("/gallery");
  }, [navigate]);

  return (
    <section className="relative h-[100vh] min-h-[680px] w-full overflow-hidden bg-[#030201] select-none">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.85)_100%)]" />

      {/* Title */}
      <div className="pointer-events-none absolute top-12 left-0 right-0 z-30 px-6 text-center">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.45em] text-gold/80">
          Spatial Archive
        </p>
        <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
          Through the{" "}
          <span className="italic font-normal text-gold">Lens</span>
        </h2>
        <p className="mt-4 hidden text-[11px] tracking-[0.2em] text-white/35 sm:block">
          Move · Scroll depth · Hover · Click a frame to enter
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 18], fov: 48, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ThroughLensScene
            entering={entering}
            setEntering={setEntering}
            onEnterComplete={handleEnterComplete}
          />
        </Suspense>
      </Canvas>

      <div className="pointer-events-auto absolute bottom-10 left-0 right-0 z-30 flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="border border-gold/30 bg-black/30 px-8 py-3 text-[10px] uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm transition-all duration-400 hover:border-gold hover:text-gold"
        >
          Enter Full Archive
        </button>
      </div>
    </section>
  );
}
