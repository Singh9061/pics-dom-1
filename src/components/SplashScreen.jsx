import { useEffect, useState, useRef } from "react";

/* 6-blade camera aperture — rotates open on load */
function ApertureRing({ size = 120, className = "" }) {
  const blades = 6;
  const r = size / 2;
  const innerR = r * 0.22;

  // Approximate iris blade path for a classic 6-blade aperture
  const bladePath = (i) => {
    const angle = (i * 360) / blades;
    const rad = (angle * Math.PI) / 180;
    const nextRad = ((angle + 360 / blades) * Math.PI) / 180;
    // Control points for curved blade shape
    const x1 = r + Math.cos(rad) * r * 0.92;
    const y1 = r + Math.sin(rad) * r * 0.92;
    const x2 = r + Math.cos(nextRad) * r * 0.92;
    const y2 = r + Math.sin(nextRad) * r * 0.92;
    const cx = r + Math.cos(rad + Math.PI / blades) * r * 0.55;
    const cy = r + Math.sin(rad + Math.PI / blades) * r * 0.55;
    return `M ${r} ${r} L ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Z`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle
        cx={r}
        cy={r}
        r={r - 1.5}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <circle
        cx={r}
        cy={r}
        r={r - 6}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.35"
      />

      {/* Aperture blades group — animated open */}
      <g className="aperture-blades origin-center">
        {Array.from({ length: blades }).map((_, i) => (
          <path
            key={i}
            d={bladePath(i)}
            fill="currentColor"
            opacity="0.85"
            className="aperture-blade"
            style={{ "--i": i }}
          />
        ))}
      </g>

      {/* Inner open circle (lens) */}
      <circle cx={r} cy={r} r={innerR} fill="#0a0908" />
      <circle
        cx={r}
        cy={r}
        r={innerR}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

export default function SplashScreen({ onFinish, duration = 2800 }) {
  const [phase, setPhase] = useState("enter"); // enter | hold | exit
  const finished = useRef(false);

  useEffect(() => {
    const enterDone = setTimeout(() => setPhase("hold"), 900);
    const exitStart = setTimeout(() => setPhase("exit"), duration - 700);
    const done = setTimeout(() => {
      if (!finished.current) {
        finished.current = true;
        onFinish();
      }
    }, duration);

    return () => {
      clearTimeout(enterDone);
      clearTimeout(exitStart);
      clearTimeout(done);
    };
  }, [duration, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0908] transition-all duration-700 ease-out ${
        phase === "exit"
          ? "opacity-0 scale-[1.04] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Soft gold ambient glow */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-gold/8 blur-[80px]" />

      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          phase === "enter"
            ? "opacity-0 translate-y-4"
            : phase === "exit"
              ? "opacity-0 -translate-y-2"
              : "opacity-100 translate-y-0"
        }`}
      >
        {/* Camera aperture */}
        <div
          className={`text-gold mb-10 transition-transform duration-[1200ms] ease-out ${
            phase === "enter" ? "scale-75 rotate-[-30deg]" : "scale-100 rotate-0"
          }`}
        >
          <ApertureRing size={112} className="aperture-svg" />
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center select-none">
          <div className="flex items-center font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-white uppercase leading-none">
            <span>PICS</span>
            <span className="ml-2 flex items-center">
              D
              <span className="inline-flex mx-0.5 text-gold">
                <ApertureRing size={18} />
              </span>
              M
            </span>
          </div>
          <span className="mt-2.5 text-[9px] sm:text-[10px] font-medium tracking-[0.5em] uppercase text-white/50">
            Raebareli
          </span>
        </div>

        {/* Tagline */}
        <p
          className={`mt-8 font-serif text-sm sm:text-base italic text-white/40 tracking-wide transition-opacity duration-700 delay-300 ${
            phase === "hold" ? "opacity-100" : "opacity-0"
          }`}
        >
          We live the moments with you
        </p>

        {/* Thin gold progress line */}
        <div className="mt-12 h-px w-28 overflow-hidden bg-white/10">
          <div
            className={`h-full bg-gold origin-left transition-transform ease-linear ${
              phase === "enter"
                ? "scale-x-0 duration-0"
                : "scale-x-100 duration-[1800ms]"
            }`}
          />
        </div>
      </div>

      {/* Scoped aperture animation styles */}
      <style>{`
        .aperture-svg .aperture-blades {
          transform-origin: center;
          animation: apertureOpen 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .aperture-blade {
          transform-origin: center;
          animation: bladeSpread 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--i) * 40ms);
        }
        @keyframes apertureOpen {
          0% { transform: scale(1.15) rotate(0deg); opacity: 0.6; }
          100% { transform: scale(1) rotate(25deg); opacity: 1; }
        }
        @keyframes bladeSpread {
          0% { opacity: 0.4; }
          100% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
