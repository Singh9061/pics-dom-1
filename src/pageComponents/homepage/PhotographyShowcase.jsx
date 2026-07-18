import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { c1_pic1, c1_pic10 } from "../../Assets/picture/client1";
import { c2_pic2 } from "../../Assets/picture/client2";

gsap.registerPlugin(ScrollTrigger);

const weddingShowcaseItems = [
    {
        id: 1,
        title: "The Sacred Phere",
        category: "Vows Around Fire / Luxury Destination",
        image: c1_pic10,
        link: "/gallery",
    },
    {
        id: 2,
        title: "The Royal Baraat",
        category: "Grand Entrance / High-Motion Narrative",
        image: c2_pic2,
        link: "/gallery",
    },
    {
        id: 3,
        title: "The Crimson Sindoor",
        category: "Emotional Heirlooms / Intimate Portraits",
        image: c1_pic1,
        link: "/gallery",
    },
];

export default function PhotographyShowcase() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check viewport type on layout paint
        const checkViewport = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkViewport();
        window.addEventListener("resize", checkViewport, { passive: true });

        const section = sectionRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section || cards.length === 0 || window.innerWidth < 1024) {
            return () => window.removeEventListener("resize", checkViewport);
        }

        // GSAP runs only on desktop viewports to preserve battery power and rendering threads on mobile devices
        gsap.set(cards, { y: 35, opacity: 0 });

        const trigger = ScrollTrigger.batch(cards, {
            start: "top bottom-=100px",
            onEnter: (batch) =>
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power2.out",
                    overwrite: "auto",
                }),
            once: true
        });

        return () => {
            trigger.forEach((t) => t.kill());
            window.removeEventListener("resize", checkViewport);
        };
    }, [isMobile]);

    /* ---------------- Desktop Pointer Interactions ---------------- */
    const handleMouseEnter = (e) => {
        if (isMobile) return;

        const card = e.currentTarget;
        const img = card.querySelector(".showcase-img");
        const overlay = card.querySelector(".showcase-overlay");
        const frame = card.querySelector(".showcase-frame");
        const content = card.querySelector(".showcase-content");
        const badge = card.querySelector(".showcase-badge");

        gsap.to(img, { scale: 1.04, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0.85, duration: 0.35, ease: "power1.out" });
        gsap.to(frame, { borderColor: "rgba(255, 255, 255, 0.1)", duration: 0.35 });
        gsap.to(content, { y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(badge, { opacity: 1, scale: 1, backgroundColor: "#c5a880", borderColor: "#c5a880", duration: 0.35, ease: "back.out(1.5)" });
    };

    const handleMouseLeave = (e) => {
        if (isMobile) return;

        const card = e.currentTarget;
        const img = card.querySelector(".showcase-img");
        const overlay = card.querySelector(".showcase-overlay");
        const frame = card.querySelector(".showcase-frame");
        const content = card.querySelector(".showcase-content");
        const badge = card.querySelector(".showcase-badge");

        gsap.to(img, { scale: 1.0, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0.7, duration: 0.35, ease: "power1.out" });
        gsap.to(frame, { borderColor: "rgba(255, 255, 255, 0)", duration: 0.35 });
        gsap.to(content, { y: 8, duration: 0.4, ease: "power2.out" });
        gsap.to(badge, { opacity: 0, scale: 0.75, duration: 0.35, ease: "power2.in" });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-bg px-6 py-24 md:px-12 lg:px-16 z-10 overflow-hidden border-t border-gold/10 transform-gpu"
        >
            <div className="mx-auto max-w-7xl">

                {/* Philosophy Header Block */}
                <div className="mb-20 max-w-4xl">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium block mb-4">
                        We don’t just capture weddings — we live them with you!
                    </span>

                    <h2 className="font-serif text-3xl font-light uppercase tracking-widest sm:text-4xl md:text-5xl leading-tight text-text mb-6">
                        Life’s most beautiful memories <br />
                        aren’t posed — <span className="font-semibold italic text-gold">they’re felt</span>.
                    </h2>

                    <p className="text-sm leading-7 text-text-muted tracking-wide max-w-3xl">
                        The unsaid glances, joyful tears, bursts of laughter, and quiet moments of love — we don’t just photograph these; we live them with you. We are visual storytellers, memory keepers, and emotional archivists who become a part of your journey.
                    </p>
                </div>

                {/* Sub-Header Grid Action Link */}
                <div className="mb-10 flex items-center justify-between border-b border-gold/20 pb-4">
                    <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-text font-medium">
                        Featured Ritual Archives
                    </h4>

                    <Link
                        to="/gallery"
                        className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text transition-colors duration-300 hover:text-gold"
                    >
                        <span>View All Portfolios</span>
                        <FiArrowUpRight size={16} className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                {/* 3-Card Ritual Grid Layout */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {weddingShowcaseItems.map(({ id, title, category, image, link }, index) => (
                        <Link
                            key={id}
                            to={link}
                            ref={(el) => (cardsRef.current[index] = el)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            /* 
                              Smooth hardware accelerated transition styles handled native via Tailwind on mobile screens
                            */
                            className={`group relative block aspect-3/4 w-full overflow-hidden bg-card border border-gold/10 shadow-md transition-all duration-700 transform-gpu will-change-transform ${isMobile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
                                <img
                                    src={image}
                                    alt={title}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    fetchpriority={index === 0 ? "high" : "auto"}
                                    decoding="async"
                                    className="showcase-img h-full w-full object-cover origin-center transform-gpu"
                                />
                            </div>

                            {/* Luxury Warm Vignette Overlay */}
                            <div className="showcase-overlay absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-70" />

                            {/* Card Meta Content Info */}
                            <div className="showcase-content absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end max-lg:translate-y-0 lg:translate-y-2">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2 block font-medium">
                                    {category}
                                </span>

                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-serif text-xl font-light tracking-wide text-white sm:text-2xl">
                                        {title}
                                    </h3>

                                    {/* Luxury Circular Arrow Tag */}
                                    <div className="showcase-badge flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white opacity-0 scale-75 lg:opacity-0 lg:scale-75 group-hover:opacity-100 group-hover:scale-100 max-lg:hidden">
                                        <FiArrowUpRight size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Fine-Art Camera Viewfinder Border Frame */}
                            <div className="showcase-frame absolute inset-4 pointer-events-none border border-transparent" />
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}