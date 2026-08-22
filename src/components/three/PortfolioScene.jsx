import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";
import PhotoCard from "./PhotoCard";
import * as THREE from "three";

/**
 * Main 3D scene for The Wall
 */
export default function PortfolioScene({ entering, setEntering, onEnterComplete }) {
  const groupRef = useRef();
  const { camera, gl, size } = useThree();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Smooth targets
  const mouse = useRef({ x: 0, y: 0 });
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const depthTarget = useRef(0);
  const depthSmooth = useRef(0);
  const portalProgress = useRef(0);

  // Build photo positions (deterministic scatter)
  const photos = useMemo(() => {
    return MASTER_GALLERY_ARCHIVE.slice(0, 16).map((item, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const jitterX = ((i * 17) % 11) - 5;
      const jitterY = ((i * 13) % 9) - 4;
      const x = (col - 1.5) * 3.4 + jitterX * 0.12;
      const y = (row - 1.5) * 3.1 + jitterY * 0.1;
      const z = ((i * 37) % 21) * 0.55 - 5.5;
      return { ...item, x, y, z, baseZ: z };
    });
  }, []);

  // Mouse + wheel listeners
  useEffect(() => {
    const el = gl.domElement;

    const onMove = (e) => {
      if (entering) return;
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onWheel = (e) => {
      if (entering) return;
      e.preventDefault();
      depthTarget.current = THREE.MathUtils.clamp(
        depthTarget.current - e.deltaY * 0.008,
        -8,
        6
      );
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [gl, entering]);

  // Portal start
  const handleEnter = useCallback(
    (id) => {
      if (entering) return;
      setEntering(true);
      setActiveId(id);
      portalProgress.current = 0;
    },
    [entering, setEntering]
  );

  // Animation loop
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    // Smooth mouse & depth
    mouseSmooth.current.x = THREE.MathUtils.damp(
      mouseSmooth.current.x,
      mouse.current.x,
      4,
      dt
    );
    mouseSmooth.current.y = THREE.MathUtils.damp(
      mouseSmooth.current.y,
      mouse.current.y,
      4,
      dt
    );
    depthSmooth.current = THREE.MathUtils.damp(
      depthSmooth.current,
      depthTarget.current,
      3.5,
      dt
    );

    if (!entering) {
      // Free camera look
      camera.position.x = mouseSmooth.current.x * 2.8;
      camera.position.y = -mouseSmooth.current.y * 1.8;
      camera.position.z = 14 + depthSmooth.current;
      camera.lookAt(0, 0, depthSmooth.current * 0.4);
    } else {
      // Portal: fly into selected photo
      portalProgress.current = Math.min(1, portalProgress.current + dt * 0.85);
      const t = portalProgress.current;
      const ease = t * t * (3 - 2 * t); // smoothstep

      const target = photos.find((p) => p.id === activeId);
      if (target) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x, ease * 0.12);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y, ease * 0.12);
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          target.z + 1.1,
          ease * 0.09
        );
        camera.lookAt(target.x, target.y, target.z);
        camera.fov = THREE.MathUtils.lerp(42, 28, ease);
        camera.updateProjectionMatrix();
      }

      if (t >= 1) {
        onEnterComplete?.();
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 10]} intensity={0.9} />
      <directionalLight position={[-6, -4, 6]} intensity={0.25} />

      <group ref={groupRef}>
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            activeId={activeId}
            entering={entering}
            onEnter={handleEnter}
          />
        ))}
      </group>

      {/* Soft fog for depth */}
      <fog attach="fog" args={["#000000", 12, 32]} />
    </>
  );
}
