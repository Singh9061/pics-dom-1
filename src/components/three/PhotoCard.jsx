import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Shared plane geo — all cards reuse
const CARD_GEO = new THREE.PlaneGeometry(2.1, 2.8);
const FRAME_GEO = new THREE.PlaneGeometry(2.16, 2.86);

function configureTexture(tex) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 1;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
}

/**
 * Spatial photo card — MeshBasicMaterial (no per-fragment lighting)
 */
export default function PhotoCard({
  photo,
  hoveredId,
  setHoveredId,
  activeId,
  entering,
  onEnter,
}) {
  const meshRef = useRef();
  const matRef = useRef();

  const texture = useTexture(photo.img);
  useMemo(() => configureTexture(texture), [texture]);

  const targetZ = useRef(photo.baseZ);
  const targetScale = useRef(1);
  const currentZ = useRef(photo.baseZ);
  const currentScale = useRef(1);
  const currentOpacity = useRef(1);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const isHovered = hoveredId === photo.id;
    const isActive = activeId === photo.id;

    if (entering) {
      if (isActive) {
        targetZ.current = photo.baseZ + 0.4;
        targetScale.current = 1.15;
        currentOpacity.current = THREE.MathUtils.damp(currentOpacity.current, 1, 6, dt);
      } else {
        targetZ.current = photo.baseZ - 4;
        targetScale.current = 0.7;
        currentOpacity.current = THREE.MathUtils.damp(currentOpacity.current, 0, 5, dt);
      }
    } else {
      if (isHovered) {
        targetZ.current = photo.baseZ + 2.4;
        targetScale.current = 1.12;
      } else if (hoveredId) {
        targetZ.current = photo.baseZ - 1.4;
        targetScale.current = 0.88;
      } else {
        targetZ.current = photo.baseZ;
        targetScale.current = 1;
      }
      currentOpacity.current = THREE.MathUtils.damp(currentOpacity.current, 1, 6, dt);
    }

    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ.current, 5, dt);
    currentScale.current = THREE.MathUtils.damp(
      currentScale.current,
      targetScale.current,
      5,
      dt
    );

    if (meshRef.current) {
      meshRef.current.position.z = currentZ.current;
      meshRef.current.scale.setScalar(currentScale.current);
    }
    if (matRef.current) {
      matRef.current.opacity = currentOpacity.current;
    }
  });

  return (
    <group position={[photo.x, photo.y, photo.baseZ]}>
      <mesh
        ref={meshRef}
        geometry={CARD_GEO}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (entering) return;
          setHoveredId(photo.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredId(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (entering) return;
          onEnter(photo.id);
        }}
      >
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>

      <mesh geometry={FRAME_GEO} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.85} depthWrite={false} />
      </mesh>
    </group>
  );
}
