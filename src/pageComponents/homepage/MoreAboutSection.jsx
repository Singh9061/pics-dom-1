import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const studioStats = [
  { value: "08+", label: "Years Behind the Lens" },
  { value: "150+", label: "Sessions Delivered" },
  { value: "12+", label: "International Features" },
];

export default function MoreAboutSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Heading & Large Typography Statement */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-4">
              Our Philosophy
            </span>
            
            <h2 className="font-serif text-3xl font-light uppercase tracking-[0.12em] sm:text-4xl md:text-5xl leading-tight mb-8">
              Chasing natural light, <br />
              capturing <span className="font-semibold italic">raw emotion</span>.
            </h2>

            <blockquote className="border-l-2 border-border pl-6 font-serif text-lg italic text-text-muted leading-relaxed max-w-2xl">
              "Photography isn't just about preserving a frame; it's about translating a fleeting, silent second into an everlasting visual artifact."
            </blockquote>
            
            {/* Call to Action Button */}
            <div className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-4 border border-text bg-text px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] text-bg transition-all duration-300 hover:bg-transparent hover:text-text"
              >
                <span>More About Our Studio</span>
                <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Mini Narrative & Archive Statistics Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-12">
            <p className="text-sm leading-7 text-text-muted tracking-wide mb-12 lg:mb-16">
              Founded on the belief that pristine imagery requires deep intuition and technical mastery, Pics Dom serves as a fine-art haven for editorial fashion, cinematic landscapes, and intimate portrait frames. We craft custom-tailored creative directions for every single client archive.
            </p>

            {/* Quick Stats Counter Panels */}
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {studioStats.map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="font-serif text-2xl font-light tracking-wide sm:text-3xl md:text-4xl">
                    {value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest leading-normal text-text-muted">
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