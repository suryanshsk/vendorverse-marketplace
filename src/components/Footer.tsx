import { Link } from "react-router-dom";

const platformLinks = [
  { label: "Home", path: "/" },
  { label: "Marketplace", path: "/products" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Pricing", path: "/pricing" },
];

const projectLinks = [
  { label: "About", path: "/about" },
  { label: "Team", path: "/about" },
  { label: "Roadmap", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const techLinks = ["React.js", "Node.js + Express", "MongoDB Atlas", "JWT Auth"];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="font-display font-extrabold text-xl inline-block mb-4">
              <span style={{ color: "var(--text)" }}>Vendor</span>
              <span style={{ color: "var(--accent)" }}>Verse</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A scalable multivendor e-commerce marketplace built with the MERN stack.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-3 sm:mb-4" style={{ color: "var(--text)" }}>Platform</h4>
            <div className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <Link key={link.label} to={link.path} className="text-sm transition-colors hover:text-accent" style={{ color: "var(--text-muted)" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-3 sm:mb-4" style={{ color: "var(--text)" }}>Project</h4>
            <div className="flex flex-col gap-2">
              {projectLinks.map((link) => (
                <Link key={link.label} to={link.path} className="text-sm transition-colors hover:text-accent" style={{ color: "var(--text-muted)" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-3 sm:mb-4" style={{ color: "var(--text)" }}>Tech Stack</h4>
            <div className="flex flex-col gap-2">
              {techLinks.map((tech) => (
                <span key={tech} className="text-sm" style={{ color: "var(--text-muted)" }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            © 2026 VendorVerse. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            Built with <span style={{ color: "var(--accent)" }}>React</span> · <span style={{ color: "var(--accent)" }}>Node</span> · <span style={{ color: "var(--accent)" }}>MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
