import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiMapPin, FiMail, FiMessageSquare, FiArrowDownRight } from "react-icons/fi";

const ContactSection = () => {
    const headerRef = useRef(null);
    const infoTilesRef = useRef([]);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Smooth cinematic staggered entrance
        tl.fromTo(headerRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2 }
        )
            .fromTo(infoTilesRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
                "-=0.8"
            )
            .fromTo(mapContainerRef.current,
                { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: "power4.inOut" },
                "-=1"
            );
    }, []);

    return (
        <section className="relative w-full min-h-screen bg-bg text-text py-20 px-6 sm:px-12 lg:px-16 overflow-hidden z-10">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pt-12">

                {/* LEFT SIDE: Heading & Minimal Info Stacks (Columns 1-6) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-16 lg:pr-12">

                    {/* Header Group */}
                    <div ref={headerRef} className="space-y-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-muted">
                            <span>Available Globally</span>
                            <FiArrowDownRight size={14} className="animate-pulse" />
                        </div>
                        <h1 className="font-serif text-4xl font-light uppercase tracking-[0.12em] sm:text-5xl md:text-6xl leading-[1.15]">
                            Let’s Frame <br />
                            Your Next <span className="font-semibold italic">Chapter</span>
                        </h1>
                        <p className="max-w-md text-sm text-text-muted leading-relaxed tracking-wide pt-2">
                            Have an editorial blueprint, commercial framework, or fine-art portrait request? Reach our production team via our official digital channels.
                        </p>
                    </div>

                    {/* Studio Coordinates List */}
                    <div className="space-y-8 border-t border-border pt-10">

                        {/* Tile 1: Location */}
                        <div
                            ref={(el) => (infoTilesRef.current[0] = el)}
                            className="group flex gap-6 items-start transition-transform duration-300 hover:translate-x-1"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                                <FiMapPin size={16} />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-[10px] font-semibold tracking-[0.25em] text-text-muted uppercase">Physical Canvas</p>
                                <p className="font-serif text-lg tracking-wide">PICSDOM RAEBARELI</p>
                                <p className="text-sm text-text-muted">Uttar Pradesh, India</p>
                            </div>
                        </div>

                        {/* Tile 2: Email */}
                        <div
                            ref={(el) => (infoTilesRef.current[1] = el)}
                            className="group flex gap-6 items-start transition-transform duration-300 hover:translate-x-1"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                                <FiMail size={16} />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-[10px] font-semibold tracking-[0.25em] text-text-muted uppercase">Digital Archiving</p>
                                <a
                                    href="mailto:hello@picsdom.com"
                                    className="font-serif text-lg tracking-wide block hover:text-text-muted transition-colors underline decoration-1 underline-offset-4"
                                >
                                    hello@picsdom.com
                                </a>
                            </div>
                        </div>

                        {/* Tile 3: Support Disclaimer */}
                        <div
                            ref={(el) => (infoTilesRef.current[2] = el)}
                            className="group flex gap-6 items-start transition-transform duration-300 hover:translate-x-1"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                                <FiMessageSquare size={16} />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-[10px] font-semibold tracking-[0.25em] text-text-muted uppercase">Instant Consultation</p>
                                <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                                    Click our interactive floating green widget positioned at the bottom right corner of your screen to communicate with our scheduling manager instantly.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE: The Framing Map Element (Columns 7-12) */}
                <div className="lg:col-span-6 flex items-center justify-center lg:pl-6 w-full">
                    <div
                        ref={mapContainerRef}
                        className="relative w-full aspect-4/5 max-h-162.5 overflow-hidden bg-card border border-border shadow-md"
                    >
                        {/* Architectural Viewfinder Corners */}
                        <div className="absolute top-6 left-6 h-3 w-3 border-t border-l border-text/30 z-20 pointer-events-none" />
                        <div className="absolute top-6 right-6 h-3 w-3 border-t border-r border-text/30 z-20 pointer-events-none" />
                        <div className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-text/30 z-20 pointer-events-none" />
                        <div className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-text/30 z-20 pointer-events-none" />

                        {/* Main Raw Map Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7158.887839937782!2d81.24080964952509!3d26.214761766560336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ba1001d21bdd3%3A0x965bf69d9e3488db!2sPICSDOM%20RAEBARELI!5e0!3m2!1sen!2sin!4v1782995403894!5m2!1sen!2sin"
                            className="w-full h-full grayscale invert-[0.85] dark:invert-0 dark:grayscale-40 transition-opacity duration-500 opacity-90"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="PICSDOM RAEBARELI Location Portfolio Map"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactSection;