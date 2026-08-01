import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const studioStats = [
  { value: "08+", label: "Years of Legacy" },
  { value: "250+", label: "Weddings Documented" },
  { value: "15+", label: "Destinations" },
];

export default function MoreAboutSection() {
  return (
    <section className="relative w-full py-28 px-6 md:px-12 lg:px-16 z-10 border-t border-gold/15 bg-surface/40">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold block mb-5 font-medium">
              Our Philosophy
            </span>

            <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl leading-tight mb-8 text-text">
              Documenting sacred traditions,
              <br />
              capturing <span className="italic text-gold font-normal">raw emotion</span>.
            </h2>

            <blockquote className="border-l border-gold/40 pl-6 font-serif text-lg italic text-text-muted leading-relaxed max-w-2xl font-light">
              "A wedding isn&apos;t just a fleeting event — it is the convergence of heritage,
              families, and two souls. We don&apos;t just take pictures; we archive your legacy."
            </blockquote>

            <div className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-4 border border-gold/30 bg-transparent px-8 h-12 text-[11px] font-medium uppercase tracking-[0.25em] text-text transition-all duration-400 hover:bg-gold hover:border-gold hover:text-white"
              >
                <span>Discover Our Journey</span>
                <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-10">
            <p className="text-sm leading-8 text-text-muted tracking-wide mb-12 lg:mb-16 font-light">
              Founded on the belief that pristine wedding imagery requires deep cultural
              intuition and technical mastery, our studio serves as a fine-art haven for
              palace unions, intimate elopements, and cinematic portraiture.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-gold/15 pt-8">
              {studioStats.map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="font-serif text-2xl font-light tracking-wide sm:text-3xl md:text-4xl text-text">
                    {value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest leading-normal text-gold/80">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
