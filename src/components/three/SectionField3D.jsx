import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#b89b6c";

function Particles({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = (Math.random() - 0.5) * 10;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return a;
  }, [count]);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.04;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.15) * 0.08;
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
        size={0.035}
        color={GOLD}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingPlanes({ count = 6 }) {
  const group = useRef();
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: ((i % 3) - 1) * 3.2 + (i % 2) * 0.4,
        y: (Math.floor(i / 3) - 0.5) * 2.4,
        z: -2 - (i % 4) * 0.6,
        rx: ((i * 13) % 7) * 0.02,
        ry: ((i * 17) % 9) * 0.03,
        phase: i * 1.3,
        w: 1.4 + (i % 3) * 0.2,
        h: 1.9 + (i % 2) * 0.25,
      })),
    [count]
  );

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      child.position.y = it.y + Math.sin(t * 0.5 + it.phase) * 0.15;
      child.rotation.z = it.rx + Math.sin(t * 0.3 + it.phase) * 0.04;
      child.rotation.y = it.ry + t * 0.05;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={[it.x, it.y, it.z]}>
          <planeGeometry args={[it.w, it.h]} />
          <meshBasicMaterial
            color="#1a1510"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
          {/* gold rim */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[it.w + 0.06, it.h + 0.06]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

function Rings() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.12;
  });
  return (
    <group ref={ref} position={[0, 0, -4]}>
      {[2.2, 3.1, 4.0].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.4, 0.2, 0]}>
          <ringGeometry args={[r, r + 0.02, 64]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.18 - i * 0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ density }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.6} />
      <Particles count={density === "high" ? 100 : 55} />
      <FloatingPlanes count={density === "high" ? 8 : 5} />
      <Rings />
    </>
  );
}

/**
 * Ambient heavy 3D field for section backgrounds.
 * Only mounts when in viewport.
 */
export default function SectionField3D({
  className = "",
  height = "h-[280px]",
  density = "med",
  dark = true,
}) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "120px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={`relative w-full overflow-hidden ${height} ${className}`}
      style={{ background: dark ? "#030201" : "#0a0908" }}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          frameloop="always"
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Scene density={density} />
          </Suspense>
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
