import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import { products } from "@/data/products";

const MotionLink = motion(Link);

const miniProducts = [
  { id: 1, emoji: "🎧", name: "Earbuds Pro", price: "₹2,499" },
  { id: 2, emoji: "⌚", name: "Smart Watch", price: "₹8,999" },
  { id: 3, emoji: "👟", name: "Running Shoes", price: "₹3,499" },
  { id: 4, emoji: "⌨️", name: "Keyboard", price: "₹4,799" },
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
  { icon: "🔷", name: "TypeScript", type: "Type Safety" },
  { icon: "⚡", name: "Vite", type: "Build Tool" },
  { icon: "🎨", name: "Tailwind CSS", type: "Styling" },
  { icon: "🪐", name: "Neon Postgres", type: "Database" },
  { icon: "🔐", name: "JWT + bcrypt", type: "Auth" },
  { icon: "▲", name: "Vercel Serverless", type: "Hosting" },
  { icon: "🐙", name: "GitHub", type: "Version Control" },
];

const pageVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const addMiniProduct = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    addToCart(product);
    showToast(`${product.emoji} ${product.name} added to cart!`);
  };

  return (
    <motion.div style={{ paddingTop: 68 }} variants={pageVariants} initial="hidden" animate="show">
      <motion.section className="min-h-screen flex items-center relative overflow-hidden py-12 sm:py-16 lg:py-24" variants={sectionVariants}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(138,90,60,0.10) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(220,179,150,0.10) 0%, transparent 50%)",
          }}
          animate={{ opacity: [0.72, 1, 0.72], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            mask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMask: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
          animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div className="text-center lg:text-left" variants={cardVariants}>
              <motion.div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-pill border mb-6 sm:mb-8" style={{ borderColor: "var(--accent-border)" }} whileHover={{ y: -2, scale: 1.01 }}>
                <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "var(--accent)" }} />
                <span className="font-mono text-[10px] sm:text-xs" style={{ color: "var(--accent)" }}>MERN Stack · Full Stack · Production Ready</span>
              </motion.div>

              <motion.h1 className="font-display font-extrabold leading-[1.08] tracking-[-0.04em] mb-4 sm:mb-6 text-[clamp(2rem,6vw,3.247rem)]" variants={cardVariants}>
                One Platform. <span className="relative inline-block" style={{ color: "var(--accent)" }}>Infinite <span className="absolute bottom-0 left-0 w-full h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} /></span> Vendors.
              </motion.h1>

              <motion.p className="mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed text-sm sm:text-base" style={{ color: "var(--text-muted)" }} variants={cardVariants}>
                VendorVerse is a scalable multivendor e-commerce marketplace where vendors thrive, customers discover, and admins orchestrate — all in one unified platform.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center lg:justify-start" variants={cardVariants}>
                <MotionLink to="/products" className="px-5 sm:px-6 py-3 rounded-card font-bold text-sm transition-all duration-200 inline-flex items-center gap-2" style={{ background: "var(--accent)", color: "var(--on-accent)" }} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  Explore Products →
                </MotionLink>
                <MotionLink to="/dashboard" className="px-5 sm:px-6 py-3 rounded-card font-bold text-sm border transition-all duration-200" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }} whileHover={{ y: -2, backgroundColor: "var(--accent-glow)" }} whileTap={{ scale: 0.98 }}>
                  Vendor Dashboard
                </MotionLink>
              </motion.div>

              <motion.div className="flex gap-6 sm:gap-10 justify-center lg:justify-start" variants={cardVariants}>
                {[
                  { num: "500+", label: "Products Listed" },
                  { num: "120+", label: "Active Vendors" },
                  { num: "12k+", label: "Happy Customers" },
                ].map((s) => (
                  <motion.div key={s.label} whileHover={{ y: -2 }}>
                    <p className="font-display font-extrabold text-xl sm:text-2xl">
                      {s.num.replace("+", "")}<span style={{ color: "var(--accent)" }}>+</span>
                    </p>
                    <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="hidden lg:block relative" variants={cardVariants}>
              <motion.div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }} whileHover={{ y: -4 }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: "#E97A62" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#D9B57F" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#4E7A5E" }} />
                  <div className="flex-1 mx-3 px-3 py-1 rounded-md text-xs font-mono" style={{ background: "var(--surface2)", color: "var(--text-dim)" }}>
                    vendorverse.com/marketplace
                  </div>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {miniProducts.map((p, index) => (
                    <motion.div
                      key={p.name}
                      className="p-3 rounded-lg border transition-all duration-200"
                      style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-3xl mb-2">{p.emoji}</div>
                      <p className="text-xs font-medium mb-1" style={{ color: "var(--text)" }}>{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>{p.price}</span>
                        <button onClick={() => addMiniProduct(p.id)} className="text-xs px-2 py-1 rounded-md font-medium transition-colors" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
                          Add
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="absolute -top-4 -right-4 px-4 py-3 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }} animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
                <p className="text-sm font-medium">📦 New Order!</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Just confirmed</p>
              </motion.div>

              <motion.div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }} animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}>
                <p className="text-sm font-medium">↑ 34% Revenue</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>vs last month</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="border-t border-b" style={{ background: "var(--surface)", borderColor: "var(--border-color)", padding: "64px 0" }} variants={sectionVariants} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Features</p>
            <h2 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Everything you need to run a marketplace</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f) => (
              <motion.div key={f.title} className="p-5 sm:p-6 rounded-card border relative overflow-hidden group" style={{ background: "var(--bg)", borderColor: "var(--border-color)" }} variants={cardVariants} whileHover={{ y: -6, boxShadow: "0 18px 36px rgba(138,90,60,0.08)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" style={{ background: "var(--accent)" }} />
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4" style={{ background: "var(--accent-glow)" }}>{f.icon}</div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 sm:py-24" variants={sectionVariants} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>How It Works</p>
            <h2 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Start selling in 4 simple steps</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px]" style={{ background: "var(--border-color)" }} />
            {steps.map((s) => (
              <motion.div key={s.num} className="text-center relative z-10 group" variants={cardVariants} whileHover={{ y: -4 }}>
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center font-display font-extrabold text-sm sm:text-lg mx-auto mb-3 sm:mb-4 transition-all duration-300"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--on-accent)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(138,90,60,0.24)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {s.num}
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base mb-1">{s.title}</h3>
                <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="border-t border-b" style={{ background: "var(--surface)", borderColor: "var(--border-color)", padding: "64px 0" }} variants={sectionVariants} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>User Roles</p>
            <h2 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Built for every stakeholder</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {roles.map((r) => (
              <motion.div
                key={r.title}
                className="p-5 sm:p-6 rounded-card border"
                style={{
                  background: "var(--bg)",
                  borderColor: r.featured ? "var(--accent-border)" : "var(--border-color)",
                  boxShadow: r.featured ? "0 0 30px rgba(138,90,60,0.08)" : "none",
                }}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: r.featured ? "0 0 30px rgba(138,90,60,0.12)" : "0 12px 30px rgba(0,0,0,0.04)" }}
              >
                <div className="text-3xl sm:text-4xl mb-4">{r.icon}</div>
                <h3 className="font-display font-bold text-lg sm:text-xl mb-2">{r.title}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.perms.map((p) => (
                    <p key={p} className="text-sm flex items-start gap-2">
                      <span style={{ color: "var(--accent)" }}>→</span>
                      <span style={{ color: "var(--text-muted)" }}>{p}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 sm:py-24" variants={sectionVariants} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Tech Stack</p>
            <h2 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Powered by modern technologies</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {techStack.map((t) => (
              <motion.div key={t.name} className="p-4 sm:p-5 rounded-card border text-center" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }} variants={cardVariants} whileHover={{ y: -5, borderColor: "var(--accent-border)" }}>
                <div className="text-2xl sm:text-3xl mb-2">{t.icon}</div>
                <p className="font-display font-bold text-xs sm:text-sm">{t.name}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-dim)" }}>{t.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden py-16 sm:py-24" variants={sectionVariants} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(138,90,60,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-display font-extrabold mb-4 text-[clamp(1.4rem,4vw,2.027rem)]">Ready to build your marketplace?</h2>
          <p className="mb-8 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
            Join hundreds of vendors already growing their business on VendorVerse.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <MotionLink to="/products" className="px-5 sm:px-6 py-3 rounded-card font-bold text-sm transition-all duration-200" style={{ background: "var(--accent)", color: "var(--on-accent)" }} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              Start Shopping →
            </MotionLink>
            <MotionLink to="/pricing" className="px-5 sm:px-6 py-3 rounded-card font-bold text-sm border transition-all duration-200" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }} whileHover={{ y: -2, backgroundColor: "var(--accent-glow)" }} whileTap={{ scale: 0.98 }}>
              View Plans
            </MotionLink>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}