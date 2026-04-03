import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-[20px] border p-8 text-center" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Error 404
          </p>
          <h1 className="font-display font-extrabold text-4xl mb-3">Page Not Found</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Route <span style={{ color: "var(--accent)" }}>{location.pathname}</span> does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex px-5 py-3 rounded-card font-bold text-sm transition-all"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Return Home →
          </Link>
        </div>
      </section>
    </div>
  );
}
