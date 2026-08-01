import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic1, c1_pic10 } from "../../Assets/picture/client1";
import { c2_pic2 } from "../../Assets/picture/client2";

gsap.registerPlugin(ScrollTrigger);

const weddingShowcaseItems = [
  {
    id: 1,
    title: "The Sacred Phere",
    category: "Vows Around Fire",
    image: c1_pic10,
    link: "/gallery",
  },
  {
    id: 2,
    title: "The Royal Baraat",
    category: "Grand Entrance",
    image: c2_pic2,
    link: "/gallery",
  },
  {
    id: 3,
    title: "Quiet Moments",
    category: "Intimate Portraits",
    image: c1_pic1,
    link: "/gallery",
  },
];

export default function PhotographyShowcase() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0 || window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", checkViewport);
    }

    gsap.set(cards, { y: 35, opacity: 0 });

    const trigger = ScrollTrigger.batch(cards, {
      start: "top bottom-=100px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        }),
      once: true,
    });

    return () => {
      trigger.forEach((t) => t.kill());
      window.removeEventListener("resize", checkViewport);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg px-6 py-28 md:px-12 lg:px-16 z-10 overflow-hidden border-t border-gold/10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Philosophy block */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium block mb-5">
            Visual Storytellers
          </span>

          <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl leading-tight text-text mb-6">
            Life&apos;s most beautiful memories
            <br />
            aren&apos;t posed — <span className="italic text-gold font-normal">they&apos;re felt</span>.
          </h2>

          <p className="text-sm leading-8 text-text-muted tracking-wide max-w-2xl font-light">
            We are more than wedding photographers and filmmakers. We are memory keepers
            and emotional archivists who become a part of your journey — preserving your day
            in its rawest, most real form.
          </p>
        </div>

        <div className="mb-10 flex items-center justify-between border-b border-gold/15 pb-4">
          <h4 className="font-serif text-sm tracking-wide text-text">
            Featured Moments
          </h4>
          <Link
            to="/gallery"
            className="group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-gold"
          >
            <span>View Portfolio</span>
            <FiArrowUpRight size={14} className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weddingShowcaseItems.map(({ id, title, category, image, link }, index) => (
            <Link
              key={id}
              to={link}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative block aspect-[3/4] w-full overflow-hidden bg-card ${isMobile ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={image}
                alt={title}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-400" />

              <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2 block">
                  {category}
                </span>
                <h3 className="font-serif text-xl font-light tracking-wide text-white sm:text-2xl">
                  {title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
