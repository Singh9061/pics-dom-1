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

    setTimeout(() => { try { ctx.close(); } catch { /* */ } }, 250);
  } catch { /* autoplay */ }
}

/** Sony-style mirrorless body + lens (CSS/SVG illustration) */
function SonyCamera({ phase }) {
  return (
    <div className={`sony-cam ${phase}`}>
      {/* ── Body ── */}
      <div className="cam-body">
        {/* Top plate */}
        <div className="cam-top">
          <div className="hot-shoe" />
          <div className="mode-dial">
            <div className="dial-mark" />
          </div>
          <div className="shutter-btn" />
          <div className="power-led" />
        </div>

        {/* Front face */}
        <div className="cam-front">
          {/* Brand + model */}
          <div className="cam-brand">
            <span className="sony-logo">SONY</span>
            <span className="model-badge">α M5</span>
          </div>

          {/* Grip texture hint */}
          <div className="cam-grip" />

          {/* ── Lens assembly ── */}
          <div className="lens-assembly">
            <div className="lens-barrel lens-ring-1" />
            <div className="lens-barrel lens-ring-2" />
            <div className="lens-barrel lens-ring-3" />
            <div className="lens-focus-ring">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="focus-tick" style={{ "--t": i }} />
              ))}
            </div>
            <div className="lens-front-element">
              {/* Glass reflections */}
              <div className="glass-reflect r1" />
              <div className="glass-reflect r2" />
              {/* Iris aperture inside lens */}
              <svg className="iris-svg" viewBox="0 0 100 100">
                <g className="iris-blades">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const a = (i * 60 * Math.PI) / 180;
                    const a2 = ((i + 1) * 60 * Math.PI) / 180;
                    const x1 = 50 + Math.cos(a) * 42;
                    const y1 = 50 + Math.sin(a) * 42;
                    const x2 = 50 + Math.cos(a2) * 42;
                    const y2 = 50 + Math.sin(a2) * 42;
                    const cx = 50 + Math.cos(a + Math.PI / 6) * 22;
                    const cy = 50 + Math.sin(a + Math.PI / 6) * 22;
                    return (
                      <path
                        key={i}
                        d={`M 50 50 L ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Z`}
                        fill="#c5a880"
                        opacity="0.9"
                      />
                    );
                  })}
                </g>
                <circle cx="50" cy="50" r="10" fill="#050504" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#c5a880" strokeWidth="0.8" opacity="0.5" />
              </svg>
            </div>
            {/* Lens hood edge */}
            <div className="lens-hood" />
          </div>
        </div>

        {/* Side grip shadow */}
        <div className="cam-side-shadow" />
      </div>

      {/* Capture flash ring (fires on shutter) */}
      <div className="capture-flash" />

      {/* Viewfinder frame overlay that "captures" */}
      <div className="viewfinder-frame">
        <span className="vf-corner tl" />
        <span className="vf-corner tr" />
        <span className="vf-corner bl" />
        <span className="vf-corner br" />
        <span className="vf-rec">● REC</span>
        <span className="vf-info">4K · 60p · S-Cinetone</span>
      </div>
    </div>
  );
}

