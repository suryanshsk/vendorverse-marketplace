import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

const miniProducts = [
  { emoji: "🎧", name: "Earbuds Pro", price: "₹2,499" },
  { emoji: "⌚", name: "Smart Watch", price: "₹8,999" },
  { emoji: "👟", name: "Running Shoes", price: "₹3,499" },
  { emoji: "⌨️", name: "Keyboard", price: "₹4,799" },
];

const features = [
  { icon: "🏪", title: "Multi-Vendor Marketplace", desc: "Multiple vendors can register, list products, and manage their stores independently on a single platform." },
  { icon: "🔐", title: "JWT Role-Based Auth", desc: "Secure authentication with JSON Web Tokens supporting Customer, Vendor, and Admin roles." },
  { icon: "💳", title: "Payment Gateway", desc: "Integrated payment processing through Razorpay and Stripe for seamless transactions." },
  { icon: "📊", title: "Vendor Analytics", desc: "Real-time dashboards with revenue charts, order tracking, and performance metrics." },
  { icon: "🔍", title: "Smart Search & Filter", desc: "Advanced product search with category filters, price ranges, and vendor-specific browsing." },
  { icon: "📱", title: "Responsive Design", desc: "Pixel-perfect responsive design that works flawlessly across desktop, tablet, and mobile." },
];

const steps = [
  { num: "01", title: "Register", desc: "Create your vendor account in minutes" },
  { num: "02", title: "Setup Store", desc: "Add products, set prices, customize storefront" },
  { num: "03", title: "Customers Shop", desc: "Buyers discover and purchase your products" },
  { num: "04", title: "Get Paid", desc: "Receive payments directly to your account" },
];

const roles = [
  { icon: "🛍️", title: "Customer", desc: "Browse, search, and purchase products from multiple vendors.", perms: ["Browse all vendor products", "Add items to cart & wishlist", "Track order status", "Leave reviews & ratings", "Manage account settings"] },
  { icon: "🏬", title: "Vendor", desc: "List products, manage orders, and grow your online store.", perms: ["Create & manage product listings", "View sales analytics dashboard", "Process & fulfill orders", "Respond to customer reviews", "Customize store profile"], featured: true },
  { icon: "⚙️", title: "Admin", desc: "Oversee the entire marketplace operations and moderate content.", perms: ["Approve/reject vendor applications", "Manage all users & roles", "Monitor platform analytics", "Handle disputes & refunds", "Configure platform settings"] },
];

const techStack = [
  { icon: "⚛️", name: "React.js", type: "Frontend" },
  { icon: "🟢", name: "Node.js", type: "Runtime" },
  { icon: "🚂", name: "Express.js", type: "Backend" },
  { icon: "🍃", name: "MongoDB", type: "Database" },
  { icon: "🔑", name: "JWT Auth", type: "Security" },
  { icon: "💰", name: "Razorpay", type: "Payments" },
  { icon: "▲", name: "Vercel", type: "Hosting" },
  { icon: "🐙", name: "GitHub", type: "Version Control" },
];

