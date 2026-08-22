import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

const GOLD = "#b89b6c";

function configureTexture(tex) {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = 2;
}

function FrameCard({
  photo,
  hoveredId,
  setHoveredId,
  activeId,
  entering,
  onEnter,
  introT,
}) {
  const group = useRef();
  const matRef = useRef();
  const texture = useTexture(photo.img);
  useMemo(() => configureTexture(texture), [texture]);

  const w = 2.2;
  const h = 2.9;
  const zBase = photo.baseZ;
  const phase = useMemo(() => (photo.i * 1.7) % (Math.PI * 2), [photo.i]);

  const targetZ = useRef(zBase);
  const curZ = useRef(zBase);
  const curScale = useRef(0.01);
  const curOpacity = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const isH = hoveredId === photo.id;
    const isA = activeId === photo.id;

    const appear = THREE.MathUtils.clamp((introT - photo.i * 0.04) * 2.2, 0, 1);
    const appearE = appear * appear * (3 - 2 * appear);

    if (entering) {
      if (isA) {
        targetZ.current = zBase + 1.2;
        curOpacity.current = THREE.MathUtils.damp(curOpacity.current, 1, 8, dt);
        curScale.current = THREE.MathUtils.damp(curScale.current, 1.25, 6, dt);
      } else {
        targetZ.current = zBase - 6;
        curOpacity.current = THREE.MathUtils.damp(curOpacity.current, 0, 6, dt);
        curScale.current = THREE.MathUtils.damp(curScale.current, 0.55, 5, dt);
      }
    } else {
      if (isH) {
        targetZ.current = zBase + 3.2;
        curScale.current = THREE.MathUtils.damp(curScale.current, 1.18 * appearE, 7, dt);
      } else if (hoveredId) {
        targetZ.current = zBase - 1.8;
        curScale.current = THREE.MathUtils.damp(curScale.current, 0.82 * appearE, 6, dt);
      } else {
        targetZ.current = zBase + Math.sin(t * 0.4 + phase) * 0.25;
        curScale.current = THREE.MathUtils.damp(curScale.current, appearE, 5, dt);
      }
      curOpacity.current = THREE.MathUtils.damp(curOpacity.current, appearE, 6, dt);
    }

    curZ.current = THREE.MathUtils.damp(curZ.current, targetZ.current, 5.5, dt);

    if (group.current) {
      group.current.position.z = curZ.current;
      group.current.scale.setScalar(Math.max(0.001, curScale.current));
      group.current.position.y = photo.y + Math.sin(t * 0.55 + phase) * 0.08;
      group.current.rotation.z =
        photo.rotZ + Math.sin(t * 0.3 + phase) * 0.015;
    }
    if (matRef.current) matRef.current.opacity = curOpacity.current;
  });

  return (
    <group
      ref={group}
      position={[photo.x, photo.y, zBase]}
      rotation={[0, photo.rotY, photo.rotZ]}
    >
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[w + 0.14, h + 0.14]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.08, h + 0.08]} />
        <meshBasicMaterial color="#0a0908" />
      </mesh>
      <mesh
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
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ApertureIntro({ progress }) {
  const ref = useRef();
  const blades = 8;

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.35;
  });

  const open = 0.2 + progress * 2.4;
  const opacity = 1 - Math.pow(progress, 1.4);
  if (progress >= 0.98) return null;

  return (
    <group ref={ref} position={[0, 0, 6.5]}>
      {Array.from({ length: blades }).map((_, i) => {
        const a = (i / blades) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * open * 0.55, Math.sin(a) * open * 0.55, 0]}
            rotation={[0, 0, a + Math.PI / 2]}
          >
            <planeGeometry args={[2.4, 0.7]} />
            <meshBasicMaterial
              color="#1a1510"
              transparent
              opacity={opacity * 0.92}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      <mesh>
        <ringGeometry args={[2.6, 2.85, 64]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={opacity * 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[2.85, 3.15, 64]} />
        <meshBasicMaterial
          color="#0d0b09"
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Dust({ count = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18;
      a[i * 3 + 1] = (Math.random() - 0.5) * 12;
      a[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
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
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={GOLD}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ThroughLensScene({
  entering,
  setEntering,
  onEnterComplete,
}) {
  const { camera, gl } = useThree();
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [introT, setIntroT] = useState(0);

  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const depthTarget = useRef(0);
  const depthSmooth = useRef(0);
  const portalProgress = useRef(0);
  const orbit = useRef(0);

  const photos = useMemo(() => {
    return MASTER_GALLERY_ARCHIVE.slice(0, 18).map((item, i) => {
      const cols = 6;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const angle = (col / cols) * Math.PI * 2 - Math.PI;
      const radius = 7.5 + ((i * 19) % 5) * 0.35;
      const x = Math.sin(angle) * radius * 0.55;
      const z = Math.cos(angle) * radius * 0.35 - 4;
      const y = (row - 1) * 3.2 + (((i * 13) % 7) - 3) * 0.12;
      const rotY = -angle * 0.35;
      const rotZ = (((i * 7) % 11) - 5) * 0.012;
      return { ...item, i, x, y, z, baseZ: z, rotY, rotZ };
    });
  }, []);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 2800;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setIntroT(t * t * (3 - 2 * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      if (entering) return;
      const r = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onWheel = (e) => {
      if (entering) return;
      e.preventDefault();
      depthTarget.current = THREE.MathUtils.clamp(
        depthTarget.current - e.deltaY * 0.01,
        -10,
        5
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

    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mouse.current.x, 3.5, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mouse.current.y, 3.5, dt);
    depthSmooth.current = THREE.MathUtils.damp(
      depthSmooth.current,
      depthTarget.current,
      3.2,
      dt
    );

    if (!entering) {
      orbit.current += dt * 0.08;
      const introPull = THREE.MathUtils.lerp(18, 12, introT);
      camera.position.x =
        Math.sin(orbit.current) * 1.2 + smooth.current.x * 3.2;
      camera.position.y = -smooth.current.y * 2.1;
      camera.position.z = introPull + depthSmooth.current;
      camera.lookAt(
        smooth.current.x * 0.4,
        -smooth.current.y * 0.2,
        depthSmooth.current * 0.3 - 2
      );
      camera.fov = THREE.MathUtils.lerp(48, 40, introT);
      camera.updateProjectionMatrix();
    } else {
      portalProgress.current = Math.min(1, portalProgress.current + dt * 0.75);
      const t = portalProgress.current;
      const ease = t * t * (3 - 2 * t);
      const target = photos.find((p) => p.id === activeId);
      if (target) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x, ease * 0.14);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y, ease * 0.14);
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          target.baseZ + 1.35,
          ease * 0.1
        );
        camera.lookAt(target.x, target.y, target.baseZ);
        camera.fov = THREE.MathUtils.lerp(camera.fov, 26, ease * 0.08);
        camera.updateProjectionMatrix();
      }
      if (t >= 1) onEnterComplete?.();
    }
  });

  return (
    <>
      <color attach="background" args={["#030201"]} />
      <fog attach="fog" args={["#030201", 10, 36]} />

      <ambientLight intensity={0.85} />
      <pointLight position={[0, 2, 8]} intensity={0.6} color="#fff5e6" />
      <pointLight position={[-6, -2, 2]} intensity={0.35} color={GOLD} />

      <ApertureIntro progress={introT} />
      <Dust count={100} />

      {photos.map((photo) => (
        <FrameCard
          key={photo.id}
          photo={photo}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          activeId={activeId}
          entering={entering}
          onEnter={handleEnter}
          introT={introT}
        />
      ))}

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.45} luminanceThreshold={0.65} mipmapBlur />
        <ChromaticAberration
          offset={[0.0009, 0.0009]}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette offset={0.25} darkness={0.55} />
        <Noise opacity={0.025} />
      </EffectComposer>
    </>
  );
}
