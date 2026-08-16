import { useEffect, useState, useRef, useCallback } from "react";

/** Synthesize mechanical shutter click */
function playShutterClick() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const bufferSize = ctx.sampleRate * 0.055;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 60) * (1 - t / 0.055);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2600;
    bp.Q.value = 1.5;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.5, ctx.currentTime);
    ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(ctx.destination);
    noise.start();

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.32, ctx.currentTime);
    og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.connect(og);
    og.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);

    setTimeout(() => {
      try {
        ctx.close();
      } catch {
        /* */
      }
    }, 250);
  } catch {
    /* autoplay */
  }
}

export default function SplashScreen({ onFinish, duration = 5200 }) {
  const [phase, setPhase] = useState("boot");
  const finished = useRef(false);
  const soundPlayed = useRef(false);

  const triggerSound = useCallback(() => {
    if (soundPlayed.current) return;
    soundPlayed.current = true;
    playShutterClick();
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("shutter"), 300),
      setTimeout(() => setPhase("power"), 1100),
      setTimeout(() => setPhase("lens"), 1600),
      setTimeout(() => {
        setPhase("capture");
        triggerSound();
      }, 2800),
      setTimeout(() => setPhase("brand"), 3400),
      setTimeout(() => setPhase("exit"), duration - 900),
      setTimeout(() => {
        if (!finished.current) {
          finished.current = true;
          onFinish();
        }
      }, duration),
    ];
    return () => timers.forEach(clearTimeout);
  }, [duration, onFinish, triggerSound]);

  return (
    <div
      className={`splash-root fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050504] overflow-hidden phase-${phase}`}
      onClick={triggerSound}
      onTouchStart={triggerSound}
    >
      <div className="shutter-curtain top" />
      <div className="shutter-curtain bottom" />
      <div className="film-grain" aria-hidden="true" />
      <div className="splash-vignette" />

      <div
        className={`brand-block ${
          phase === "brand" || phase === "exit" ? "show" : ""
        }`}
      >
        <div className="aperture-brand">
          <svg className="aperture-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(197,168,128,0.35)" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(197,168,128,0.15)" strokeWidth="0.8" />
            <g className="aperture-blades">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const a = (i * 60 * Math.PI) / 180;
                const a2 = ((i + 1) * 60 * Math.PI) / 180;
                const x1 = 60 + Math.cos(a) * 52;
                const y1 = 60 + Math.sin(a) * 52;
                const x2 = 60 + Math.cos(a2) * 52;
                const y2 = 60 + Math.sin(a2) * 52;
                const cx = 60 + Math.cos(a + Math.PI / 6) * 28;
                const cy = 60 + Math.sin(a + Math.PI / 6) * 28;
                return (
                  <path
                    key={i}
                    d={`M 60 60 L ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Z`}
                    fill="#c5a880"
                    opacity="0.85"
                  />
                );
              })}
            </g>
            <circle className="aperture-center" cx="60" cy="60" r="22" fill="#050504" />
            <circle className="aperture-center-ring" cx="60" cy="60" r="22" fill="none" stroke="#c5a880" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <div className="brand-name">
            <span>PICS</span>
            <span className="brand-dom">DOM</span>
          </div>
        </div>
        <span className="brand-loc">Raebareli</span>
        <p className={`brand-tag ${phase === "brand" || phase === "exit" ? "sharp" : "blurred"}`}>
          We live the moments with you
        </p>
      </div>

      <div className={`status-hud ${phase !== "boot" && phase !== "shutter" ? "show" : ""}`}>
        <span className="hud-line">SONY α M5</span>
        <span className="hud-line dim">f/1.4 · 1/125 · ISO 400</span>
        <span className={`hud-line gold ${phase === "capture" || phase === "brand" ? "pulse" : ""}`}>
          {phase === "boot" || phase === "shutter"
            ? "OPENING…"
            : phase === "power"
              ? "POWERING ON…"
              : phase === "lens"
                ? "FOCUSING…"
                : phase === "capture"
                  ? "CAPTURED"
                  : "READY"}
        </span>
      </div>

      <div className={`progress-wrap ${phase !== "boot" ? "show" : ""}`}>
        <div className="progress-bar" />
      </div>

      <div className={`full-flash ${phase === "capture" ? "fire" : ""}`} />

      <style>{`
        .splash-root {
          transition: opacity 0.9s ease, filter 0.9s ease, transform 0.9s ease;
        }
        .phase-exit {
          opacity: 0;
          filter: blur(10px);
          transform: scale(1.06);
          pointer-events: none;
        }
        .shutter-curtain {
          position: absolute;
          left: 0; right: 0;
          height: 52%;
          background: #0a0a0a;
          z-index: 90;
          transition: transform 1.05s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .shutter-curtain.top { top: 0; border-bottom: 1px solid #1a1a1a; }
        .shutter-curtain.bottom { bottom: 0; border-top: 1px solid #1a1a1a; }
        .phase-shutter .shutter-curtain.top,
        .phase-power .shutter-curtain.top,
        .phase-lens .shutter-curtain.top,
        .phase-capture .shutter-curtain.top,
        .phase-brand .shutter-curtain.top,
        .phase-exit .shutter-curtain.top { transform: translateY(-105%); }
        .phase-shutter .shutter-curtain.bottom,
        .phase-power .shutter-curtain.bottom,
        .phase-lens .shutter-curtain.bottom,
        .phase-capture .shutter-curtain.bottom,
        .phase-brand .shutter-curtain.bottom,
        .phase-exit .shutter-curtain.bottom { transform: translateY(105%); }

        .film-grain {
          position: absolute; inset: 0; z-index: 70; pointer-events: none;
          opacity: 0.2; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          animation: grain 0.35s steps(3) infinite;
        }
        @keyframes grain {
          0% { transform: translate(0,0); }
          33% { transform: translate(-1.5%,1%); }
          66% { transform: translate(1%,-1%); }
          100% { transform: translate(0,0); }
        }

        .splash-vignette {
          position: absolute; inset: 0; z-index: 5; pointer-events: none;
          background: radial-gradient(ellipse 65% 55% at 50% 48%, transparent 25%, rgba(0,0,0,0.75) 100%);
          opacity: 0;
          transition: opacity 1s ease;
        }
        .phase-power .splash-vignette,
        .phase-lens .splash-vignette,
        .phase-capture .splash-vignette,
        .phase-brand .splash-vignette { opacity: 1; }

        .brand-block {
          position: relative; z-index: 25;
          display: flex; flex-direction: column; align-items: center;
          opacity: 0; transform: translateY(20px) scale(0.92);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .brand-block.show {
          opacity: 1; transform: translateY(0) scale(1);
        }

        .aperture-brand {
          position: relative;
          width: 140px; height: 140px;
          display: flex; align-items: center; justify-content: center;
        }

        .aperture-ring {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          transform: scale(0.6) rotate(-30deg);
          opacity: 0;
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease;
        }
        .brand-block.show .aperture-ring {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }

        .aperture-blades {
          transform-origin: 60px 60px;
        }
        .brand-block.show .aperture-blades {
          animation: apertureOpen 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes apertureOpen {
          0%   { transform: scale(1.6) rotate(0deg); }
          60%  { transform: scale(0.95) rotate(25deg); }
          100% { transform: scale(1.05) rotate(18deg); }
        }

        .aperture-center,
        .aperture-center-ring {
          transform-origin: 60px 60px;
          transform: scale(0.28);
          transition: transform 1.1s cubic-bezier(0.22,1,0.36,1);
        }
        .brand-block.show .aperture-center,
        .brand-block.show .aperture-center-ring {
          transform: scale(1);
        }

        .brand-name {
          position: relative;
          z-index: 2;
          display: flex; align-items: baseline; gap: 2px;
          font-weight: 800; font-size: 1.15rem; letter-spacing: 0.18em;
          color: white; text-transform: uppercase;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.6s ease 0.45s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s;
        }
        .brand-block.show .brand-name {
          opacity: 1;
          transform: scale(1);
        }
        .brand-dom {
          color: #c5a880;
        }

        .brand-loc {
          margin-top: 14px;
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .brand-tag {
          margin-top: 12px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic; font-size: 0.95rem;
          color: rgba(255,255,255,0.45);
          transition: filter 1.1s ease, opacity 1s ease;
        }
        .brand-tag.blurred {
          filter: blur(5px);
          opacity: 0.4;
        }
        .brand-tag.sharp {
          filter: blur(0);
          opacity: 1;
        }

        .status-hud {
          position: absolute; bottom: 12%; left: 50%; transform: translateX(-50%);
          z-index: 25;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .status-hud.show { opacity: 1; }
        .hud-line {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          font-family: "JetBrains Mono", monospace;
        }
        .hud-line.dim { color: rgba(255,255,255,0.28); font-size: 8px; }
        .hud-line.gold { color: #c5a880; margin-top: 4px; }
        .hud-line.pulse { animation: hudPulse 0.8s ease; }
        @keyframes hudPulse {
          0%,100% { opacity: 1; }
          40% { opacity: 0.4; }
        }

        .progress-wrap {
          position: absolute; bottom: 7.5%; left: 50%; transform: translateX(-50%);
          width: min(200px, 45vw); height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px; overflow: hidden;
          opacity: 0; z-index: 25;
          transition: opacity 0.5s ease;
        }
        .progress-wrap.show { opacity: 1; }
        .progress-bar {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, #9a7f54, #e8c070);
          border-radius: 2px;
          animation: progressFill 5s cubic-bezier(0.22, 0.8, 0.3, 1) forwards;
        }
        @keyframes progressFill {
          to { width: 100%; }
        }

        .full-flash {
          position: absolute; inset: 0; z-index: 95; pointer-events: none;
          background: rgba(255,250,240,0);
        }
        .full-flash.fire {
          animation: fullFlash 0.35s ease-out;
        }
        @keyframes fullFlash {
          0% { background: rgba(255,250,240,0); }
          15% { background: rgba(255,250,240,0.85); }
          100% { background: rgba(255,250,240,0); }
        }
      `}</style>
    </div>
  );
}
