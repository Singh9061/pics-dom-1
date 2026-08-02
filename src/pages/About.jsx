import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCamera, FiArrowRight, FiUsers, FiHeart } from "react-icons/fi";

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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Activates stagger offsets immediately after first browser paint frame
        const animationFrame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div className="relative w-full bg-bg text-text overflow-x-hidden transform-gpu">

            {/* 1. Cinematic Section Hero Header */}
            <section className="relative flex min-h-[45vh] items-center justify-center border-b border-gold/10 px-6 py-24 text-center md:px-12 bg-bg transform-gpu">
                <div
                    className={`max-w-4xl transition-all duration-1000 ease-out will-change-transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
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
            <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16 transform-gpu">
                <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

                    {/* Large Left Floating Statement */}
                    <div
                        className={`lg:col-span-5 lg:sticky lg:top-28 transition-all duration-1000 delay-150 ease-out will-change-transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-text-muted/80 block mb-4">
                            Our Origin
                        </span>
                        <h2 className="font-serif text-3xl font-light uppercase tracking-[0.12em] md:text-4xl leading-snug text-text">
                            From childhood <br />
                            passion to a <br />
                            <span className="font-semibold text-gold">heritage vision</span>.
                        </h2>
                        <div className="mt-8 hidden h-px w-24 bg-gold/30 lg:block" />
                    </div>

                    {/* Long Form Copy */}
                    <div
                        className={`lg:col-span-7 space-y-8 text-base md:text-[17px] leading-9 tracking-wide text-text-muted/90 font-light transition-all duration-1000 delay-300 ease-out ${mounted ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <p className="text-lg text-text font-light leading-relaxed">
                            Photography has been my absolute passion since childhood. What began simply as an innate love for capturing fleeting moments gradually blossomed into a lifelong dream: to build a leading, visionary studio within the fine-art photography space.
                        </p>
                        <p>
                            As our perspective sharpened, so did our artistic calling. We realized that preserving luxury weddings and cultural tapestries requires more than raw technical skill; it demands an intimate connection to the soul of every family milestone.
                        </p>
                        <p>
                            Today, that dream thrives as <strong>Pics Dom</strong>. I am incredibly proud to stand side-by-side with a remarkably talented team of 22 visual specialists, cinematographers, and editorial professionals who share this exact dedication.
                        </p>
                        <p className="border-t border-gold/20 pt-8 font-serif text-xl italic text-text leading-relaxed">
                            "We believe every picture tells an irreplaceable story, and we are fiercely committed to capturing those memories with elevated creativity, professionalism, and flawless attention to detail."
                        </p>
                    </div>

                </div>
            </section>

            {/* 3. Collective Footprint (Stats Ribbon) */}
            <section className="w-full border-y border-gold/20 bg-card/10 backdrop-blur-md py-16 px-6 transform-gpu">
                <div
                    className={`mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center transition-all duration-1000 delay-450 ease-out will-change-transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
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
                        <div className="font-serif text-3xl font-light md:text-4xl text-text">99.9%</div>
                        <div className="mt-2 text-[11px] uppercase tracking-widest text-gold/80 font-medium">Client Satisfaction</div>
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
                    {values.map(({ icon, title, description }, index) => (
                        <div
                            key={title}
                            style={{ transitionDelay: `${500 + index * 100}ms` }}
                            className={`p-8 border border-gold/10 bg-card flex flex-col justify-between transition-all duration-700 ease-out shadow-sm transform-gpu ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                } hover:border-gold/20 hover:shadow-md`}
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
            <section className="relative w-full bg-black text-white py-24 px-6 text-center md:px-12 overflow-hidden transform-gpu">
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
                            className="inline-flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 w-52 backdrop-blur-sm"
                        >
                            View Archives
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
