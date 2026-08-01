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
  const rowsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });

    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0 || window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", check);
    }

    gsap.set(rows, { y: 48, opacity: 0 });

    const trigger = ScrollTrigger.batch(rows, {
      start: "top bottom-=80px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
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
      className="relative w-full bg-bg py-32 px-6 md:px-12 lg:px-20 z-10 border-t border-gold/12 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">

        {/* Editorial header */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold block mb-5 font-medium">
            A Glimpse Into Our Favourite Love Stories
          </span>
          <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-[2.75rem] text-text leading-[1.2]">
            Stories that live
            <br className="hidden sm:block" />
            <span className="italic text-gold font-normal"> beyond the day</span>
          </h2>
        </div>

        {/* Alternating editorial story rows */}
        <div className="flex flex-col gap-24 md:gap-32">
          {loveStories.map(({ id, couple, tagline, excerpt, coverImage, link }, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={id}
                ref={(el) => (rowsRef.current[index] = el)}
                className={`group grid gap-10 md:gap-14 md:grid-cols-2 md:items-center ${isMobile ? "opacity-100" : "opacity-0"}`}
              >
                {/* Image */}
                <Link
                  to={link}
                  className={`relative aspect-[5/4] w-full overflow-hidden bg-surface ${reverse ? "md:order-2" : ""}`}
                >
                  <img
                    src={coverImage}
                    alt={couple}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-black/10 transition-colors duration-500" />
                </Link>

                {/* Text */}
                <div className={`flex flex-col justify-center ${reverse ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
                  <p className="font-serif text-base italic text-gold tracking-wide mb-3">
                    {tagline}
                  </p>
                  <h3 className="font-serif text-3xl font-light tracking-wide text-text md:text-4xl leading-tight">
                    {couple}
                  </h3>
                  <p className="mt-5 text-[15px] leading-8 text-text-muted font-light tracking-wide max-w-md">
                    {excerpt}
                  </p>
                  <Link
                    to={link}
                    className="mt-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-text group/link w-fit"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 group-hover/link:after:w-full group-hover/link:text-gold transition-colors duration-300">
                      See More
                    </span>
                    <FiArrowRight
                      size={13}
                      className="text-gold transition-transform duration-300 group-hover/link:translate-x-1.5"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="mt-24 text-center">
          <Link
            to="/gallery"
            className="inline-flex h-12 items-center justify-center border border-gold/25 px-12 text-[11px] font-medium uppercase tracking-[0.28em] text-text transition-all duration-400 hover:bg-gold hover:border-gold hover:text-white"
          >
            View All Stories
          </Link>
        </div>

      </div>
    </section>
  );
}
