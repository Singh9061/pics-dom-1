import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Custom Camera Aperture SVG Icon to match the 'O' in DOM
const CameraApertureIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
    <polygon points="50,15 82,34 70,72 50,85 18,66 30,28" fill="none" />
    <path d="M50 10 L78 36 L62 38 Z" />
    <path d="M85 38 L72 74 L58 62 Z" />
    <path d="M72 76 L36 84 L40 68 Z" />
    <path d="M34 84 L14 54 L30 52 Z" />
    <path d="M14 52 L30 18 L42 30 Z" />
    <path d="M32 18 L68 12 L56 28 Z" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const desktopLinksRef = useRef([]);

  /* ---------------- GSAP Scroll & Route Interpolation ---------------- */
  useEffect(() => {
    const isHome = location.pathname === "/";

    const handleScroll = () => {
      if (window.scrollY > 30) {
        // Scrolled State
        gsap.to(navRef.current, {
          backgroundColor: "rgba(250, 250, 250, 0.95)",
          borderBottomColor: "rgba(197, 168, 128, 0.2)",
          backdropFilter: "blur(24px)",
          height: "4.5rem",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });

        if (isHome) {
          gsap.to(navRef.current.querySelectorAll(".nav-link-item"), { color: "var(--color-text, #1c1a17)", opacity: 0.6, duration: 0.3 });
          gsap.to(navRef.current.querySelectorAll(".nav-link-item.active-link"), { color: "var(--color-text, #1c1a17)", opacity: 1, duration: 0.3 });
          gsap.to(navRef.current.querySelector(".brand-text-wrapper"), { color: "var(--color-text, #1c1a17)", duration: 0.3 });
          gsap.to(navRef.current.querySelector(".menu-toggle-btn"), { color: "var(--color-text, #1c1a17)", duration: 0.3 });
        }
      } else {
        // Top / Idle State
        if (isHome) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            borderBottomColor: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            height: "5rem",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });

          gsap.to(navRef.current.querySelectorAll(".nav-link-item"), { color: "#ffffff", opacity: 0.7, duration: 0.3 });
          gsap.to(navRef.current.querySelectorAll(".nav-link-item.active-link"), { color: "#ffffff", opacity: 1, duration: 0.3 });
          gsap.to(navRef.current.querySelector(".brand-text-wrapper"), { color: "#ffffff", duration: 0.3 });
          gsap.to(navRef.current.querySelector(".menu-toggle-btn"), { color: "#ffffff", duration: 0.3 });
        } else {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            backdropFilter: "blur(0px)",
            height: "5rem",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });

          gsap.to(navRef.current.querySelectorAll(".nav-link-item"), { color: "var(--color-text, #1c1a17)", opacity: 0.6, duration: 0.3 });
          gsap.to(navRef.current.querySelectorAll(".nav-link-item.active-link"), { color: "var(--color-text, #1c1a17)", opacity: 1, duration: 0.3 });
          gsap.to(navRef.current.querySelector(".brand-text-wrapper"), { color: "var(--color-text, #1c1a17)", duration: 0.3 });
          gsap.to(navRef.current.querySelector(".menu-toggle-btn"), { color: "var(--color-text, #1c1a17)", duration: 0.3 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  /* ---------------- GSAP Desktop Hover Interaction ---------------- */
  const handleMouseEnter = (index) => {
    const line = desktopLinksRef.current[index]?.querySelector(".nav-line");
    if (line && location.pathname !== navLinks[index].path) {
      gsap.to(line, { scaleX: 1, transformOrigin: "left center", duration: 0.35, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (index) => {
    const line = desktopLinksRef.current[index]?.querySelector(".nav-line");
    if (line && location.pathname !== navLinks[index].path) {
      gsap.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.35, ease: "power2.out" });
    }
  };

  /* ---------------- GSAP Mobile Drawer Sequence ---------------- */
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      const tl = gsap.timeline();

      tl.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power4.out",
      });

      tl.fromTo(
        mobileLinksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out" },
        "-=0.3"
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Primary Navigation Shell */}
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-transparent bg-transparent transition-colors duration-200"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Brand Logo Layout Matching the Image Design */}
          <Link to="/" className="flex items-center group py-1">
            <div className="brand-text-wrapper flex flex-col items-center justify-center text-text transition-colors duration-300">

              {/* Main Brand Title: PICS DOM with Shutter Icon */}
              <div className="flex items-center font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider leading-none uppercase select-none">
                <span>PICS</span>
                <span className="ml-1.5 flex items-center">
                  D
                  <CameraApertureIcon className="inline-block w-4 h-4 sm:w-5 sm:h-5 mx-px transform group-hover:rotate-45 transition-transform duration-500 ease-out" />
                  M
                </span>
              </div>

              {/* Sub-Brand Location: RAEBARELI */}
              <span className="font-sans text-[8px] sm:text-[9px] font-bold tracking-[0.45em] leading-tight uppercase w-full text-center mt-0.5 opacity-90 select-none">
                RAEBARELI
              </span>

            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map(({ name, path }, index) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  ref={(el) => (desktopLinksRef.current[index] = el)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className={`nav-link-item relative py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 text-text ${isActive ? "opacity-100 active-link" : "opacity-60"
                    }`}
                >
                  {name}
                  <span
                    className="nav-line absolute bottom-0 left-0 h-px w-full bg-current"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center"
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Actions Drawer Anchor */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="menu-toggle-btn text-text p-1 hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Open directory navigation"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <div
        ref={menuRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed inset-0 z-60 flex flex-col justify-between bg-bg border-l border-gold/10 px-8 py-12 sm:px-12 md:px-16 w-full sm:max-w-md ml-auto shadow-2xl"
      >
        <div className="flex justify-end w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="text-text p-2 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Close directory navigation"
          >
            <FiX size={26} />
          </button>
        </div>

        <div className="space-y-6 my-auto">
          {navLinks.map(({ name, path }, index) => {
            const isActive = location.pathname === path;
            return (
              <div
                key={path}
                ref={(el) => (mobileLinksRef.current[index] = el)}
                className="overflow-hidden py-1"
              >
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-serif text-3xl font-light uppercase tracking-[0.15em] transition-all ${isActive ? "text-text pl-2 border-l-2 border-gold font-normal" : "text-text opacity-50 hover:opacity-100"
                    }`}
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="pt-8 border-t border-gold/10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-text-muted">
          <span>Pics Dom Raebareli</span>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}