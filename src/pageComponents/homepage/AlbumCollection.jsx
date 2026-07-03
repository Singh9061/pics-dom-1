import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiFolder, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c2_pic1, c2_pic10, c2_pic7 } from "../../Assets/picture/client2";

gsap.registerPlugin(ScrollTrigger);

const indianWeddingAlbums = [
  {
    id: "royal-palace-union",
    title: "The Palace Shehnai & Sindoor",
    count: "120 Heritage Frames",
    celebration: "Royal Baraat & Pheras",
    coverImage: c2_pic1,
    link: "/albums/royal-palace-union",
  },
  {
    id: "monochrome-tales",
    title: "Intimate Jharokha Portraits",
    count: "65 Cinematic Portraits",
    celebration: "Regal Bridal Dressing & Details",
    coverImage: c2_pic7,
    link: "/albums/intimate-jharokha",
  },
  {
    id: "sangeet-soiree",
    title: "The Champagne Sangeet Beats",
    count: "85 High-Motion Captures",
    celebration: "Midnight Shadi Festivities",
    coverImage: c2_pic10,
    link: "/albums/sangeet-soiree",
  },
];

export default function AlbumCollection() {
  const collectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0) return;

    gsap.set(rows, { y: 30, opacity: 0 });

    const trigger = ScrollTrigger.batch(rows, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        }),
      once: true,
    });

    return () => {
      trigger.forEach((t) => t.kill());
    };
  }, []);

  /* ---------------- Desktop GSAP Interaction Engines ---------------- */
  const handleMouseEnter = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const row = e.currentTarget;
    const image = row.querySelector(".album-cover-img");
    const titleText = row.querySelector(".album-title");
    const arrowCircle = row.querySelector(".album-arrow-circle");

    gsap.to(image, { scale: 1.03, duration: 0.6, ease: "power2.out" });
    gsap.to(titleText, { color: "#c5a880", duration: 0.3 });
    gsap.to(arrowCircle, {
      backgroundColor: "#c5a880",
      borderColor: "#c5a880",
      x: 4,
      color: "#ffffff",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const row = e.currentTarget;
    const image = row.querySelector(".album-cover-img");
    const titleText = row.querySelector(".album-title");
    const arrowCircle = row.querySelector(".album-arrow-circle");

    gsap.to(image, { scale: 1.0, duration: 0.6, ease: "power2.out" });
    gsap.to(titleText, { color: "var(--color-text, #1c1a17)", duration: 0.3 });
    gsap.to(arrowCircle, {
      backgroundColor: "transparent",
      borderColor: "rgba(197, 168, 128, 0.4)",
      x: 0,
      color: "var(--color-gold, #c5a880)",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <section
      ref={collectionRef}
      className="relative w-full bg-bg py-24 px-6 md:px-12 lg:px-16 z-10 border-t border-gold/20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-3">
            Luxury Shaadi Heirlooms
          </span>
          <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] sm:text-4xl md:text-5xl text-text">
            Heritage <span className="font-semibold italic text-gold">Archives</span>
          </h2>
        </div>

        {/* Landscape Album Row Layout */}
        <div className="flex flex-col gap-14">
          {indianWeddingAlbums.map(({ id, title, count, celebration, coverImage, link }, index) => (
            <div
              key={id}
              ref={(el) => (rowsRef.current[index] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group flex flex-col gap-8 border-b border-gold/20 pb-12 last:border-0 last:pb-0 md:flex-row md:items-center touch-manipulation will-change-transform"
            >

              {/* 1. Album Spine Cover Layer */}
              <Link
                to={link}
                className="relative aspect-16/10 w-full overflow-hidden bg-card md:w-100 lg:w-125 shrink-0 border border-gold/10 shadow-sm"
              >
                <img
                  src={coverImage}
                  alt={title}
                  loading="lazy"
                  className="album-cover-img h-full w-full object-cover origin-center"
                />

                {/* Traditional Fine-Art Premium Album Fold Line Overlay */}
                <div className="absolute top-0 left-0 h-full w-4 bg-linear-to-r from-black/25 via-black/5 to-transparent shadow-[inset_1px_0_0_rgba(255,255,255,0.08)]" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </Link>

              {/* 2. Indian Wedding Detailed Meta Content */}
              <div className="flex flex-1 flex-col justify-between py-2">
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-widest text-text-muted uppercase mb-4">
                    <span className="flex items-center gap-1.5 font-medium text-gold">
                      <FiFolder size={12} className="text-gold" />
                      {count}
                    </span>
                    <span className="text-gold/30 hidden sm:inline">&bull;</span>
                    <span className="tracking-[0.18em] text-text-muted/90">{celebration}</span>
                  </div>

                  <h3 className="album-title font-serif text-2xl font-light tracking-wide text-text md:text-3xl lg:text-4xl transition-colors duration-300">
                    {title}
                  </h3>
                </div>

                {/* Inline Action Trigger Layout */}
                <div className="mt-8 md:mt-12">
                  <Link
                    to={link}
                    className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-text group/btn"
                  >
                    <span className="group-hover/btn:text-gold transition-colors duration-300">View Love Story</span>
                    <div className="album-arrow-circle flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-transparent text-gold transition-all duration-300 max-lg:group-hover/btn:translate-x-1">
                      <FiArrowRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}