export default function SplashScreen({ onFinish, duration = 4200 }) {
  const [phase, setPhase] = useState("boot"); // boot → power → lens → capture → brand → exit
  const finished = useRef(false);
  const soundPlayed = useRef(false);

  const triggerSound = useCallback(() => {
    if (soundPlayed.current) return;
    soundPlayed.current = true;
    playShutterClick();
  }, []);

  useEffect(() => {
    // Timeline of heavy UI phases
    const timers = [
      setTimeout(() => setPhase("power"), 200),
      setTimeout(() => setPhase("lens"), 700),
      setTimeout(() => {
        setPhase("capture");
        triggerSound();
      }, 1800),
      setTimeout(() => setPhase("brand"), 2400),
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
      {/* Film grain */}
      <div className="film-grain" aria-hidden="true" />

      {/* Vignette */}
      <div className="splash-vignette" />

      {/* Bokeh */}
      <div className="bokeh-layer">
        <div className="bokeh b1" />
        <div className="bokeh b2" />
        <div className="bokeh b3" />
        <div className="bokeh b4" />
      </div>

      {/* Scanline / HUD grid */}
      <div className="hud-grid" />

      {/* Camera stage */}
      <div className="cam-stage">
        <SonyCamera phase={phase} />
      </div>

      {/* Brand reveal under camera */}
      <div className={`brand-block ${phase === "brand" || phase === "exit" ? "show" : ""}`}>
        <div className="brand-name">
          <span>PICS</span>
          <span className="brand-o">D</span>
          <span className="brand-aperture">◉</span>
          <span>M</span>
        </div>
        <span className="brand-loc">Raebareli</span>
        <p className="brand-tag">We live the moments with you</p>
      </div>

      {/* Status HUD */}
      <div className={`status-hud ${phase !== "boot" ? "show" : ""}`}>
        <span className="hud-line">SONY α M5</span>
        <span className="hud-line dim">f/1.4 · 1/125 · ISO 400</span>
        <span className={`hud-line gold ${phase === "capture" || phase === "brand" ? "pulse" : ""}`}>
          {phase === "boot" || phase === "power"
            ? "POWERING ON…"
            : phase === "lens"
              ? "FOCUSING…"
              : phase === "capture"
                ? "CAPTURED"
                : "READY"}
        </span>
      </div>

      {/* Capture white flash overlay */}
      <div className={`full-flash ${phase === "capture" ? "fire" : ""}`} />

      <style>{`
        /* ── Root ── */
        .splash-root {
          transition: opacity 0.85s ease, filter 0.85s ease, transform 0.85s ease;
        }
        .phase-exit {
          opacity: 0;
          filter: blur(8px);
          transform: scale(1.05);
          pointer-events: none;
        }

        /* Grain */
        .film-grain {
          position: absolute; inset: 0; z-index: 70; pointer-events: none;
          opacity: 0.22; mix-blend-mode: overlay;
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
          background: radial-gradient(ellipse 65% 55% at 50% 48%, transparent 25%, rgba(0,0,0,0.7) 100%);
        }

        .bokeh-layer { position: absolute; inset: 0; z-index: 4; pointer-events: none; overflow: hidden; }
        .bokeh {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(184,155,108,0.3) 0%, transparent 70%);
          filter: blur(3px);
          animation: floatB 7s ease-in-out infinite;
        }
        .b1 { width: 100px; height: 100px; top: 12%; left: 10%; }
        .b2 { width: 70px; height: 70px; top: 60%; right: 12%; animation-delay: 1s; opacity: 0.6; }
        .b3 { width: 130px; height: 130px; bottom: 8%; left: 20%; animation-delay: 0.5s; opacity: 0.4; }
        .b4 { width: 50px; height: 50px; top: 28%; right: 20%; animation-delay: 1.8s; opacity: 0.55; }
        @keyframes floatB {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.08); }
        }

        /* HUD grid */
        .hud-grid {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image:
            linear-gradient(rgba(184,155,108,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,155,108,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .phase-power .hud-grid,
        .phase-lens .hud-grid,
        .phase-capture .hud-grid,
        .phase-brand .hud-grid { opacity: 1; }

        /* ── Camera stage ── */
        .cam-stage {
          position: relative; z-index: 20;
          transform: scale(0.55);
          opacity: 0;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }
        .phase-power .cam-stage,
        .phase-lens .cam-stage,
        .phase-capture .cam-stage,
        .phase-brand .cam-stage {
          transform: scale(1);
          opacity: 1;
        }
        .phase-brand .cam-stage {
          transform: scale(0.72) translateY(-28px);
        }

        /* ── Sony camera body ── */
        .sony-cam {
          position: relative;
          width: 280px;
          height: 200px;
        }

        .cam-body {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #0e0e0e 100%);
          border-radius: 14px 18px 12px 12px;
          box-shadow:
            0 20px 50px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -2px 8px rgba(0,0,0,0.4);
          overflow: visible;
        }

        .cam-top {
          position: absolute; top: 0; left: 12%; right: 8%;
          height: 18px;
          background: linear-gradient(180deg, #333 0%, #1f1f1f 100%);
          border-radius: 6px 8px 0 0;
        }
        .hot-shoe {
          position: absolute; top: 2px; left: 50%; transform: translateX(-50%);
          width: 36px; height: 8px;
          background: #111;
          border-radius: 2px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
        }
        .mode-dial {
          position: absolute; top: -6px; right: 24px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #3a3a3a, #151515);
          box-shadow: 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          animation: dialSpin 2.5s ease-out 0.8s both;
        }
        .dial-mark {
          position: absolute; top: 3px; left: 50%; width: 2px; height: 6px;
          background: #c5a880; transform: translateX(-50%);
          border-radius: 1px;
        }
        @keyframes dialSpin {
          0% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
        .shutter-btn {
          position: absolute; top: -4px; right: 52px;
          width: 14px; height: 10px;
          border-radius: 3px;
          background: linear-gradient(180deg, #444, #222);
          box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }
        .phase-capture .shutter-btn {
          transform: translateY(2px);
          transition: transform 0.08s ease;
        }
        .power-led {
          position: absolute; top: 6px; left: 16px;
          width: 5px; height: 5px; border-radius: 50%;
          background: #333;
          box-shadow: none;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .phase-power .power-led,
        .phase-lens .power-led,
        .phase-capture .power-led,
        .phase-brand .power-led {
          background: #c5a880;
          box-shadow: 0 0 8px rgba(184,155,108,0.8);
        }

        .cam-front {
          position: absolute; inset: 18px 0 0 0;
          display: flex; align-items: center; justify-content: center;
        }

        .cam-brand {
          position: absolute; top: 10px; left: 16px;
          display: flex; flex-direction: column; gap: 2px;
          opacity: 0;
          transition: opacity 0.5s ease 0.4s;
        }
        .phase-power .cam-brand,
        .phase-lens .cam-brand,
        .phase-capture .cam-brand,
        .phase-brand .cam-brand { opacity: 1; }
        .sony-logo {
          font-size: 9px; font-weight: 700; letter-spacing: 0.25em;
          color: rgba(255,255,255,0.7); text-transform: uppercase;
        }
        .model-badge {
          font-size: 8px; letter-spacing: 0.15em;
          color: #c5a880; font-weight: 600;
        }

        .cam-grip {
          position: absolute; right: 8px; top: 20px; bottom: 16px; width: 28px;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.03) 3px,
            rgba(255,255,255,0.03) 4px
          );
          border-radius: 4px;
        }

        /* ── Lens ── */
        .lens-assembly {
          position: relative;
          width: 110px; height: 110px;
          display: flex; align-items: center; justify-content: center;
          transform: scale(0.3);
          opacity: 0;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.5s ease;
        }
        .phase-lens .lens-assembly,
        .phase-capture .lens-assembly,
        .phase-brand .lens-assembly {
          transform: scale(1);
          opacity: 1;
        }

        .lens-barrel {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(184,155,108,0.35);
          background: radial-gradient(circle at 40% 35%, #2a2a2a, #0a0a0a);
        }
        .lens-ring-1 { width: 110px; height: 110px; }
        .lens-ring-2 { width: 92px; height: 92px; border-color: rgba(184,155,108,0.25); }
        .lens-ring-3 { width: 76px; height: 76px; border-color: rgba(184,155,108,0.2); }

        .lens-focus-ring {
          position: absolute; width: 100px; height: 100px; border-radius: 50%;
          animation: focusRotate 3s linear infinite;
          animation-play-state: paused;
        }
        .phase-lens .lens-focus-ring { animation-play-state: running; }
        .phase-capture .lens-focus-ring,
        .phase-brand .lens-focus-ring { animation-play-state: paused; }
        @keyframes focusRotate {
          to { transform: rotate(360deg); }
        }
        .focus-tick {
          position: absolute; left: 50%; top: 0;
          width: 1.5px; height: 6px;
          background: rgba(184,155,108,0.5);
          transform-origin: center 50px;
          transform: rotate(calc(var(--t) * 20deg)) translateX(-50%);
        }

        .lens-front-element {
          position: absolute; width: 58px; height: 58px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #1a2530 0%, #050504 70%);
          box-shadow:
            inset 0 0 12px rgba(100,140,200,0.15),
            0 0 0 2px rgba(184,155,108,0.3);
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .glass-reflect {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
        }
        .r1 { width: 18px; height: 10px; top: 12px; left: 10px; transform: rotate(-30deg); }
        .r2 { width: 10px; height: 6px; bottom: 14px; right: 12px; opacity: 0.5; }

        .iris-svg {
          width: 48px; height: 48px;
          transform: scale(1.3) rotate(0deg);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .phase-lens .iris-svg { transform: scale(1) rotate(20deg); }
        .phase-capture .iris-svg,
        .phase-brand .iris-svg { transform: scale(0.85) rotate(35deg); }
        .iris-blades {
          transform-origin: center;
          animation: irisPulse 2s ease-in-out infinite;
          animation-play-state: paused;
        }
        .phase-lens .iris-blades { animation-play-state: running; }
        @keyframes irisPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .lens-hood {
          position: absolute; width: 118px; height: 118px; border-radius: 50%;
          border: 3px solid rgba(30,30,30,0.9);
          box-shadow: inset 0 0 8px rgba(0,0,0,0.5);
          pointer-events: none;
        }

        /* Capture flash ring around lens */
        .capture-flash {
          position: absolute; left: 50%; top: 55%; transform: translate(-50%, -50%);
          width: 130px; height: 130px; border-radius: 50%;
          border: 2px solid rgba(255,245,220,0);
          box-shadow: 0 0 0 0 rgba(184,155,108,0);
          pointer-events: none;
          z-index: 30;
        }
        .phase-capture .capture-flash {
          animation: captureRing 0.6s ease-out forwards;
        }
        @keyframes captureRing {
          0% { border-color: rgba(255,245,220,0.9); box-shadow: 0 0 30px 8px rgba(184,155,108,0.5); transform: translate(-50%,-50%) scale(0.9); }
          100% { border-color: rgba(255,245,220,0); box-shadow: 0 0 60px 20px rgba(184,155,108,0); transform: translate(-50%,-50%) scale(1.4); }
        }

        /* Viewfinder HUD corners */
        .viewfinder-frame {
          position: absolute; inset: -24px;
          pointer-events: none; opacity: 0;
          transition: opacity 0.5s ease;
        }
        .phase-lens .viewfinder-frame,
        .phase-capture .viewfinder-frame,
        .phase-brand .viewfinder-frame { opacity: 1; }
        .vf-corner {
          position: absolute; width: 18px; height: 18px;
          border-color: rgba(184,155,108,0.7); border-style: solid;
        }
        .vf-corner.tl { top: 0; left: 0; border-width: 1.5px 0 0 1.5px; }
        .vf-corner.tr { top: 0; right: 0; border-width: 1.5px 1.5px 0 0; }
        .vf-corner.bl { bottom: 0; left: 0; border-width: 0 0 1.5px 1.5px; }
        .vf-corner.br { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }
        .vf-rec {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          font-size: 8px; letter-spacing: 0.2em; color: #e05555;
          opacity: 0;
        }
        .phase-capture .vf-rec { opacity: 1; animation: recBlink 0.6s ease; }
        @keyframes recBlink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .vf-info {
          position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%);
          font-size: 7px; letter-spacing: 0.15em; color: rgba(184,155,108,0.6);
          white-space: nowrap;
        }

        /* Full screen flash on capture */
        .full-flash {
          position: absolute; inset: 0; z-index: 55; pointer-events: none;
          background: rgba(255,250,240,0);
        }
        .full-flash.fire {
          animation: whiteFlash 0.45s ease-out forwards;
        }
        @keyframes whiteFlash {
          0% { background: rgba(255,250,240,0.85); }
          100% { background: rgba(255,250,240,0); }
        }

        /* Brand block */
        .brand-block {
          position: relative; z-index: 25;
          margin-top: 28px;
          display: flex; flex-direction: column; align-items: center;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .brand-block.show {
          opacity: 1; transform: translateY(0);
        }
        .brand-name {
          display: flex; align-items: center;
          font-weight: 800; font-size: 1.6rem; letter-spacing: 0.22em;
          color: white; text-transform: uppercase;
        }
        .brand-aperture {
          color: #c5a880; font-size: 0.85em; margin: 0 1px;
        }
        .brand-loc {
          margin-top: 6px;
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .brand-tag {
          margin-top: 14px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic; font-size: 0.95rem;
          color: rgba(255,255,255,0.4);
        }

        /* Status HUD */
        .status-hud {
          position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%);
          z-index: 25;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .status-hud.show { opacity: 1; }
        .hud-line {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .hud-line.dim { color: rgba(255,255,255,0.25); font-size: 8px; }
        .hud-line.gold { color: #c5a880; margin-top: 4px; }
        .hud-line.pulse { animation: hudPulse 0.8s ease; }
        @keyframes hudPulse {
          0%,100% { opacity: 1; }
          40% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
