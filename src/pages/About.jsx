import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCamera, FiArrowRight, FiUsers, FiHeart } from "react-icons/fi";
import SectionField3D from "../components/three/SectionField3D";

const values = [
  {
    icon: <FiHeart size={20} className="text-gold" />,
    title: "Emotional Intuition",
    description:
      "We tune into the quiet heartbeats of your celebration—capturing the unscripted glances, private tears, and raw joy that definition alone cannot hold.",
  },
  {
    icon: <FiCamera size={20} className="text-gold" />,
    title: "Cultural Mastery",
    description:
      "From the intricate patterns of the mehendi to the grandeur of the phere, we deeply understand and honor every sacred ritual we document.",
  },
  {
    icon: <FiUsers size={20} className="text-gold" />,
    title: "Symphonic Alliance",
    description:
      "A luxury collective of 22 elite visual specialists, filmmakers, and light artists working in perfect synergy to preserve your legacy.",
  },
];

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-full transform-gpu overflow-x-hidden bg-bg text-text">
      <section className="relative flex min-h-[45vh] transform-gpu items-center justify-center border-b border-gold/10 bg-bg px-6 py-24 text-center md:px-12">
        <div
          className={`max-w-4xl transition-all duration-1000 ease-out will-change-transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.4em] text-text-muted/80">
            The Legacy of Pics Dom
          </span>
          <h1 className="font-serif text-4xl font-light uppercase leading-tight tracking-[0.15em] text-text sm:text-5xl md:text-6xl">
            Archiving Generations of <br />
            <span className="font-semibold italic text-gold">Sacred Love Stories</span>
          </h1>
        </div>
      </section>

      <SectionField3D height="h-[180px] md:h-[240px]" density="high" />

      <section className="mx-auto max-w-7xl transform-gpu px-6 py-24 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div
            className={`lg:col-span-5 lg:sticky lg:top-28 transition-all duration-1000 delay-150 ease-out will-change-transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-text-muted/80">
              Our Origin
            </span>
            <h2 className="font-serif text-3xl font-light uppercase leading-snug tracking-[0.12em] text-text md:text-4xl">
              From childhood <br />
              passion to a <br />
              <span className="font-semibold text-gold">heritage vision</span>.
            </h2>
            <div className="mt-8 hidden h-px w-24 bg-gold/30 lg:block" />
          </div>

          <div
            className={`space-y-8 text-base font-light leading-9 tracking-wide text-text-muted/90 transition-all duration-1000 delay-300 ease-out md:text-[17px] lg:col-span-7 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-lg font-light leading-relaxed text-text">
              Photography has been my absolute passion since childhood. What began simply as an innate love for capturing fleeting moments gradually blossomed into a lifelong dream: to build a leading, visionary studio within the fine-art photography space.
            </p>
            <p>
              As our perspective sharpened, so did our artistic calling. We realized that preserving luxury weddings and cultural tapestries requires more than raw technical skill; it demands an intimate connection to the soul of every family milestone.
            </p>
            <p>
              Today, that dream thrives as <strong>Pics Dom</strong>. I am incredibly proud to stand side-by-side with a remarkably talented team of 22 visual specialists, cinematographers, and editorial professionals who share this exact dedication.
            </p>
            <p className="border-t border-gold/20 pt-8 font-serif text-xl italic leading-relaxed text-text">
              "We believe every picture tells an irreplaceable story, and we are fiercely committed to capturing those memories with elevated creativity, professionalism, and flawless attention to detail."
            </p>
          </div>
        </div>
      </section>

      <section className="w-full transform-gpu border-y border-gold/20 bg-card/10 px-6 py-16 backdrop-blur-md">
        <div
          className={`mx-auto grid max-w-5xl grid-cols-2 gap-12 text-center transition-all duration-1000 delay-450 ease-out will-change-transform md:grid-cols-4 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <div className="font-serif text-3xl font-light text-text md:text-4xl">22</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-gold/80">
              Elite Specialists
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-light text-text md:text-4xl">250+</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-gold/80">
              Weddings Documented
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-light text-text md:text-4xl">15+</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-gold/80">
              Historic Destinations
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-light text-text md:text-4xl">99.9%</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-widest text-gold/80">
              Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      <SectionField3D height="h-[160px] md:h-[200px]" density="med" />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16">
        <div className="mb-16 text-center lg:text-left">
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-text-muted/80">
            How We Live It With You
          </span>
          <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] text-text sm:text-4xl">
            Our Creative <span className="font-semibold text-gold">Pillars</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon, title, description }, index) => (
            <div
              key={title}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
              className={`flex transform-gpu flex-col justify-between border border-gold/10 bg-card p-8 shadow-sm transition-all duration-700 ease-out hover:border-gold/20 hover:shadow-md ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-bg">
                {icon}
              </div>
              <div>
                <h3 className="mb-3 font-serif text-xl font-medium tracking-wide text-text">
                  {title}
                </h3>
                <p className="text-sm font-light leading-7 tracking-wide text-text-muted/90">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full transform-gpu overflow-hidden bg-black px-6 py-24 text-center text-white md:px-12">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl font-light uppercase leading-relaxed tracking-[0.2em] text-white sm:text-3xl md:text-4xl">
            Ready to write <br />
            your heirloom <span className="font-semibold italic text-gold">love story?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-sm font-light leading-8 tracking-wider text-white/70 sm:text-base">
            Allow our expert group of 22 artists to immerse themselves in your universe, translating traditions, emotions, and monuments into timeless family gold.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/reserve"
              className="group inline-flex h-12 w-52 items-center justify-center gap-4 bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-black/20 transition-colors duration-300 hover:bg-gold-hover"
            >
              <span>Reserve Date</span>
              <FiArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex h-12 w-52 items-center justify-center border border-white/20 bg-white/5 px-8 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              View Archives
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
