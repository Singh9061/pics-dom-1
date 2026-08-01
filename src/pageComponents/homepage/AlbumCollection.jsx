import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic1, c1_pic10 } from "../../Assets/picture/client1";
import { c2_pic1, c2_pic7, c2_pic10, c2_pic11 } from "../../Assets/picture/client2";

gsap.registerPlugin(ScrollTrigger);

const loveStories = [
  {
    id: "royal-union",
    couple: "Aanya & Rohan",
    tagline: "Romance in the palace",
    excerpt:
      "We felt it from our hearts when Aanya described Rohan as the missing piece that made her world complete. Over three days of rituals, laughter, and quiet glances, we were fortunate to capture a love story written in tradition and light.",
    coverImage: c2_pic1,
    link: "/gallery",
  },
  {
    id: "heritage-portraits",
    couple: "Meera & Kabir",
    tagline: "Intimate jharokha tales",
    excerpt:
      "Every wedding fills our heart in unique ways. At their intimate heritage ceremony, Meera and Kabir reminded us that the most powerful moments live in the soft spaces between the big ones — a smile, a tear, a held breath.",
    coverImage: c2_pic7,
    link: "/gallery",
  },
  {
    id: "sangeet-nights",
    couple: "Priya & Arjun",
    tagline: "Midnight celebration beats",
    excerpt:
      "From the first beat of the sangeet to the last dance under fairy lights, Priya and Arjun's night was pure joy. We lived every rhythm with them — documenting not just the party, but the pure, unfiltered happiness of two families becoming one.",
    coverImage: c2_pic10,
    link: "/gallery",
  },
  {
    id: "sacred-phere",
    couple: "Ishita & Dev",
    tagline: "Vows around the fire",
    excerpt:
      "Around the sacred fire, Ishita and Dev exchanged vows that needed no translation. We stayed quiet, present, and ready — capturing the emotion that words could never fully hold, so they can return to this night whenever they wish.",
    coverImage: c1_pic10,
    link: "/gallery",
  },
];

export default function AlbumCollection() {
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

    gsap.set(cards, { y: 40, opacity: 0 });

    const trigger = ScrollTrigger.batch(cards, {
      start: "top bottom-=60px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
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
      className="relative w-full bg-bg py-28 px-6 md:px-12 lg:px-16 z-10 border-t border-gold/15 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header — Epic Stories style */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold block mb-4 font-medium">
            A Glimpse Into Our Favourite Love Stories
          </span>
          <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl text-text leading-tight">
            Stories that live
            <span className="italic text-gold font-normal"> beyond the day</span>
          </h2>
        </div>

        {/* Story cards */}
        <div className="grid gap-12 md:grid-cols-2">
          {loveStories.map(({ id, couple, tagline, excerpt, coverImage, link }, index) => (
            <article
              key={id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group flex flex-col ${isMobile ? "opacity-100" : "opacity-0"}`}
            >
              <Link to={link} className="relative aspect-[4/3] w-full overflow-hidden bg-card mb-7">
                <img
                  src={coverImage}
                  alt={couple}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </Link>

              <div className="flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-light tracking-wide text-text md:text-3xl">
                  {couple}
                </h3>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.25em] text-gold italic font-serif text-base normal-case tracking-normal">
                  {tagline}
                </p>
                <p className="mt-4 text-sm leading-7 text-text-muted font-light tracking-wide line-clamp-4">
                  {excerpt}
                </p>

                <Link
                  to={link}
                  className="mt-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-text group/link"
                >
                  <span className="group-hover/link:text-gold transition-colors duration-300">See More</span>
                  <FiArrowRight
                    size={14}
                    className="text-gold transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-16 text-center">
          <Link
            to="/gallery"
            className="inline-flex h-12 items-center justify-center border border-gold/30 px-10 text-[11px] font-medium uppercase tracking-[0.25em] text-text transition-all duration-400 hover:bg-gold hover:border-gold hover:text-white"
          >
            View All Stories
          </Link>
        </div>

      </div>
    </section>
  );
}
