import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic4, c1_pic6 } from "../../Assets/picture/client1";
import { c2_pic11, c2_pic12 } from "../../Assets/picture/client2";

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
  const sectionRef = useRef(null);
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
    <section
      ref={sectionRef}
      className="relative w-full bg-text py-28 px-6 md:px-12 lg:px-16 z-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold block mb-4 font-medium">
              Cinematic Stories
            </span>
            <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl text-white leading-tight">
              Showcasing <span className="italic text-gold font-normal">Films</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-gold transition-colors duration-300 self-start sm:self-auto"
          >
            View all films →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {films.map(({ id, title, subtitle, image, duration }, index) => (
            <div
              key={id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative aspect-[3/4] overflow-hidden cursor-pointer ${isMobile ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white transition-all duration-400 group-hover:scale-110 group-hover:bg-gold group-hover:border-gold">
                  <FiPlay size={20} className="ml-0.5" />
                </div>
              </div>

              {/* Meta */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold/90 block mb-1">
                  {duration}
                </span>
                <h3 className="font-serif text-lg font-light tracking-wide text-white">
                  {title}
                </h3>
                <p className="text-[11px] text-white/50 tracking-wide mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
