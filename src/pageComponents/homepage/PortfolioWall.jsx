import { Suspense, useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import PortfolioScene from "../../components/three/PortfolioScene";
import { useWebGLPerf, useCanvasVisibility } from "../../hooks/useWebGLPerf";

/**
 * Spatial 3D Portfolio Wall — deferred + visibility-aware
 */
export default function PortfolioWall() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const perf = useWebGLPerf();
  const visible = useCanvasVisibility(sectionRef);
  const [entering, setEntering] = useState(false);

  const handleEnterComplete = useCallback(() => {
    navigate("/gallery");
  }, [navigate]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-black select-none"
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="pointer-events-none absolute top-10 left-0 right-0 z-30 px-6 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-white/50">
          Spatial Archive
        </p>
        <h2 className="font-serif text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl">
          The Wall
        </h2>
        <p className="mt-3 hidden text-[11px] tracking-wide text-white/40 sm:block">
          Move mouse · Scroll depth · Hover · Click to enter frame
        </p>
      </div>

      {/* Only create WebGL context while section is (or was) in view */}
      {visible || entering ? (
        <Canvas
          camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 80 }}
          dpr={[1, perf.maxDpr]}
          frameloop={visible || entering ? "always" : "never"}
          gl={{
            antialias: perf.antialias,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <PortfolioScene
              entering={entering}
              setEntering={setEntering}
              onEnterComplete={handleEnterComplete}
              perf={perf}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      <div className="pointer-events-auto absolute bottom-8 left-0 right-0 z-30 flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
        >
          Enter Full Archive
        </button>
      </div>
    </section>
  );
}
