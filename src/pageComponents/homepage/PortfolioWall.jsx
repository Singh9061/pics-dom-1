import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

/**
 * 4D Portfolio Wall — spatial photo field
 * Mouse X/Y → camera (lerped)
 * Wheel → depth travel (lerped)
 * Hover → photo forward, neighbors back (lerped)
 * Click → portal zoom into photo → /gallery
 */
export default function PortfolioWall() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const depthTarget = useRef(0);
  const depthCurrent = useRef(0);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const hoverZTarget = useRef({});
  const hoverZCurrent = useRef({});
  const scaleTarget = useRef({});
  const scaleCurrent = useRef({});
  const rafRef = useRef(null);
  const enteringRef = useRef(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const navigate = useNavigate();

  const photos = useMemo(() => {
    return MASTER_GALLERY_ARCHIVE.slice(0, 16).map((item, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      // Deterministic scatter (no random — stable layout)
      const jitterX = ((i * 17) % 11) - 5;
      const jitterY = ((i * 13) % 9) - 4;
      const x = (col - 1.5) * 28 + jitterX * 0.7;
      const y = (row - 1.5) * 26 + jitterY * 0.6;
      const z = ((i * 37) % 21) * 18 - 180; // -180..180-ish
      return { ...item, x, y, z, baseZ: z };
    });
  }, []);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);

    photos.forEach((p) => {
      hoverZTarget.current[p.id] = 0;
      hoverZCurrent.current[p.id] = 0;
      scaleTarget.current[p.id] = 1;
      scaleCurrent.current[p.id] = 1;
    });
  }, [photos]);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseTarget.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    const section = sectionRef.current;
    section?.addEventListener("mousemove", onMove, { passive: true });
    return () => section?.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      e.preventDefault();
      depthTarget.current = Math.max(
        -420,
        Math.min(320, depthTarget.current - e.deltaY * 0.35)
      );
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  // RAF loop with lerp
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // Camera
      mouseCurrent.current.x = lerp(
        mouseCurrent.current.x,
        mouseTarget.current.x,
        0.08
      );
      mouseCurrent.current.y = lerp(
        mouseCurrent.current.y,
        mouseTarget.current.y,
        0.08
      );
      depthCurrent.current = lerp(
        depthCurrent.current,
        depthTarget.current,
        0.1
      );

      const stage = stageRef.current;
      if (stage) {
        const { x, y } = mouseCurrent.current;
        stage.style.transform = `translateZ(${depthCurrent.current}px) rotateX(${-y * 6}deg) rotateY(${x * 9}deg)`;
      }

      photos.forEach((photo, i) => {
        const el = cardsRef.current[i];
        if (!el) return;
        const id = photo.id;
        hoverZCurrent.current[id] = lerp(
          hoverZCurrent.current[id] ?? 0,
          hoverZTarget.current[id] ?? 0,
          0.12
        );
        scaleCurrent.current[id] = lerp(
          scaleCurrent.current[id] ?? 1,
          scaleTarget.current[id] ?? 1,
          0.12
        );
        const ez = hoverZCurrent.current[id];
        const sc = scaleCurrent.current[id];
        el.style.transform = `translate3d(${photo.x}%, ${photo.y}%, ${photo.baseZ + ez}px) scale(${sc})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [photos]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.1,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.12,
      }
    );
  }, [photos]);

  const handleHover = useCallback(
    (id, enter) => {
      if (enteringRef.current) return;
      setHoveredId(enter ? id : null);
      photos.forEach((photo) => {
        if (enter && photo.id === id) {
          hoverZTarget.current[photo.id] = 200;
          scaleTarget.current[photo.id] = 1.14;
        } else if (enter) {
          hoverZTarget.current[photo.id] = -100;
          scaleTarget.current[photo.id] = 0.9;
        } else {
          hoverZTarget.current[photo.id] = 0;
          scaleTarget.current[photo.id] = 1;
        }
      });
    },
    [photos]
  );

  // Portal: zoom into clicked photo then navigate
  const handleEnter = useCallback(
    (e, photo, index) => {
      e.preventDefault();
      if (enteringRef.current) return;
      enteringRef.current = true;

      const el = cardsRef.current[index];
      if (!el) {
        navigate("/gallery");
        return;
      }

      // Others fade / push back
      cardsRef.current.forEach((card, i) => {
        if (!card || i === index) return;
        gsap.to(card, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        });
      });

      // Selected flies toward camera
      hoverZTarget.current[photo.id] = 520;
      scaleTarget.current[photo.id] = 1.55;

      gsap.to(el, {
        opacity: 1,
        duration: 0.55,
        ease: "power2.in",
        onComplete: () => {
          // Full black flash then route
          const flash = document.createElement("div");
          flash.style.cssText =
            "position:fixed;inset:0;background:#000;z-index:200;opacity:0;pointer-events:none";
          document.body.appendChild(flash);
          gsap.to(flash, {
            opacity: 1,
            duration: 0.28,
            ease: "power3.in",
            onComplete: () => {
              navigate("/gallery");
              setTimeout(() => flash.remove(), 80);
            },
          });
        },
      });
    },
    [navigate]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] min-h-[640px] overflow-hidden bg-black select-none"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]" />

      <div className="absolute top-10 left-0 right-0 z-30 px-6 text-center pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-2">
          Spatial Archive
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">
          The Wall
        </h2>
        <p className="mt-3 text-[11px] text-white/40 tracking-wide hidden sm:block">
          Move mouse · Scroll depth · Hover · Click to enter frame
        </p>
      </div>

      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transition: "none",
          willChange: "transform",
        }}
      >
        {photos.map((photo, index) => (
          <a
            key={photo.id}
            href="/gallery"
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseEnter={() => !isTouch && handleHover(photo.id, true)}
            onMouseLeave={() => !isTouch && handleHover(photo.id, false)}
            onClick={(e) => handleEnter(e, photo, index)}
            className="absolute overflow-hidden rounded-sm border border-white/10 shadow-2xl cursor-pointer"
            style={{
              width: "min(22vw, 200px)",
              aspectRatio: "3/4",
              left: "50%",
              top: "50%",
              marginLeft: "calc(min(22vw, 200px) / -2)",
              marginTop: "calc(min(22vw, 200px) * 4 / 6 / -2)",
              transform: `translate3d(${photo.x}%, ${photo.y}%, ${photo.z}px)`,
              transformStyle: "preserve-3d",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <img
              src={photo.img}
              alt={photo.alt}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover pointer-events-none"
              draggable={false}
            />
            <div
              className={`absolute inset-0 transition-opacity duration-400 ${
                hoveredId === photo.id ? "opacity-0" : "opacity-30"
              } bg-gradient-to-t from-black/70 via-transparent to-black/20`}
            />
          </a>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-auto">
        <a
          href="/gallery"
          onClick={(e) => {
            e.preventDefault();
            navigate("/gallery");
          }}
          className="text-[10px] uppercase tracking-[0.35em] text-white/60 hover:text-gold transition-colors duration-300 border border-white/15 px-6 py-3 hover:border-gold/40"
        >
          Enter Full Archive
        </a>
      </div>
    </section>
  );
}
