import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

const GOLD = "#c5a880";

function configureTexture(tex) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = 4;
}

/* ── Single photo card ── */
function PhotoFrame({ photo, index, total, activeIndex, setActiveIndex }) {
  const group = useRef();
  const matRef = useRef();
  const texture = useTexture(photo.img);
  useMemo(() => configureTexture(texture), [texture]);

  const isActive = activeIndex === index;
  const isNeighbor =
    Math.abs(activeIndex - index) === 1 ||
    Math.abs(activeIndex - index) === total - 1;
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Circular layout
    const baseAngle = (index / total) * Math.PI * 2;
    const spin = t * 0.06;
    const angle = baseAngle + spin;

    const radius = isActive ? 4.2 : 6.4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius * 0.85 - 2.5;
    const y = isActive ? 0.15 : Math.sin(t * 0.4 + index) * 0.25;

    // Smooth position
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.06);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.06);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, z, 0.06);

    // Face center
    group.current.lookAt(0, y * 0.3, 1);

    // Scale
    const targetScale = isActive ? 1.35 : isNeighbor ? 0.95 : 0.78;
    scaleTarget.set(targetScale, targetScale, targetScale);
    group.current.scale.lerp(scaleTarget, 0.07);

    // Opacity
    if (matRef.current) {
      const targetOp = isActive ? 1 : isNeighbor ? 0.75 : 0.45;
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOp, 0.08);
    }
  });

  const w = 2.0;
  const h = 2.7;

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        setActiveIndex(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Outer gold rim */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[w + 0.14, h + 0.14]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={isActive ? 0.85 : 0.25}
        />
      </mesh>

      {/* Dark border */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.06, h + 0.06]} />
        <meshBasicMaterial color="#0a0908" />
      </mesh>

      {/* Image */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          toneMapped={false}
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/* ── Soft dust particles ── */
function Dust({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 22;
      a[i * 3 + 1] = (Math.random() - 0.5) * 14;
      a[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
    }
    return a;
  }, [count]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={GOLD}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Central glow ring ── */
function CenterRing() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={ref} position={[0, 0, -3]}>
      {[1.8, 2.6, 3.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[r, r + 0.015, 80]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.12 - i * 0.03}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Main scene ── */
function Scene({ activeIndex, setActiveIndex }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const photos = useMemo(() => MASTER_GALLERY_ARCHIVE.slice(0, 10), []);

  // Auto rotate active index slowly
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(id);
  }, [photos.length, setActiveIndex]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mouse.current.x, 2.5, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mouse.current.y, 2.5, dt);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, smooth.current.x * 1.4, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3 - smooth.current.y * 0.7, 0.05);
    camera.lookAt(0, 0, -2);
  });

  return (
    <>
      <color attach="background" args={["#040302"]} />
      <fog attach="fog" args={["#040302", 7, 20]} />

      <ambientLight intensity={0.85} />
      <pointLight position={[0, 4, 5]} intensity={0.55} color="#fff6ec" />
      <pointLight position={[-4, -2, 1]} intensity={0.25} color={GOLD} />

      <Dust />
      <CenterRing />

      {photos.map((photo, i) => (
        <PhotoFrame
          key={photo.id}
          photo={photo}
          index={i}
          total={photos.length}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}

      {/* Mouse capture plane */}
      <mesh
        position={[0, 0, 5]}
        visible={false}
        onPointerMove={(e) => {
          mouse.current.x = e.point.x * 0.1;
          mouse.current.y = e.point.y * 0.1;
        }}
      >
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

/* ── Section wrapper ── */
export default function FloatingLegacy() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <section className="relative h-[100vh] min-h-[680px] w-full overflow-hidden bg-[#040302] select-none">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_12%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.92)_100%)]" />

      {/* Top title */}
      <div className="pointer-events-none absolute top-12 left-0 right-0 z-30 px-6 text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-gold/85">
          Cinematic Archive
        </p>
        <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Infinity{" "}
          <span className="italic font-normal text-gold">Gallery</span>
        </h2>
        <p className="mt-4 text-[11px] tracking-[0.25em] text-white/35">
          Click any frame · Auto rotates · Feel the depth
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0.3, 11.5], fov: 40, near: 0.1, far: 40 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </Suspense>
      </Canvas>

      {/* Bottom CTA */}
      <div className="pointer-events-auto absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-5">
        {/* Dots indicator */}
        <div className="flex gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "w-6 bg-gold"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Go to frame ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="border border-gold/40 bg-black/50 px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.32em] text-white/85 backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/20 hover:text-gold hover:scale-105"
        >
          Enter Full Archive
        </button>
      </div>
    </section>
  );
}