export default function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden" style={{ padding: "96px 0" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(0,194,178,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            mask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border mb-8" style={{ borderColor: "var(--accent-border)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "var(--accent)" }} />
                <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>MERN Stack · Full Stack · Production Ready</span>
              </div>

              <h1 className="font-display font-extrabold leading-[1.08] tracking-[-0.04em] mb-6" style={{ fontSize: "var(--t-hero)" }}>
                One Platform.{" "}
                <span className="relative inline-block" style={{ color: "var(--accent)" }}>
                  Infinite
                  <span className="absolute bottom-0 left-0 w-full h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
                </span>{" "}
                Vendors.
              </h1>

              <p className="mb-8 max-w-lg leading-relaxed" style={{ fontSize: "var(--t-md)", color: "var(--text-muted)" }}>
                VendorVerse is a scalable multivendor e-commerce marketplace where vendors thrive, customers discover, and admins orchestrate — all in one unified platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-card font-bold text-sm transition-all duration-200 inline-flex items-center gap-2"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  Explore Products →
                </Link>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-card font-bold text-sm border transition-all duration-200"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.background = "var(--accent-glow)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "transparent"; }}
                >
                  Vendor Dashboard
                </Link>
              </div>

              <div className="flex gap-10">
                {[
                  { num: "500+", label: "Products Listed" },
                  { num: "120+", label: "Active Vendors" },
                  { num: "12k+", label: "Happy Customers" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-extrabold text-2xl">
                      {s.num.replace("+", "")}<span style={{ color: "var(--accent)" }}>+</span>
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Browser Mockup */}
            <div className="hidden lg:block relative">
              <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#22C55E" }} />
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md text-xs font-mono" style={{ background: "var(--surface2)", color: "var(--text-dim)" }}>
                    vendorverse.com/marketplace
                  </div>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {miniProducts.map((p) => (
                    <div key={p.name} className="p-3 rounded-lg border transition-all duration-200 hover:border-accent/30" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
                      <div className="text-3xl mb-2">{p.emoji}</div>
                      <p className="text-xs font-medium mb-1" style={{ color: "var(--text)" }}>{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>{p.price}</span>
                        <button className="text-xs px-2 py-1 rounded-md font-medium transition-colors" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 px-4 py-3 rounded-card border animate-float" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <p className="text-sm font-medium">📦 New Order!</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Just confirmed</p>
              </div>

              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-card border animate-float" style={{ background: "var(--surface)", borderColor: "var(--border-color)", animationDelay: "1.5s" }}>
                <p className="text-sm font-medium">↑ 34% Revenue</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>vs last month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-b" style={{ background: "var(--surface)", borderColor: "var(--border-color)", padding: "96px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Features</p>
            <h2 className="font-display font-extrabold" style={{ fontSize: "var(--t-4xl)" }}>Everything you need to run a marketplace</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-card border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--bg)", borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" style={{ background: "var(--accent)" }} />
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4" style={{ background: "var(--accent-glow)" }}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "96px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
            <h2 className="font-display font-extrabold" style={{ fontSize: "var(--t-4xl)" }}>Start selling in 4 simple steps</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px]" style={{ background: "var(--border-color)" }} />
            {steps.map((s) => (
              <div key={s.num} className="text-center relative z-10 group">
                <div
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-display font-extrabold text-lg mx-auto mb-4 transition-all duration-300 group-hover:text-bg"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {s.num}
                </div>
                <h3 className="font-display font-bold mb-1">{s.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="border-t border-b" style={{ background: "var(--surface)", borderColor: "var(--border-color)", padding: "96px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>User Roles</p>
            <h2 className="font-display font-extrabold" style={{ fontSize: "var(--t-4xl)" }}>Built for every stakeholder</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <div
                key={r.title}
                className="p-6 rounded-card border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--bg)",
                  borderColor: r.featured ? "var(--accent-border)" : "var(--border-color)",
                  boxShadow: r.featured ? "0 0 30px rgba(0,194,178,0.08)" : "none",
                }}
              >
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="font-display font-bold text-xl mb-2">{r.title}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.perms.map((p) => (
                    <p key={p} className="text-sm flex items-start gap-2">
                      <span style={{ color: "var(--accent)" }}>→</span>
                      <span style={{ color: "var(--text-muted)" }}>{p}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: "96px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Tech Stack</p>
            <h2 className="font-display font-extrabold" style={{ fontSize: "var(--t-4xl)" }}>Powered by modern technologies</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="p-5 rounded-card border text-center transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
              >
                <div className="text-3xl mb-2">{t.icon}</div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>{t.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative overflow-hidden" style={{ padding: "96px 0" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,194,178,0.1) 0%, transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: "var(--t-4xl)" }}>Ready to build your marketplace?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Join hundreds of vendors already growing their business on VendorVerse.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/products"
              className="px-6 py-3 rounded-card font-bold text-sm transition-all duration-200"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              Start Shopping →
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3 rounded-card font-bold text-sm border transition-all duration-200"
              style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.background = "var(--accent-glow)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "transparent"; }}
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
