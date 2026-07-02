import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const desktopLinksRef = useRef([]);

  /* ---------------- Theme Configuration ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(saved);
    setTheme(saved);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  /* ---------------- GSAP Scroll Interpolation ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        gsap.to(navRef.current, {
          backgroundColor: theme === "dark" ? "rgba(10, 10, 10, 0.75)" : "rgba(255, 255, 255, 0.75)",
          borderBottomColor: "var(--color-border, rgba(128, 128, 128, 0.2))",
          backdropFilter: "blur(24px)",
          height: "4.5rem", // Smoothly downsize header slightly on scroll
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Execute on initial run to anchor current scroll location state correctly
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

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
      // Open Timeline
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
      // Close Animation
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
        className="fixed inset-x-0 top-0 z-50 h-20 border-b border-transparent bg-transparent transition-colors duration-100"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-light uppercase tracking-[0.3em] text-text">
              Pics <span className="font-semibold italic">Dom</span>
            </span>
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
                  className={`relative py-1 text-xs font-medium uppercase tracking-[0.2em] transition-opacity duration-300 text-text ${isActive ? "opacity-100" : "opacity-60"
                    }`}
                >
                  {name}
                  {/* Underline System */}
                  <span
                    className="nav-line absolute bottom-0 left-0 h-px w-full bg-text"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center"
                    }}
                  />
                </Link>
              );
            })}

            {/* Utility Control */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual layout architecture theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-text transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
          </div>

          {/* Mobile Display Hooks */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-text"
            >
              {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="text-text p-1"
              aria-label="Open global directory navigation"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <div
        ref={menuRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed inset-0 z-60 flex flex-col justify-between bg-bg border-l border-border px-8 py-12 sm:px-12 md:px-16 w-full sm:max-w-md ml-auto shadow-2xl"
      >
        {/* Header Exit Hook */}
        <div className="flex justify-end w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="text-text p-2 hover:opacity-70 transition-opacity"
            aria-label="Close directory navigation"
          >
            <FiX size={26} />
          </button>
        </div>

        {/* Directory Structure */}
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
                  className={`block font-serif text-3xl font-light uppercase tracking-[0.15em] transition-all ${isActive ? "text-text pl-2 border-l-2 border-text font-normal" : "text-text opacity-50 hover:opacity-100"
                    }`}
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Metadata Footer */}
        <div className="pt-8 border-t border-border flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-text-muted">
          <span>Pics Dom Studio</span>
          <span>© 2026 Layout</span>
        </div>
      </div>
    </>
  );
}