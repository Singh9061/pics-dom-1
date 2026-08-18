import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Single spatial photo card
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
  const [hovered, setHovered] = useState(false);

  // Load texture (avif supported by modern browsers)
  const texture = useTexture(photo.img);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Aspect ~ 3/4 portrait
  const width = 2.1;
  const height = 2.8;

  // Target transforms
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
      meshRef.current.material.opacity = currentOpacity.current;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.65,
        metalness: 0.05,
        side: THREE.FrontSide,
      }),
    [texture]
  );

  return (
    <mesh
      ref={meshRef}
      position={[photo.x, photo.y, photo.baseZ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (entering) return;
        setHovered(true);
        setHoveredId(photo.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredId(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (entering) return;
        onEnter(photo.id);
      }}
    >
      <planeGeometry args={[width, height]} />
      <primitive object={material} attach="material" />

      {/* Subtle frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[width + 0.06, height + 0.06]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.85} />
      </mesh>
    </mesh>
  );
}
