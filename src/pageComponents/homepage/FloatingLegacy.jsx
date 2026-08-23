import { Suspense, useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

const GOLD = "#c5a880";

function configureTexture(tex) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
}

function FloatingCard({ photo, index, total, hoveredId, setHoveredId }) {
  const group = useRef();
  const matRef = useRef();
  const texture = useTexture(photo.img);
  useMemo(() => configureTexture(texture), [texture]);

  const angle = (index / total) * Math.PI * 2;
  const radius = 5.8;
  const baseY = Math.sin(index * 1.4) * 0.55;

  const isHovered = hoveredId === photo.id;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;

    // Gentle orbital drift
    const drift = t * 0.08;
    const a = angle + drift;
    const x = Math.sin(a) * radius;
    const z = Math.cos(a) * radius * 0.72 - 1.5;
    const y = baseY + Math.sin(t * 0.55 + index) * 0.18;

    group.current.position.set(x, y, z);

    // Face camera slightly
    group.current.lookAt(0, y * 0.4, 2);

    // Hover lift + scale
    const targetScale = isHovered ? 1.22 : 1;
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );

    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(
        matRef.current.opacity,
        isHovered ? 1 : 0.92,
        0.1
      );
    }
  });

  const w = 1.9;
  const h = 2.55;

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredId(photo.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHoveredId(null);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Gold outer frame */}
      <mesh position={[0, 0, -0.035]}>
        <planeGeometry args={[w + 0.12, h + 0.12]} />
        <meshBasicMaterial color={GOLD} transparent opacity={isHovered ? 0.75 : 0.35} />
      </mesh>

      {/* Dark mat */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.05, h + 0.05]} />
        <meshBasicMaterial color="#0c0a08" />
      </mesh>

      {/* Photo */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          toneMapped={false}
          opacity={0.92}
        />
      </mesh>
    </group>
  );
}

function SoftParticles({ count = 60 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 20;
      a[i * 3 + 1] = (Math.random() - 0.5) * 12;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return a;
  }, [count]);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={GOLD}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const [hoveredId, setHoveredId] = useState(null);
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const photos = useMemo(
    () => MASTER_GALLERY_ARCHIVE.slice(0, 12),
    []
  );

  // Gentle mouse parallax
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mouse.current.x, 2.8, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mouse.current.y, 2.8, dt);

    camera.position.x = smooth.current.x * 1.6;
    camera.position.y = 0.4 - smooth.current.y * 0.9;
    camera.lookAt(0, 0, -1);
  });

  return (
    <>
      <color attach="background" args={["#050403"]} />
      <fog attach="fog" args={["#050403", 8, 22]} />

      <ambientLight intensity={0.9} />
      <pointLight position={[0, 3, 6]} intensity={0.5} color="#fff8f0" />
      <pointLight position={[-5, -1, 2]} intensity={0.3} color={GOLD} />

      <SoftParticles />

      {photos.map((photo, i) => (
        <FloatingCard
          key={photo.id}
          photo={photo}
          index={i}
          total={photos.length}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}

      {/* Invisible plane to capture mouse */}
      <mesh
        position={[0, 0, 4]}
        visible={false}
        onPointerMove={(e) => {
          mouse.current.x = e.point.x * 0.12;
          mouse.current.y = e.point.y * 0.12;
        }}
      >
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

export default function FloatingLegacy() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-[#050403] select-none">
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.88)_100%)]" />

      {/* Title */}
      <div className="pointer-events-none absolute top-14 left-0 right-0 z-30 px-6 text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-gold/90">
          Eternal Collection
        </p>
        <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
          Floating{" "}
          <span className="italic font-normal text-gold">Legacies</span>
        </h2>
        <p className="mt-4 text-[11px] tracking-[0.22em] text-white/40">
          Hover · Feel the depth · Explore the stories
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0.4, 11], fov: 42, near: 0.1, far: 40 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* CTA */}
      <div className="pointer-events-auto absolute bottom-10 left-0 right-0 z-30 flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="border border-gold/40 bg-black/40 px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/15 hover:text-gold hover:scale-105"
        >
          Explore Full Gallery
        </button>
      </div>
    </section>
  );
}
