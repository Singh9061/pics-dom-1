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
  { name: "The Gallery", path: "/gallery" },
  { name: "Our Story", path: "/about" },
  { name: "Atelier Contact", path: "/contact" },
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
    <footer className="border-t border-gold/10 bg-bg text-text">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">

          {/* Column 1: Brand & Mantra (4/12 width) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-light uppercase tracking-[0.3em] text-text">
              Pics <span className="font-semibold italic text-gold">Dom</span>
            </h2>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-text-muted/80 flex gap-2 items-center">
              <span>Heritage Curators</span>
              <span className="text-gold/40">•</span>
              <span>Legacy Archives</span>
            </div>
            <p className="max-w-sm text-base leading-8 text-text-muted/90 font-light tracking-wide pt-2">
              Preserving generational milestones through highly intentional visual lenses, transforming fleeting emotion into enduring family heirlooms.
            </p>
          </div>

          {/* Column 2: Studio Location & Coordinates (5/12 width) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              The Atelier Coordinates
            </h3>

            <div className="space-y-4 text-base text-text-muted/90 font-light tracking-wide max-w-sm">
              <div className="flex gap-4 items-start">
                <FiMapPin size={16} className="mt-1.5 text-gold shrink-0" />
                <p className="leading-7">
                  666X+WPC, Vishnu Nagar, Indira Nagar Awas Vikas Colony, Raebareli, Uttar Pradesh 229001
                </p>
              </div>

              <div className="flex gap-4 items-center pt-2">
                <FiPhone size={16} className="text-gold shrink-0" />
                <a href="tel:+919235513863" className="hover:text-gold transition-colors tracking-widest">
                  +91 92355 13863
                </a>
              </div>

              <div className="flex gap-4 items-center">
                <FiMail size={16} className="text-gold shrink-0" />
                <a href="mailto:hello@picsdom.com" className="hover:text-gold transition-colors underline decoration-1 underline-offset-4 decoration-gold/20">
                  hello@picsdom.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Links (3/12 width) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              The Archives
            </h3>
            <ul className="space-y-3.5 text-base font-light">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={scrollToTop}
                    className="text-text-muted/90 tracking-wide hover:text-gold transition-colors block py-0.5"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Intersect Blocks */}
            <div className="pt-6 flex gap-3">
              {socialLinks.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/10 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-bg text-text hover:text-gold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Premium Bottom Bar */}
      <div className="border-t border-gold/10 bg-card/10 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted/80 sm:px-8 md:flex-row lg:px-12">
          <p>© 2026 Picsdom. All rights reserved.</p>
          <p className="text-center md:text-right tracking-[0.2em]">Designed for timeless cinematography & luxury heritage archives.</p>
        </div>
      </div>
    </footer>
  );
} 