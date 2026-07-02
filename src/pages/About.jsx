import { Link } from "react-router-dom";
import { FiCamera, FiAward, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";

const values = [
    {
        icon: <FiHeart size={20} className="text-red-400" />,
        title: "Raw Passion",
        description: "Born from a childhood fascination, our love for the craft remains the heartbeat of every frame we capture.",
    },
    {
        icon: <FiCamera size={20} className="text-blue-400" />,
        title: "Meticulous Detail",
        description: "We don't just take pictures; we deliberately compose light, shadow, and texture to preserve authentic stories.",
    },
    {
        icon: <FiUsers size={20} className="text-purple-400" />,
        title: "Professional Union",
        description: "A collaborative force of 22 specialists unified by a singular commitment to creative superiority.",
    },
];

export default function About() {
    return (
        <div className="relative w-full">

            {/* 1. Cinematic Section Hero Header */}
            <section className="relative flex min-h-[40vh] items-center justify-center border-b border-border px-6 py-20 text-center md:px-12">
                <div className="max-w-4xl">
                    <span className="text-xs uppercase tracking-[0.4em] text-text-muted block mb-4">
                        The Chronicle of Pics Dom
                    </span>
                    <h1 className="font-serif text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl md:text-6xl leading-tight">
                        Preserving Life’s <br />
                        <span className="font-semibold italic">Most Meaningful</span> Stories
                    </h1>
                </div>
            </section>

            {/* 2. Main Narrative: The Evolution */}
            <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16">
                <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

                    {/* Large Left Floating Statement */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-4">
                            Our Origin
                        </span>
                        <h2 className="font-serif text-3xl font-light uppercase tracking-[0.12em] md:text-4xl leading-snug">
                            From childhood <br />
                            curiosity to an <br />
                            <span className="font-semibold">industry vision</span>.
                        </h2>

                        {/* Visual placeholder representing camera focus element */}
                        <div className="mt-8 hidden h-px w-24 bg-border lg:block" />
                    </div>

                    {/* Long Form Copy */}
                    <div className="lg:col-span-7 space-y-8 text-sm leading-8 tracking-wide text-text-muted">
                        <p className="text-base text-text font-light leading-relaxed">
                            Photography has been my guiding passion since childhood. What began as a simple love for capturing fleeting moments—freezing the way afternoon light fell across a room or documenting unscripted family laughter—gradually transformed into a definitive career calling.
                        </p>
                        <p>
                            As the lens through which I viewed the world grew more focused, so did the ambition. What started as a solo creative journey evolved into a deep dream: to build a leading, vanguard institution within the global photography industry. An archival house where technical mastery meets unbounded visual storytelling.
                        </p>
                        <p>
                            Today, that dream manifests daily as <strong>Pics Dom</strong>. I am incredibly proud to stand alongside a brilliant collective of 22 creative professionals who share this identical vision, drive, and dedication. We work in absolute synergy, pushing past industry boundaries to yield exquisite visual assets.
                        </p>
                        <p className="border-t border-border pt-8 font-serif text-lg italic text-text">
                            "We believe that every single picture implicitly tells a deep human story, and we are fiercely committed to capturing yours with pristine creativity, absolute professionalism, and rigorous attention to detail."
                        </p>
                    </div>

                </div>
            </section>

            {/* 3. Collective Footprint (Stats Ribbon) */}
            <section className="w-full border-y border-border bg-card/30 backdrop-blur-sm py-16 px-6">
                <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl">22</div>
                        <div className="mt-2 text-[10px] uppercase tracking-widest text-text-muted">In-House Experts</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl">100%</div>
                        <div className="mt-2 text-[10px] uppercase tracking-widest text-text-muted">Storytelling Focus</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl">4K</div>
                        <div className="mt-2 text-[10px] uppercase tracking-widest text-text-muted">Creative Solutions</div>
                    </div>
                    <div>
                        <div className="font-serif text-3xl font-light md:text-4xl">01</div>
                        <div className="mt-2 text-[10px] uppercase tracking-widest text-text-muted">Shared Vision</div>
                    </div>
                </div>
            </section>

            {/* 4. Pillars of Production (Core Values) */}
            <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-16">
                <div className="mb-16 text-center lg:text-left">
                    <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-3">
                        How We Execute
                    </span>
                    <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] sm:text-4xl">
                        Our Studio <span className="font-semibold">Pillars</span>
                    </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map(({ icon, title, description }) => (
                        <div
                            key={title}
                            className="p-8 border border-border bg-card flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                        >
                            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-border">
                                {icon}
                            </div>
                            <div>
                                <h3 className="font-serif text-xl font-medium tracking-wide mb-3">{title}</h3>
                                <p className="text-xs leading-6 text-text-muted tracking-wide">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Team Statement & Action Panel */}
            <section className="relative w-full bg-black text-white py-24 px-6 text-center md:px-12 overflow-hidden">
                {/* Dynamic Abstract Light Leaks */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-3xl">
                    <h2 className="font-serif text-2xl font-light uppercase tracking-[0.2em] sm:text-3xl md:text-4xl mb-6 leading-relaxed">
                        Ready to immortalize <br />
                        your next <span className="font-semibold italic text-slate-300">chapter?</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-white/60 tracking-wider max-w-xl mx-auto leading-7 mb-10">
                        Let our professional alliance of 22 visionaries transform your milestones, editorial blueprints, or memories into flawless visual assets.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-4 bg-white px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90 w-52 justify-center"
                        >
                            <span>Book Session</span>
                            <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center justify-center border border-white/20 hover:border-white px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] transition-colors w-52"
                        >
                            See Our Work
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}