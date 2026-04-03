import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/pricing", label: "Pricing" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();
  const { currentUser, signOut } = useAuth();
  const { showToast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    showToast("✅ Signed out successfully");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[90] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(247,241,231,0.92)" : "rgba(247,241,231,0.78)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid var(--accent-border)" : "1px solid transparent",
        height: 68,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <Link to="/" className="font-display font-extrabold text-lg sm:text-xl flex-shrink-0">
          <span style={{ color: "var(--text)" }}>Vendor</span>
          <span style={{ color: "var(--accent)" }}>Verse</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: location.pathname === link.path ? "var(--accent)" : "var(--text-muted)" }}
              onMouseEnter={(e) => { if (location.pathname !== link.path) e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { if (location.pathname !== link.path) e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex px-3 sm:px-4 py-2 rounded-card text-xs sm:text-sm font-semibold border transition-all duration-200"
                style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-glow)" }}
              >
                {currentUser.role.toUpperCase()}
              </Link>
              <button
                onClick={handleSignOut}
                className="hidden sm:block px-3 sm:px-4 py-2 rounded-card text-sm font-medium border transition-all duration-200 hover:border-accent"
                style={{ borderColor: "var(--border-color)", color: "var(--text-muted)", background: "transparent" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden sm:block px-3 sm:px-4 py-2 rounded-card text-sm font-medium border transition-all duration-200 hover:border-accent"
                style={{ borderColor: "var(--border-color)", color: "var(--text-muted)", background: "transparent" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden md:block px-3 sm:px-4 py-2 rounded-card text-sm font-bold border transition-all duration-200"
                style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-glow)" }}
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleCart}
            className="px-3 sm:px-4 py-2 rounded-card text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-200 relative"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(138,90,60,0.24)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            🛒 <span className="hidden xs:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "var(--danger)", color: "#fff" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden p-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ background: "rgba(247,241,231,0.96)", borderColor: "var(--border-color)" }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium py-2 transition-colors"
                style={{ color: location.pathname === link.path ? "var(--accent)" : "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <button
                onClick={handleSignOut}
                className="sm:hidden w-full text-left px-0 py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="sm:hidden w-full text-left px-0 py-2 text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="sm:hidden w-full text-left px-0 py-2 text-sm font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
