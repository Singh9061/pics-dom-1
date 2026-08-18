import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Camera Lens Transition — PicsDom signature
 * Sequence: Focus ring → AUTO FOCUS → LOCKED → progressive blur → shutter → black → onComplete
 */
export default function CameraLensTransition({
  active = false,
  onComplete,
  duration = 2.4,
}) {
  const overlayRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringInnerRef = useRef(null);
  const focusTextRef = useRef(null);
  const shutterRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!active || playedRef.current) return;
    playedRef.current = true;
    setVisible(true);

    const overlay = overlayRef.current;
    const ringOuter = ringOuterRef.current;
    const ringInner = ringInnerRef.current;
    const focusText = focusTextRef.current;
    const shutter = shutterRef.current;
    if (!overlay || !ringOuter || !ringInner || !focusText || !shutter) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        // keep black briefly then unmount handled by parent
      },
    });

    // Initial state
    gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
    gsap.set([ringOuter, ringInner], { scale: 0.4, opacity: 0 });
    gsap.set(focusText, { opacity: 0, y: 8 });
    gsap.set(shutter, { scaleY: 0, transformOrigin: "center center" });

    // 1. Focus rings appear + open
    tl.to(ringOuter, {
      scale: 1,
      opacity: 0.9,
      duration: 0.55,
      ease: "power2.out",
    })
      .to(
        ringInner,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.35"
      )
      // 2. Focus text
      .to(
        focusText,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // 3. Rings pulse / lock
      .to(ringOuter, {
        scale: 1.08,
        duration: 0.28,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      .to(
        focusText,
        {
          text: "FOCUS LOCKED",
          duration: 0.01,
        },
        "-=0.1"
      )
      // 4. Progressive blur intensifies (overlay already has backdrop)
      .to(overlay, {
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        duration: 0.55,
        ease: "power2.in",
      })
      // 5. Rings shrink toward center (zoom feel)
      .to(
        [ringOuter, ringInner],
        {
          scale: 0.15,
          opacity: 0.35,
          duration: 0.45,
          ease: "power3.in",
        },
        "-=0.25"
      )
      // 6. Shutter — black bars close
      .to(shutter, {
        scaleY: 1,
        duration: 0.22,
        ease: "power4.in",
      })
      .to(focusText, { opacity: 0, duration: 0.12 }, "-=0.15")
      .to([ringOuter, ringInner], { opacity: 0, duration: 0.12 }, "-=0.12")
      // Hold black
      .to({}, { duration: 0.28 });

    return () => {
      tl.kill();
    };
  }, [active, onComplete, duration]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      style={{
        background: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      aria-hidden
    >
      {/* Focus rings */}
      <div className="relative flex items-center justify-center">
        <div
          ref={ringOuterRef}
          className="absolute rounded-full border border-white/40"
          style={{
            width: "min(52vw, 320px)",
            height: "min(52vw, 320px)",
            boxShadow: "0 0 40px rgba(255,255,255,0.08)",
          }}
        />
        <div
          ref={ringInnerRef}
          className="absolute rounded-full border-2 border-white/80"
          style={{
            width: "min(28vw, 160px)",
            height: "min(28vw, 160px)",
          }}
        />
        {/* Crosshair */}
        <div className="absolute w-8 h-px bg-white/60" />
        <div className="absolute h-8 w-px bg-white/60" />

        <p
          ref={focusTextRef}
          className="absolute top-[calc(50%+110px)] text-[10px] tracking-[0.45em] uppercase text-white/90 font-medium"
        >
          AUTO FOCUS
        </p>
      </div>

      {/* Shutter — full black wipe */}
      <div
        ref={shutterRef}
        className="absolute inset-0 bg-black origin-center"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
