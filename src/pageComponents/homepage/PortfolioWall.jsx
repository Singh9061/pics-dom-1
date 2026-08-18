import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { MASTER_GALLERY_ARCHIVE } from "../../data/galleryData";

/**
 * 4D Portfolio Wall — spatial photo field
 * Mouse X/Y → camera (perspective rotate)
 * Wheel → depth travel (Z)
 * Hover → photo comes forward, neighbors push back
 */
export default function PortfolioWall() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const depthRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoverZRef = useRef({}); // id → extra Z offset
  const scaleRef = useRef({}); // id → scale
  const rafRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  const photos = useMemo(() => {
    return MASTER_GALLERY_ARCHIVE.slice(0, 16).map((item, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = (col - 1.5) * 28 + (Math.random() - 0.5) * 8;
      const y = (row - 1.5) * 26 + (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 380;
      return { ...item, x, y, z, baseZ: z };
    });
  }, []);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current = { x: nx, y: ny };
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
      depthRef.current = Math.max(
        -420,
        Math.min(320, depthRef.current - e.deltaY * 0.35)
      );
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  // Apply stage camera + per-card transforms every frame
  useEffect(() => {
    const tick = () => {
      const stage = stageRef.current;
      if (stage) {
        const { x, y } = mouseRef.current;
        const rotY = x * 9;
        const rotX = -y * 6;
        const z = depthRef.current;
        stage.style.transform = `translateZ(${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      photos.forEach((photo, i) => {
        const el = cardsRef.current[i];
        if (!el) return;
        const extraZ = hoverZRef.current[photo.id] ?? 0;
        const scale = scaleRef.current[photo.id] ?? 1;
        el.style.transform = `translate3d(${photo.x}%, ${photo.y}%, ${photo.baseZ + extraZ}px) scale(${scale})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [photos]);

  // Fade in
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
      setHoveredId(enter ? id : null);

      photos.forEach((photo) => {
        if (enter && photo.id === id) {
          hoverZRef.current[photo.id] = 180;
          scaleRef.current[photo.id] = 1.12;
        } else if (enter) {
          hoverZRef.current[photo.id] = -90;
          scaleRef.current[photo.id] = 0.92;
        } else {
          hoverZRef.current[photo.id] = 0;
          scaleRef.current[photo.id] = 1;
        }
      });
    },
    [photos]
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
          Move mouse · Scroll depth · Hover to pull forward
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
          <Link
            key={photo.id}
            to="/gallery"
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseEnter={() => !isTouch && handleHover(photo.id, true)}
            onMouseLeave={() => !isTouch && handleHover(photo.id, false)}
            className="absolute overflow-hidden rounded-sm border border-white/10 shadow-2xl cursor-pointer transition-[box-shadow] duration-400"
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
          </Link>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-auto">
        <Link
          to="/gallery"
          className="text-[10px] uppercase tracking-[0.35em] text-white/60 hover:text-gold transition-colors duration-300 border border-white/15 px-6 py-3 hover:border-gold/40"
        >
          Enter Full Archive
        </Link>
      </div>
    </section>
  );
}
