import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const studioStats = [
  { value: "08+", label: "Years of Legacy" },
  { value: "250+", label: "Weddings Documented" },
  { value: "15+", label: "Palaces & Destinations" },
];

export default function MoreAboutSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-10 border-t border-gold/20 bg-bg">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

          {/* Left Column: Heading & Large Typography Statement */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-4">
              The Heritage Philosophy
            </span>

            <h2 className="font-serif text-3xl font-light uppercase tracking-[0.12em] sm:text-4xl md:text-5xl leading-tight mb-8 text-text">
              Documenting sacred traditions, <br />
              capturing <span className="font-semibold italic text-gold">raw emotion</span>.
            </h2>

            <blockquote className="border-l-2 border-gold/40 pl-6 font-serif text-lg italic text-text-muted/90 leading-relaxed max-w-2xl">
              "A wedding isn't just a fleeting event; it is the breathtaking convergence of heritage, families, and two souls. We don't just take pictures—we archive your legacy."
            </blockquote>

            {/* Call to Action Button */}
            <div className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-4 border border-gold/40 bg-transparent px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] text-text transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white"
              >
                <span>Discover Our Journey</span>
                <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Mini Narrative & Archive Statistics Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-12">
            <p className="text-sm leading-7 text-text-muted tracking-wide mb-12 lg:mb-16">
              Founded on the belief that pristine Indian wedding imagery requires deep cultural intuition and technical mastery, our studio serves as a fine-art haven for royal palace unions, intimate heritage elopements, and cinematic portraiture. We craft custom-tailored visual narratives that honor your family's grandest celebrations.
            </p>

            {/* Quick Stats Counter Panels */}
            <div className="grid grid-cols-3 gap-6 border-t border-gold/20 pt-8">
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