import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

// Shared geometries — one allocation, many meshes
const PHOTO_GEO = new THREE.PlaneGeometry(1, 1);
const RING_GEO_INNER = new THREE.RingGeometry(2.85, 3.15, 32);
const RING_GEO_OUTER = new THREE.RingGeometry(3.15, 3.35, 32);
const BLADE_GEO = new THREE.PlaneGeometry(1.76, 0.55);
const GLOW_GEO = new THREE.CircleGeometry(1.8, 24);

function configureTexture(tex) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 1; // keep low — big GPU win on mobile
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
}

/**
 * Floating photo — MeshBasicMaterial (no lighting cost)
 */
function FloatingFrame({ img, position, scale = 1, rot = [0, 0, 0], animate }) {
  const meshRef = useRef();
  const texture = useTexture(img);

  useMemo(() => configureTexture(texture), [texture]);

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const w = 1.55 * scale;
  const h = 2.05 * scale;

  useFrame((state) => {
    if (!animate || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.35 + phase) * 0.1;
    meshRef.current.rotation.z = rot[2] + Math.sin(t * 0.2 + phase) * 0.015;
  });

  return (
    <group position={position} rotation={rot}>
      <mesh ref={meshRef} geometry={PHOTO_GEO} scale={[w, h, 1]}>
        <meshBasicMaterial map={texture} transparent opacity={0.92} depthWrite />
      </mesh>
      {/* Single dark frame only — skip gold layer for perf */}
      <mesh geometry={PHOTO_GEO} scale={[w + 0.06, h + 0.06, 1]} position={[0, 0, -0.012]}>
        <meshBasicMaterial color="#0d0c0a" transparent opacity={0.88} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ApertureRing({ progress = 0, animate }) {
  const groupRef = useRef();
  const blades = 6;

  useFrame((state) => {
    if (!animate || !groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  const bladeOffset = 0.15 + progress * 1.35;

  return (
    <group ref={groupRef} position={[0, 0, 2.2]}>
      {Array.from({ length: blades }).map((_, i) => {
        const angle = (i / blades) * Math.PI * 2;
        return (
          <mesh
            key={i}
            geometry={BLADE_GEO}
            position={[Math.cos(angle) * bladeOffset, Math.sin(angle) * bladeOffset, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <meshBasicMaterial
              color="#1a1814"
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      <mesh geometry={RING_GEO_INNER}>
        <meshBasicMaterial
          color="#b89b6c"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={RING_GEO_OUTER}>
        <meshBasicMaterial color="#2a2620" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function DustParticles({ count = 40 }) {
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
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#b89b6c"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Main 3D lens world — quality tiers via `perf` prop
 */
export default function LensHeroScene({ introProgress = 0, perf }) {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const isLow = perf?.isLowEnd ?? false;
  const animate = !(perf?.reduceMotion);

  const frames = useMemo(() => {
    const count = isLow ? 4 : 8;
    const pool = MASTER_GALLERY_ARCHIVE.slice(0, count);
    const layout = [
      { x: -3.2, y: 1.1, z: -2.5, s: 0.95, r: [0, 0.12, -0.04] },
      { x: 3.4, y: 0.6, z: -3.2, s: 1.05, r: [0, -0.1, 0.03] },
      { x: -2.6, y: -1.4, z: -4.0, s: 0.85, r: [0, 0.08, 0.02] },
      { x: 2.8, y: -1.2, z: -5.0, s: 0.9, r: [0, -0.06, -0.03] },
      { x: 0.2, y: 1.6, z: -6.2, s: 0.75, r: [0, 0.02, 0.01] },
      { x: -3.8, y: 0.2, z: -7.0, s: 0.7, r: [0, 0.15, -0.02] },
      { x: 3.6, y: 1.4, z: -7.5, s: 0.68, r: [0, -0.12, 0.02] },
      { x: -1.2, y: -1.8, z: -8.5, s: 0.72, r: [0, 0.05, 0] },
    ].slice(0, count);

    return layout.map((pos, i) => ({
      ...pos,
      img: pool[i % pool.length].img,
      key: pool[i % pool.length].id,
    }));
  }, [isLow]);

  useEffect(() => {
    // Renderer micro-opts
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, perf?.maxDpr || 1.5));
    gl.shadowMap.enabled = false;

    const el = gl.domElement;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [gl, perf?.maxDpr]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mouse.current.x, 3.2, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mouse.current.y, 3.2, dt);

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

      {/* Single ambient — no expensive spot/dir lights needed with BasicMaterial */}
      <ambientLight intensity={0.9} />

      <ApertureRing progress={1 - introProgress} animate={animate} />

      {!isLow && <DustParticles count={36} />}

      {frames.map((f) => (
        <FloatingFrame
          key={f.key}
          img={f.img}
          position={[f.x, f.y, f.z]}
          scale={f.s}
          rot={f.r}
          animate={animate}
        />
      ))}

      <mesh geometry={GLOW_GEO} position={[0, 0, -1]}>
        <meshBasicMaterial color="#b89b6c" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </>
  );
}
