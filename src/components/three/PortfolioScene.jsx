import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";
import PhotoCard from "./PhotoCard";
import * as THREE from "three";

/**
 * Main 3D scene for The Wall — quality-aware photo count
 */
export default function PortfolioScene({
  entering,
  setEntering,
  onEnterComplete,
  perf,
}) {
  const groupRef = useRef();
  const { camera, gl } = useThree();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const mouse = useRef({ x: 0, y: 0 });
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const depthTarget = useRef(0);
  const depthSmooth = useRef(0);
  const portalProgress = useRef(0);

  const photoCount = perf?.isLowEnd ? 9 : 16;

  const photos = useMemo(() => {
    return MASTER_GALLERY_ARCHIVE.slice(0, photoCount).map((item, i) => {
      const cols = photoCount <= 9 ? 3 : 4;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = ((i * 17) % 11) - 5;
      const jitterY = ((i * 13) % 9) - 4;
      const x = (col - (cols - 1) / 2) * 3.4 + jitterX * 0.12;
      const y = (row - 1.5) * 3.1 + jitterY * 0.1;
      const z = ((i * 37) % 21) * 0.55 - 5.5;
      return { ...item, x, y, z, baseZ: z };
    });
  }, [photoCount]);

  useEffect(() => {
    gl.shadowMap.enabled = false;
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

  const handleEnter = useCallback(
    (id) => {
      if (entering) return;
      setEntering(true);
      setActiveId(id);
      portalProgress.current = 0;
    },
    [entering, setEntering]
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

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
      camera.position.x = mouseSmooth.current.x * 2.8;
      camera.position.y = -mouseSmooth.current.y * 1.8;
      camera.position.z = 14 + depthSmooth.current;
      camera.lookAt(0, 0, depthSmooth.current * 0.4);
    } else {
      portalProgress.current = Math.min(1, portalProgress.current + dt * 0.85);
      const t = portalProgress.current;
      const ease = t * t * (3 - 2 * t);

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

      if (t >= 1) onEnterComplete?.();
    }
  });

  return (
    <>
      {/* BasicMaterial cards → ambient is enough */}
      <ambientLight intensity={1} />

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

      <fog attach="fog" args={["#000000", 12, 32]} />
    </>
  );
}
