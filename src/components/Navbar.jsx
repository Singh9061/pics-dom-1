import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

// import { logo } from "../Assets";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  const menuRef = useRef(null);
  const linkRefs = useRef([]);

  /* ---------------- Theme ---------------- */

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

  /* ---------------- Scroll ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Mobile Animation ---------------- */

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.fromTo(
        linkRefs.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "power3.out"
        },
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.35,
        ease: "power3.in"
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled
          ? "border-b border-border backdrop-blur-xl"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}

          <Link to="/" className="flex items-center">
            {/* {logo ? (
              <img
                src={logo}
                alt="Pics Dom"
                className="h-10 w-auto object-contain"
              />
            ) :  */}
            <span className="text-2xl font-semibold uppercase tracking-[0.28em]">
              Pics Dom
            </span>
          </Link>

          {/* Desktop */}

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-sm uppercase tracking-[0.18em] transition-opacity duration-300 ${location.pathname === path
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
                  }`}
              >
                {name}

                {location.pathname === path && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-text"></span>
                )}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-105"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>

          {/* Mobile */}

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <button onClick={() => setIsOpen(true)}>
              <FiMenu size={25} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}

      <div
        ref={menuRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed inset-0 z-60 flex flex-col justify-center bg-bg px-8 sm:px-12 md:px-16"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-8 top-8"
        >
          <FiX size={30} />
        </button>

        <div className="space-y-8">
          {navLinks.map(({ name, path }, index) => (
            <div key={path} ref={(el) => (linkRefs.current[index] = el)}>
              <Link
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl font-medium uppercase tracking-[0.18em] transition-opacity duration-300 sm:text-4xl ${location.pathname === path
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
                  }`}
              >
                {name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <button
            onClick={toggleTheme}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-105"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}
