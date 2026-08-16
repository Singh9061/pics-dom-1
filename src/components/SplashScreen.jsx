import { useEffect, useRef } from "react";

export default function SplashScreen({ onFinish, duration = 3200 }) {
  const finished = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!finished.current) {
        finished.current = true;
        if (typeof onFinish === "function") onFinish();
      }
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onFinish]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050504]"
      style={{ animation: "splashFade 0.6s ease" }}
      onClick={() => {
        if (!finished.current) {
          finished.current = true;
          if (typeof onFinish === "function") onFinish();
        }
      }}
    >
      <div className="flex flex-col items-center" style={{ animation: "splashIn 0.8s ease both" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "2px solid rgba(197,168,128,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1.5px solid #c5a880",
            }}
          />
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: "0.2em",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          PICS<span style={{ color: "#c5a880" }}>DOM</span>
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 9,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Raebareli
        </div>
        <p
          style={{
            marginTop: 14,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          We live the moments with you
        </p>
      </div>
      <style>{`
        @keyframes splashIn {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
