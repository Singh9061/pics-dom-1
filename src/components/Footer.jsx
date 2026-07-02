import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiMapPin,
  FiPhone,
  FiMail
} from "react-icons/fi";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: <FiInstagram size={16} />, href: "#" },
  { name: "Facebook", icon: <FiFacebook size={16} />, href: "#" },
  { name: "Twitter", icon: <FiTwitter size={16} />, href: "#" },
  { name: "LinkedIn", icon: <FiLinkedin size={16} />, href: "#" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-border bg-bg text-text">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Column 1: Brand & Mantra (4/12 width) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xl font-light uppercase tracking-[0.3em]">
              Pics <span className="font-semibold italic">Dom</span>
            </h2>
            <div className="text-[10px] uppercase tracking-[0.25em] text-text-muted flex gap-2 items-center">
              <span>Visual Storytellers</span>
              <span className="opacity-40">•</span>
              <span>Memory Keepers</span>
            </div>
            <p className="max-w-sm text-xs leading-6 text-text-muted tracking-wide pt-2">
              Capturing timeless milestones through intentional lenses, transforming fragile light into persistent stories and memories into art.
            </p>
          </div>

          {/* Column 2: Studio Location & Coordinates (5/12 width) */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text">
              Studio Coordinates
            </h3>

            <div className="space-y-3 text-xs text-text-muted tracking-wide max-w-sm">
              <div className="flex gap-3 items-start">
                <FiMapPin size={14} className="mt-0.5 text-text shrink-0" />
                <p className="leading-5">
                  666X+WPC, Vishnu Nagar, Indira Nagar Awas Vikas Colony, Raebareli, UP 229001
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <FiPhone size={14} className="text-text shrink-0" />
                <a href="tel:+919235513863" className="hover:text-text transition-colors">
                  +91 92355 13863
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <FiMail size={14} className="text-text shrink-0" />
                <a href="mailto:picdomrbl@gmail.com" className="hover:text-text transition-colors">
                  picdomrbl@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Links (3/12 width) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text">
              Directory
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={scrollToTop}
                    className="text-text-muted tracking-wide hover:text-text transition-colors block py-0.5"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Intersect Blocks */}
            <div className="pt-4 flex gap-2.5">
              {socialLinks.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg text-text"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Premium Bottom Bar */}
      <div className="border-t border-border bg-card/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted sm:px-8 md:flex-row lg:px-12">
          <p>© 2026 Picsdom. All rights reserved.</p>
          <p className="text-center md:text-right">Designed for timeless photography.</p>
        </div>
      </div>
    </footer>
  );
}