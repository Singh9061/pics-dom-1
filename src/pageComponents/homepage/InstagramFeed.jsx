import { useEffect, useRef, useState } from "react";
import { FiInstagram } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  c1_pic1, c1_pic2, c1_pic3, c1_pic5, c1_pic7, c1_pic8, c1_pic9,
} from "../../Assets/picture/client1";
import {
  c2_pic2, c2_pic3, c2_pic5, c2_pic6, c2_pic8, c2_pic9, c2_pic11,
} from "../../Assets/picture/client2";

gsap.registerPlugin(ScrollTrigger);

const feedImages = [
  c1_pic1, c2_pic2, c1_pic2, c2_pic3, c1_pic3, c2_pic5,
  c1_pic5, c2_pic6, c1_pic7, c2_pic8, c1_pic8, c2_pic9,
  c1_pic9, c2_pic11,
];

const INSTAGRAM_URL = "https://www.instagram.com/picsdom.rbl?igsh=MXBqbXZtZm5oN2QyeA==";

export default function InstagramFeed() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });

    if (!gridRef.current || window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", check);
    }

    const cells = gridRef.current.querySelectorAll(".ig-cell");
    gsap.set(cells, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.batch(cells, {
      start: "top bottom-=30px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        }),
      once: true,
    });

    return () => {
      trigger.forEach((t) => t.kill());
      window.removeEventListener("resize", check);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg py-32 z-10 border-t border-gold/12 overflow-hidden"
    >
      {/* Full-bleed header */}
      <div className="px-6 md:px-12 lg:px-20 mb-12 text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold block mb-5 font-medium">
          Follow Us Along
        </span>
        <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-[2.75rem] text-text leading-[1.2]">
          On <span className="italic text-gold font-normal">Instagram</span>
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2.5 text-sm text-text-muted hover:text-gold transition-colors duration-300"
        >
          <FiInstagram size={15} />
          <span className="tracking-[0.15em]">@picsdom.rbl</span>
        </a>
      </div>

      {/* Full-width image strip — no side padding for editorial impact */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-0"
      >
        {feedImages.map((img, i) => (
          <a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`ig-cell group relative aspect-square overflow-hidden bg-surface ${isMobile ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-400">
              <FiInstagram
                size={20}
                className="text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
              />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-14 text-center px-6">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-3 border border-gold/25 px-10 text-[11px] font-medium uppercase tracking-[0.28em] text-text transition-all duration-400 hover:bg-gold hover:border-gold hover:text-white"
        >
          <FiInstagram size={14} />
          View on Instagram
        </a>
      </div>
    </section>
  );
}
