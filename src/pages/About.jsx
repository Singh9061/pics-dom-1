import { Link } from "react-router-dom";
import { FiCamera, FiAward, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";

const values = [
    {
        icon: <FiHeart size={20} className="text-gold" />,
        title: "Emotional Intuition",
        description: "We tune into the quiet heartbeats of your celebration—capturing the unscripted glances, private tears, and raw joy that definition alone cannot hold.",
    },
    {
        icon: <FiCamera size={20} className="text-gold" />,
        title: "Cultural Mastery",
        description: "From the intricate patterns of the mehendi to the grandeur of the phere, we deeply understand and honor every sacred ritual we document.",
    },
    {
        icon: <FiUsers size={20} className="text-gold" />,
        title: "Symphonic Alliance",
        description: "A luxury collective of 22 elite visual specialists, filmmakers, and light artists working in perfect synergy to preserve your legacy.",
    },
];

export default function About() {
    return (
        <div className="relative w-full bg-bg text-text">

            {/* 1. Cinematic Section Hero Header */}
            <section className="relative flex min-h-[45vh] items-center justify-center border-b border-gold/10 px-6 py-24 text-center md:px-12 bg-bg">
                <div className="max-w-4xl">
                    <span className="text-xs uppercase tracking-[0.4em] text-text-muted/80 block mb-4">
                        The Legacy of Pics Dom
                    </span>
                    <h1 className="font-serif text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl md:text-6xl leading-tight text-text">
                        Archiving Generations of <br />
                        <span className="font-semibold italic text-gold">Sacred Love Stories</span>
                    </h1>
                </div>
            </section>

            {/* 2. Main Narrative: The Evolution */}
            <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16">
                <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

                    {/* Large Left Floating Statement */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <span className="text-xs uppercase tracking-[0.3em] text-text-muted/80 block mb-4">
                            Our Origin
                        </span>
                        <h2 className="font-serif text-3xl font-light uppercase tracking-[0.12em] md:text-4xl leading-snug text-text">
                            From cultural <br />
                            fascination to a <br />
                            <span className="font-semibold text-gold">heritage vision</span>.
                        </h2>

                        {/* Fine line anchor */}
                        <div className="mt-8 hidden h-px w-24 bg-gold/30 lg:block" />
                    </div>

                    {/* Long Form Copy - Readability Optimized */}
                    <div className="lg:col-span-7 space-y-8 text-base md:text-[17px] leading-9 tracking-wide text-text-muted/90 font-light">
                        <p className="text-lg text-text font-light leading-relaxed">
                            Indian weddings are magnificent tapestries woven from centuries of tradition, family ties, and vibrant sensory details. What began as a deep fascination with freezing these grand, transient moments—the heavy rustle of bridal silk, the crackle of the sacred fire, and the silent look shared between parents—quickly evolved into a calling.
                        </p>
                        <p>
                            As our perspective sharpened, so did our purpose. We realized that luxury wedding photography requires more than technical mastery; it demands an intimate connection to the soul of the celebration. What started as a personal artistic journey bloomed into a dream: to build an exceptional archival house dedicated to luxury celebrations and heritage elopements globally.
                        </p>
                        <p>
                            Today, that dream thrives as <strong>Pics Dom</strong>. We stand side-by-side as a brilliant collective of 22 visual storytellers, filmmakers, and editorial professionals who share this exact artistic devotion. Together, we work seamlessly across palaces, historic destinations, and intimate settings to transform your milestones into breathtaking visual keepsakes.
                        </p>
                        <p className="border-t border-gold/20 pt-8 font-serif text-xl italic text-text leading-relaxed">
                            "We believe that a wedding isn't just a single day—it is the foundation of a family's evolving legacy. We are completely committed to preserving your love story with absolute artistry, warmth, and respect."
                        </p>
                    </div>

                </div>
            </section>

            {/* 3. Collective Footprint (Stats Ribbon) */}
            <section className="w-full border-y border-gold/20 bg-card/10 backdrop-blur-md py-16 px-6">
                <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl text-text">22</div>
                        <div className="mt-2 text-[11px] uppercase tracking-widest text-gold/80 font-medium">Elite Specialists</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl text-text">250+</div>
                        <div className="mt-2 text-[11px] uppercase tracking-widest text-gold/80 font-medium">Weddings Documented</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl text-text">15+</div>
                        <div className="mt-2 text-[11px] uppercase tracking-widest text-gold/80 font-medium">Historic Destinations</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl text-text">01</div>
                        <div className="mt-2 text-[11px] uppercase tracking-widest text-gold/80 font-medium">Immersive Approach</div>
                    </div>
                </div>
            </section>

            {/* 4. Pillars of Production (Core Values) */}
            <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16">
                <div className="mb-16 text-center lg:text-left">
                    <span className="text-xs uppercase tracking-[0.3em] text-text-muted/80 block mb-3">
                        How We Live It With You
                    </span>
                    <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] sm:text-4xl text-text">
                        Our Creative <span className="font-semibold text-gold">Pillars</span>
                    </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map(({ icon, title, description }) => (
                        <div
                            key={title}
                            className="p-8 border border-gold/10 bg-card flex flex-col justify-between transition-all duration-300 hover:border-gold/20 hover:shadow-xs"
                        >
                            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-gold/20">
                                {icon}
                            </div>
                            <div>
                                <h3 className="font-serif text-xl font-medium tracking-wide mb-3 text-text">{title}</h3>
                                <p className="text-sm leading-7 text-text-muted/90 tracking-wide font-light">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Team Statement & Action Panel */}
            <section className="relative w-full bg-black text-white py-24 px-6 text-center md:px-12 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-3xl">
                    <h2 className="font-serif text-2xl font-light uppercase tracking-[0.2em] sm:text-3xl md:text-4xl mb-6 leading-relaxed text-white">
                        Ready to write <br />
                        your heirloom <span className="font-semibold italic text-gold">love story?</span>
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 tracking-wider max-w-xl mx-auto leading-8 font-light mb-10">
                        Allow our expert group of 22 artists to immerse themselves in your universe, translating traditions, emotions, and monuments into timeless family gold.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-4 bg-gold px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-gold-hover w-52 justify-center shadow-md shadow-black/20"
                        >
                            <span>Reserve Date</span>
                            <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 w-52 backdrop-blur-xs"
                        >
                            View Archives
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}