import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const studioStats = [
  { value: "08+", label: "Years of Legacy" },
  { value: "250+", label: "Weddings Documented" },
  { value: "15+", label: "Destinations" },
  { value: "100%", label: "Heart in Every Frame" },
];

export default function MoreAboutSection() {
  return (
    <section className="relative w-full z-10 border-t border-gold/12 overflow-hidden">

      {/* Top philosophy band */}
      <div className="bg-bg py-32 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold block mb-6 font-medium">
            Our Philosophy
          </span>

          <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-[2.75rem] leading-[1.25] text-text mb-8">
            Documenting sacred traditions,
            <br />
            capturing <span className="italic text-gold font-normal">raw emotion</span>.
          </h2>

          <p className="text-[15px] leading-8 text-text-muted font-light tracking-wide max-w-2xl mx-auto">
            Founded on the belief that pristine wedding imagery requires deep cultural
            intuition and technical mastery. We serve as a fine-art haven for palace unions,
            intimate elopements, and cinematic portraiture — preserving your day in its
            rawest, most real form.
          </p>

          <blockquote className="mt-12 font-serif text-xl md:text-2xl italic text-text/80 leading-relaxed max-w-xl mx-auto font-light">
            "A wedding isn&apos;t just a fleeting event — it is the convergence of heritage,
            families, and two souls."
          </blockquote>

          <div className="mt-12">
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 border border-gold/25 bg-transparent px-10 h-12 text-[11px] font-medium uppercase tracking-[0.28em] text-text transition-all duration-400 hover:bg-gold hover:border-gold hover:text-white"
            >
              <span>Discover Our Journey</span>
              <FiArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar — full width, dark editorial */}
      <div className="bg-text">
        <div className="mx-auto max-w-6xl px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {studioStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white">
                  {value}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gold/90">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
