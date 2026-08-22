import { useRef } from "react";

/**
 * CSS 3D perspective tilt on hover/move — works on any media card.
 */
export default function Tilt3D({
  children,
  className = "",
  max = 12,
  scale = 1.03,
  glare = true,
}) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},${scale})`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(184,155,108,0.25), transparent 55%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transform-gpu transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200"
          aria-hidden
        />
      )}
    </div>
  );
}
