import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "Instagram", icon: <FiInstagram size={18} />, href: "#" },
  { name: "Facebook", icon: <FiFacebook size={18} />, href: "#" },
  { name: "Twitter", icon: <FiTwitter size={18} />, href: "#" },
  { name: "LinkedIn", icon: <FiLinkedin size={18} />, href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-[0.25em]">
              Pics Dom
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-text-muted">
              Capturing timeless moments through photography, turning light into
              stories and memories into art.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em]">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={scrollToTop}
                    className="text-sm opacity-75 text-text-muted transition-opacity duration-300 hover:opacity-100"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social/Contact Column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em]">
              Follow
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-borderr-card)] transition-all duration-300 hover:-translate-y-1 hover:bg-surface text-text"
                >
                  {icon}
                </a>
              ))}
            </div>

            <a
              href="mailto:hello@picsdom.com"
              className="mt-8 block text-sm text-text-muted transition-colors hover:text-text"
            >
              hello@picsdom.com
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-text-muted md:flex-row">
          <p>© {year} Pics Dom. All rights reserved.</p>
          <p>Designed for timeless photography.</p>
        </div>
      </div>
    </footer>
  );
}