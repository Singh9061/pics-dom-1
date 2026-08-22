import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiMapPin, FiMail, FiMessageSquare, FiArrowDownRight } from "react-icons/fi";
import SectionField3D from "../components/three/SectionField3D";

const ContactSection = () => {
  const headerRef = useRef(null);
  const infoTilesRef = useRef([]);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        infoTilesRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        mapContainerRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "power4.inOut",
        },
        "-=1"
      );
  }, []);

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden bg-bg px-6 py-20 text-text sm:px-12 lg:px-16">
      <SectionField3D
        height="h-[140px] md:h-[180px]"
        density="med"
        className="-mx-6 mb-12 sm:-mx-12 lg:-mx-16"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 pt-4 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between space-y-16 lg:col-span-6 lg:pr-12">
          <div ref={headerRef} className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
              <span>Documenting Worldwide</span>
              <FiArrowDownRight size={14} className="animate-pulse" />
            </div>
            <h1 className="font-serif text-4xl font-light uppercase leading-[1.15] tracking-[0.12em] text-text sm:text-5xl md:text-6xl">
              Let’s Archive <br />
              Your Sacred <span className="font-semibold italic text-gold">Union</span>
            </h1>
            <p className="max-w-md pt-2 text-sm leading-relaxed tracking-wide text-text-muted">
              Planning a heritage destination wedding, a majestic palace celebration, or an intimate heirloom session? Reach our concierge team via our primary digital channels.
            </p>
          </div>

          <div className="space-y-8 border-t border-gold/10 pt-10">
            <div
              ref={(el) => (infoTilesRef.current[0] = el)}
              className="group flex items-start gap-6 transition-transform duration-300 hover:translate-x-1"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-card shadow-xs">
                <FiMapPin size={16} className="text-gold" />
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted">
                  The Main Atelier
                </p>
                <p className="font-serif text-lg tracking-wide text-text">PICSDOM RAEBARELI</p>
                <p className="text-sm text-text-muted">Uttar Pradesh, India</p>
              </div>
            </div>

            <div
              ref={(el) => (infoTilesRef.current[1] = el)}
              className="group flex items-start gap-6 transition-transform duration-300 hover:translate-x-1"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-card shadow-xs">
                <FiMail size={16} className="text-gold" />
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted">
                  Legacy Consulting
                </p>
                <a
                  href="mailto:picsdomrbl@gmail.com"
                  className="block font-serif text-lg tracking-wide text-text underline decoration-gold/30 decoration-1 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                >
                  picsdomrbl@gmail.com
                </a>
              </div>
            </div>

            <div
              ref={(el) => (infoTilesRef.current[2] = el)}
              className="group flex items-start gap-6 transition-transform duration-300 hover:translate-x-1"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-card shadow-xs">
                <FiMessageSquare size={16} className="text-gold" />
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted">
                  Instant Consultation
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-text-muted">
                  Click our interactive floating green widget positioned at the bottom right corner of your screen to communicate with our studio calendar manager instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:col-span-6 lg:pl-6">
          <div
            ref={mapContainerRef}
            className="relative aspect-4/5 max-h-162.5 w-full overflow-hidden border border-gold/10 bg-card shadow-sm"
          >
            <div className="pointer-events-none absolute top-6 left-6 z-20 h-3 w-3 border-t border-l border-gold/30" />
            <div className="pointer-events-none absolute top-6 right-6 z-20 h-3 w-3 border-t border-r border-gold/30" />
            <div className="pointer-events-none absolute bottom-6 left-6 z-20 h-3 w-3 border-b border-l border-gold/30" />
            <div className="pointer-events-none absolute right-6 bottom-6 z-20 h-3 w-3 border-r border-b border-gold/30" />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7158.887839937782!2d81.24080964952509!3d26.214761766560336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ba1001d21bdd3%3A0x965bf69d9e3488db!2sPICSDOM%20RAEBARELI!5e0!3m2!1sen!2sin!4v1782995403894!5m2!1sen!2sin"
              className="h-full w-full opacity-90 grayscale invert-[0.85] transition-opacity duration-500 dark:grayscale-40 dark:invert-0"
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
