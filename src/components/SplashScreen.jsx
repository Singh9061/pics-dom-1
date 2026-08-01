import { useEffect, useState, useRef, useCallback } from "react";

/** Classic 6-blade iris aperture */
function ApertureRing({ size = 140, className = "" }) {
  const blades = 6;
  const r = size / 2;
  const innerR = r * 0.18;

  const bladePath = (i) => {
    const angle = (i * 360) / blades;
    const rad = (angle * Math.PI) / 180;
    const nextRad = ((angle + 360 / blades) * Math.PI) / 180;
    const x1 = r + Math.cos(rad) * r * 0.94;
    const y1 = r + Math.sin(rad) * r * 0.94;
    const x2 = r + Math.cos(nextRad) * r * 0.94;
    const y2 = r + Math.sin(nextRad) * r * 0.94;
    const cx = r + Math.cos(rad + Math.PI / blades) * r * 0.5;
    const cy = r + Math.sin(rad + Math.PI / blades) * r * 0.5;
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
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.95" />
      <circle cx={r} cy={r} r={r - 5} fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <circle cx={r} cy={r} r={r - 9} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const x1 = r + Math.cos(a) * (r - 3);
        const y1 = r + Math.sin(a) * (r - 3);
        const x2 = r + Math.cos(a) * (r - (i % 3 === 0 ? 8 : 5.5));
        const y2 = r + Math.sin(a) * (r - (i % 3 === 0 ? 8 : 5.5));
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
            opacity={i % 3 === 0 ? 0.55 : 0.25}
          />
        );
      })}

      <g className="aperture-blades">
        {Array.from({ length: blades }).map((_, i) => (
          <path
            key={i}
            d={bladePath(i)}
            fill="currentColor"
            className="aperture-blade"
            style={{ "--i": i }}
          />
        ))}
      </g>

      <circle cx={r} cy={r} r={innerR} fill="#050504" />
      <circle cx={r} cy={r} r={innerR} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />

      <ellipse
        cx={r - size * 0.08}
        cy={r - size * 0.1}
        rx={size * 0.06}
        ry={size * 0.035}
        fill="white"
        opacity="0.12"
        className="lens-glint"
      />
    </svg>
  );
}

/** Synthesize a mechanical shutter click via Web Audio API (no external file) */
function playShutterClick() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    // Short noise burst (shutter blades)
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      // Decaying noise with a mid-frequency click character
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 55) * (1 - t / 0.06);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 2800;
    noiseFilter.Q.value = 1.4;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();

    // Low mechanical "thock" (mirror / body)
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.05);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.35, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);

    // Cleanup
    setTimeout(() => {
      try { ctx.close(); } catch { /* ignore */ }
    }, 300);
  } catch {
    // Autoplay policies / unsupported — fail silently
  }
}

