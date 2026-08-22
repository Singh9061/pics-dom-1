import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic1, c1_pic10 } from "../../Assets/picture/client1";
import { c2_pic2 } from "../../Assets/picture/client2";
import Tilt3D from "../../components/Tilt3D";

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
    <section className="relative z-10 w-full overflow-hidden border-t border-gold/10 bg-bg px-6 py-28 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
            Visual Storytellers
          </span>
          <h2 className="mb-6 font-serif text-3xl font-light leading-tight tracking-wide text-text sm:text-4xl md:text-5xl">
            Life&apos;s most beautiful memories
            <br />
            aren&apos;t posed —{" "}
            <span className="font-normal italic text-gold">they&apos;re felt</span>.
          </h2>
          <p className="max-w-2xl text-sm font-light leading-8 tracking-wide text-text-muted">
            We are more than wedding photographers and filmmakers. We are memory
            keepers and emotional archivists who become a part of your journey —
            preserving your day in its rawest, most real form.
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
            <FiArrowUpRight
              size={14}
              className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
          {weddingShowcaseItems.map(({ id, title, category, image, link }, index) => (
            <div
              key={id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={isMobile ? "opacity-100" : "opacity-0"}
            >
              <Tilt3D className="h-full" max={14} scale={1.04}>
                <Link
                  to={link}
                  className="group relative block aspect-[3/4] w-full overflow-hidden bg-card shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                >
                  <img
                    src={image}
                    alt={title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold">
                      {category}
                    </span>
                    <h3 className="font-serif text-xl font-light tracking-wide text-white sm:text-2xl">
                      {title}
                    </h3>
                  </div>
                </Link>
              </Tilt3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
