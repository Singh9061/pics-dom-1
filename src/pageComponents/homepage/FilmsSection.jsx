import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic4, c1_pic6 } from "../../Assets/picture/client1";
import { c2_pic11, c2_pic12 } from "../../Assets/picture/client2";
import Tilt3D from "../../components/Tilt3D";

gsap.registerPlugin(ScrollTrigger);

const films = [
  {
    id: 1,
    title: "Aanya & Rohan",
    subtitle: "Palace Wedding Film",
    image: c2_pic11,
    duration: "04:12",
  },
  {
    id: 2,
    title: "Meera & Kabir",
    subtitle: "Intimate Heritage Film",
    image: c1_pic4,
    duration: "03:48",
  },
  {
    id: 3,
    title: "Priya & Arjun",
    subtitle: "Sangeet & Celebration",
    image: c2_pic12,
    duration: "05:02",
  },
  {
    id: 4,
    title: "Ishita & Dev",
    subtitle: "Sacred Vows Film",
    image: c1_pic6,
    duration: "03:25",
  },
];

export default function FilmsSection() {
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0 || window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", check);
    }

    gsap.set(cards, { y: 35, opacity: 0 });

    const trigger = ScrollTrigger.batch(cards, {
      start: "top bottom-=80px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
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
    <section className="relative z-10 w-full overflow-hidden bg-text px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
              Cinematic Stories
            </span>
            <h2 className="font-serif text-3xl font-light leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">
              Showcasing <span className="font-normal italic text-gold">Films</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="self-start text-[11px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-gold sm:self-auto"
          >
            View all films →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1100px" }}>
          {films.map(({ id, title, subtitle, image, duration }, index) => (
            <div
              key={id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={isMobile ? "opacity-100" : "opacity-0"}
            >
              <Tilt3D max={16} scale={1.05}>
                <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-400 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold">
                      <FiPlay size={20} className="ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-gold/90">
                      {duration}
                    </span>
                    <h3 className="font-serif text-lg font-light tracking-wide text-white">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-[11px] tracking-wide text-white/50">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
