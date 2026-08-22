import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

/**
 * Floating photo plane in depth field
 */
function FloatingFrame({ img, position, scale = 1, rot = [0, 0, 0] }) {
  const meshRef = useRef();
  const texture = useTexture(img);
  texture.colorSpace = THREE.SRGBColorSpace;

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.35 + phase) * 0.12;
    meshRef.current.rotation.z = rot[2] + Math.sin(t * 0.2 + phase) * 0.02;
  });

  const w = 1.55 * scale;
  const h = 2.05 * scale;

  return (
    <group position={position} rotation={rot}>
      <mesh ref={meshRef}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.05}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Thin gold-ish frame */}
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[w + 0.05, h + 0.05]} />
        <meshBasicMaterial color="#0d0c0a" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.08, h + 0.08]} />
        <meshBasicMaterial color="#b89b6c" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Procedural camera iris / aperture (6 blades)
 */
function ApertureRing({ progress = 0 }) {
  const groupRef = useRef();
  const blades = 6;
  const radius = 3.2;

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  // progress 0 = open, 1 = nearly closed
  const bladeOffset = 0.15 + progress * 1.35;

  return (
    <group ref={groupRef} position={[0, 0, 2.2]}>
      {Array.from({ length: blades }).map((_, i) => {
        const angle = (i / blades) * Math.PI * 2;
        const x = Math.cos(angle) * bladeOffset;
        const y = Math.sin(angle) * bladeOffset;
        return (
          <mesh
            key={i}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <planeGeometry args={[radius * 0.55, 0.55]} />
            <meshStandardMaterial
              color="#1a1814"
              metalness={0.6}
              roughness={0.35}
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {/* Outer ring */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[2.85, 3.15, 64]} />
        <meshStandardMaterial
          color="#b89b6c"
          metalness={0.8}
          roughness={0.25}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[3.15, 3.35, 64]} />
        <meshStandardMaterial
          color="#2a2620"
          metalness={0.5}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Soft particle dust in the light cone
 */
function DustParticles({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.025}
        color="#b89b6c"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Main 3D lens world — parallax + depth frames + aperture
 */
export default function LensHeroScene({ introProgress = 0 }) {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const frames = useMemo(() => {
    const pool = MASTER_GALLERY_ARCHIVE.slice(0, 10);
    const layout = [
      { x: -3.2, y: 1.1, z: -2.5, s: 0.95, r: [0, 0.12, -0.04] },
      { x: 3.4, y: 0.6, z: -3.2, s: 1.05, r: [0, -0.1, 0.03] },
      { x: -2.6, y: -1.4, z: -4.0, s: 0.85, r: [0, 0.08, 0.02] },
      { x: 2.8, y: -1.2, z: -5.0, s: 0.9, r: [0, -0.06, -0.03] },
      { x: 0.2, y: 1.6, z: -6.2, s: 0.75, r: [0, 0.02, 0.01] },
      { x: -3.8, y: 0.2, z: -7.0, s: 0.7, r: [0, 0.15, -0.02] },
      { x: 3.6, y: 1.4, z: -7.5, s: 0.68, r: [0, -0.12, 0.02] },
      { x: -1.2, y: -1.8, z: -8.5, s: 0.72, r: [0, 0.05, 0] },
    ];
    return layout.map((pos, i) => ({
      ...pos,
      img: pool[i % pool.length].img,
      key: pool[i % pool.length].id,
    }));
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [gl]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mouse.current.x, 3.2, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mouse.current.y, 3.2, dt);

    // Camera: gentle look + slight intro push
    const introZ = THREE.MathUtils.lerp(11.5, 9.2, introProgress);
    camera.position.x = smooth.current.x * 0.85;
    camera.position.y = -smooth.current.y * 0.45;
    camera.position.z = introZ;
    camera.lookAt(smooth.current.x * 0.15, -smooth.current.y * 0.08, -2);
  });

  return (
    <>
      <color attach="background" args={["#050403"]} />
      <fog attach="fog" args={["#050403", 8, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 8]} intensity={0.85} color="#fff8f0" />
      <directionalLight position={[-5, -2, 4]} intensity={0.25} color="#b89b6c" />
      <spotLight
        position={[0, 0, 10]}
        angle={0.55}
        penumbra={0.6}
        intensity={1.2}
        color="#fff5e8"
        distance={28}
      />

      <ApertureRing progress={1 - introProgress} />
      <DustParticles />

      {frames.map((f) => (
        <FloatingFrame
          key={f.key}
          img={f.img}
          position={[f.x, f.y, f.z]}
          scale={f.s}
          rot={f.r}
        />
      ))}

      {/* Soft center glow plane */}
      <mesh position={[0, 0, -1]}>
        <circleGeometry args={[1.8, 48]} />
        <meshBasicMaterial color="#b89b6c" transparent opacity={0.06} />
      </mesh>
    </>
  );
}