export default function SplashScreen({ onFinish, duration = 3400 }) {
  const [phase, setPhase] = useState("shutter"); // shutter → open → focus → hold → exit
  const finished = useRef(false);
  const soundPlayed = useRef(false);

  const triggerSound = useCallback(() => {
    if (soundPlayed.current) return;
    soundPlayed.current = true;
    playShutterClick();
  }, []);

  useEffect(() => {
    // Shutter click as soon as curtains start opening
    const soundTimer = setTimeout(triggerSound, 40);

    const t1 = setTimeout(() => setPhase("open"), 260);
    const t2 = setTimeout(() => setPhase("focus"), 700);   // rack focus mid-point
    const t3 = setTimeout(() => setPhase("hold"), 1400);
    const t4 = setTimeout(() => setPhase("exit"), duration - 800);
    const t5 = setTimeout(() => {
      if (!finished.current) {
        finished.current = true;
        onFinish();
      }
    }, duration);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [duration, onFinish, triggerSound]);

  // Rack-focus class on content based on phase
  const rackClass =
    phase === "shutter"
      ? "rack-blur-heavy"
      : phase === "open"
        ? "rack-blur-mid"
        : phase === "focus"
          ? "rack-blur-soft"
          : phase === "exit"
            ? "rack-blur-exit"
            : "rack-sharp";

  return (
    <div
      className={`splash-root fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050504] overflow-hidden ${
        phase === "exit" ? "splash-exit" : ""
      }`}
      onClick={triggerSound}
      onTouchStart={triggerSound}
    >
      {/* ── Film grain overlay ── */}
      <div className="film-grain pointer-events-none absolute inset-0 z-[60]" aria-hidden="true" />

      {/* ── Shutter curtains ── */}
      <div className={`shutter-panel shutter-top ${phase !== "shutter" ? "shutter-open" : ""}`} />
      <div className={`shutter-panel shutter-bottom ${phase !== "shutter" ? "shutter-open" : ""}`} />

      {/* ── Vignette ── */}
      <div className="splash-vignette pointer-events-none absolute inset-0 z-[5]" />

      {/* ── Bokeh orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[6]">
        <div className="bokeh bokeh-1" />
        <div className="bokeh bokeh-2" />
        <div className="bokeh bokeh-3" />
        <div className="bokeh bokeh-4" />
        <div className="bokeh bokeh-5" />
      </div>

      {/* ── Anamorphic lens flare ── */}
      <div
        className={`lens-flare pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[7] ${
          phase === "open" || phase === "focus" || phase === "hold" ? "flare-on" : ""
        }`}
      >
        <div className="flare-streak" />
        <div className="flare-core" />
        <div className="flare-ghost flare-ghost-1" />
        <div className="flare-ghost flare-ghost-2" />
        <div className="flare-ghost flare-ghost-3" />
      </div>

      {/* ── Main content (rack focus target) ── */}
      <div
        className={`relative z-20 flex flex-col items-center rack-target ${rackClass}`}
      >
        <div
          className={`text-gold mb-10 aperture-wrap ${
            phase === "open" || phase === "focus" || phase === "hold"
              ? "aperture-alive"
              : ""
          }`}
        >
          <ApertureRing size={128} className="aperture-svg" />
          <div className="chroma-ring" />
        </div>

        <div className="flex flex-col items-center select-none">
          <div className="flex items-center font-extrabold text-2xl sm:text-3xl tracking-[0.22em] text-white uppercase leading-none">
            <span>PICS</span>
            <span className="ml-2 flex items-center">
              D
              <span className="inline-flex mx-0.5 text-gold opacity-90">
                <ApertureRing size={16} />
              </span>
              M
            </span>
          </div>
          <span className="mt-2.5 text-[9px] sm:text-[10px] font-medium tracking-[0.5em] uppercase text-white/45">
            Raebareli
          </span>
        </div>

        <p
          className={`mt-8 font-serif text-sm sm:text-base italic text-white/40 tracking-wide transition-all duration-700 ${
            phase === "hold" || phase === "focus"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          We live the moments with you
        </p>

        <div className="mt-12 flex flex-col items-center gap-2">
          <div className="h-px w-32 overflow-hidden bg-white/10">
            <div
              className={`h-full bg-gold origin-left transition-transform ease-linear ${
                phase === "shutter" || phase === "open"
                  ? "scale-x-0 duration-0"
                  : "scale-x-100 duration-[1800ms]"
              }`}
            />
          </div>
          <span
            className={`text-[8px] uppercase tracking-[0.35em] text-white/25 transition-opacity duration-500 ${
              phase === "hold" ? "opacity-100" : "opacity-0"
            }`}
          >
            f/1.4 · 1/125 · ISO 400
          </span>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        /* ── Film grain (SVG turbulence, animated) ── */
        .film-grain {
          opacity: 0.28;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
          animation: grainShift 0.4s steps(4) infinite;
          pointer-events: none;
        }
        @keyframes grainShift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2%, 1%); }
          50% { transform: translate(1%, -1%); }
          75% { transform: translate(-1%, 2%); }
          100% { transform: translate(0, 0); }
        }

        /* ── Rack focus blur stages ── */
        .rack-target {
          transition:
            filter 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.55s ease,
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: filter, transform, opacity;
        }
        .rack-blur-heavy {
          filter: blur(14px) brightness(0.7);
          opacity: 0;
          transform: scale(1.08);
        }
        .rack-blur-mid {
          filter: blur(8px) brightness(0.85);
          opacity: 0.7;
          transform: scale(1.04);
        }
        .rack-blur-soft {
          filter: blur(3px) brightness(0.95);
          opacity: 0.92;
          transform: scale(1.015);
        }
        .rack-sharp {
          filter: blur(0) brightness(1);
          opacity: 1;
          transform: scale(1);
        }
        .rack-blur-exit {
          filter: blur(10px) brightness(0.75);
          opacity: 0;
          transform: scale(1.06);
        }

        /* Shutter curtains */
        .shutter-panel {
          position: absolute;
          left: 0; right: 0;
          height: 52%;
          background: #050504;
          z-index: 50;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .shutter-top { top: 0; transform-origin: top; }
        .shutter-bottom { bottom: 0; transform-origin: bottom; }
        .shutter-top.shutter-open { transform: translateY(-105%); }
        .shutter-bottom.shutter-open { transform: translateY(105%); }

        /* Vignette */
        .splash-vignette {
          background: radial-gradient(ellipse 70% 60% at 50% 48%, transparent 28%, rgba(0,0,0,0.6) 100%);
        }

        /* Bokeh */
        .bokeh {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184,155,108,0.28) 0%, transparent 70%);
          filter: blur(2px);
          animation: bokehFloat 6s ease-in-out infinite;
        }
        .bokeh-1 { width: 90px; height: 90px; top: 18%; left: 12%; }
        .bokeh-2 { width: 60px; height: 60px; top: 65%; right: 15%; animation-delay: 1.2s; opacity: 0.7; }
        .bokeh-3 { width: 120px; height: 120px; bottom: 12%; left: 25%; animation-delay: 0.6s; opacity: 0.5; }
        .bokeh-4 { width: 45px; height: 45px; top: 30%; right: 22%; animation-delay: 2s; opacity: 0.6; }
        .bokeh-5 { width: 70px; height: 70px; top: 50%; left: 8%; animation-delay: 1.5s; opacity: 0.4; }
        @keyframes bokehFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-14px) scale(1.07); }
        }

        /* Anamorphic flare */
        .lens-flare { opacity: 0; transition: opacity 0.9s ease 0.25s; }
        .lens-flare.flare-on { opacity: 1; }
        .flare-streak {
          width: min(70vw, 520px);
          height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(184,155,108,0.15) 20%,
            rgba(255,240,200,0.55) 50%,
            rgba(184,155,108,0.15) 80%,
            transparent 100%);
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
        }
        .flare-core {
          width: 14px; height: 14px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,245,220,0.7) 0%, rgba(184,155,108,0.2) 50%, transparent 70%);
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          filter: blur(1px);
        }
        .flare-ghost {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(184,155,108,0.2);
          background: radial-gradient(circle, rgba(184,155,108,0.08) 0%, transparent 70%);
        }
        .flare-ghost-1 { width: 28px; height: 28px; left: calc(50% + 80px); top: 50%; transform: translate(-50%, -50%); }
        .flare-ghost-2 { width: 16px; height: 16px; left: calc(50% - 100px); top: 50%; transform: translate(-50%, -50%); opacity: 0.6; }
        .flare-ghost-3 { width: 10px; height: 10px; left: calc(50% + 140px); top: 50%; transform: translate(-50%, -50%); opacity: 0.4; }

        /* Aperture */
        .aperture-wrap {
          position: relative;
          transform: scale(0.85);
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .aperture-wrap.aperture-alive {
          transform: scale(1);
          animation: focusBreathe 3.5s ease-in-out infinite 1.3s;
        }
        @keyframes focusBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        .aperture-svg .aperture-blades {
          transform-origin: center;
          animation: irisOpen 1.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .aperture-blade {
          transform-origin: center;
          opacity: 0.5;
          animation: bladeReveal 1.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--i) * 50ms);
        }
        @keyframes irisOpen {
          0% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1) rotate(28deg); }
        }
        @keyframes bladeReveal {
          0% { opacity: 0.35; }
          100% { opacity: 0.88; }
        }

        .chroma-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1px solid transparent;
          background:
            linear-gradient(#050504, #050504) padding-box,
            linear-gradient(135deg, rgba(255,80,80,0.25), transparent 40%, transparent 60%, rgba(80,120,255,0.25)) border-box;
          opacity: 0;
          animation: chromaIn 1.5s ease 0.6s forwards;
          pointer-events: none;
        }
        @keyframes chromaIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 0.7; transform: scale(1); }
        }

        .lens-glint { animation: glintPulse 2.5s ease-in-out infinite 1s; }
        @keyframes glintPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.22; }
        }

        .splash-exit {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
