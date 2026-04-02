export default function About() {
  const team = [
    { name: "Avanish Singh", roll: "2401330100361", role: "Full Stack Lead" },
    { name: "Sudhanshu Singh", roll: "2401330100369", role: "Backend Developer" },
    { name: "Sumit Patel", roll: "2401330100374", role: "Frontend Developer" },
  ];

  const roadmap = [
    { icon: "🤖", title: "AI Recommendations", desc: "Smart product suggestions powered by machine learning algorithms." },
    { icon: "📱", title: "Mobile App", desc: "Native iOS and Android apps for vendors and customers." },
    { icon: "💬", title: "Live Chat", desc: "Real-time messaging between customers and vendors." },
    { icon: "🌍", title: "International Payments", desc: "Multi-currency support with global payment gateways." },
    { icon: "📈", title: "Advanced Analytics", desc: "Deep insights with predictive analytics and trend forecasting." },
    { icon: "💎", title: "Vendor Subscriptions", desc: "Recurring subscription models for premium vendor features." },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-24">
            {/* Left */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>About the Project</p>
              <h2 className="font-display font-extrabold mb-6 text-[clamp(1.4rem,4vw,2.027rem)]">Built by students, powered by MERN.</h2>
              <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
                VendorVerse is a final-year BTech CSE project developed at NIET, Greater Noida. It demonstrates the practical application of the MERN stack in building a scalable, production-ready multivendor e-commerce platform.
              </p>
              <p className="mb-8 leading-relaxed text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
                The project showcases role-based authentication, vendor management, real-time analytics, payment integration, and responsive design — reflecting industry-standard development practices.
              </p>
              <div className="flex gap-6 sm:gap-10">
                {[
                  { num: "3", label: "Team Members" },
                  { label: "Tech Stack", num: "MERN" },
                  { num: "2026", label: "Project Year" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-extrabold text-xl sm:text-2xl" style={{ color: "var(--accent)" }}>{s.num}</p>
                    <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="font-mono text-xs mb-6" style={{ color: "var(--text-dim)" }}>// Meet the Team</p>
              <div className="grid grid-cols-1 gap-4 mb-4">
                {team.map((t) => (
                  <div key={t.name} className="p-4 sm:p-5 rounded-card border transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm sm:text-base">{t.name}</p>
                        <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>Roll: {t.roll}</p>
                        <p className="text-[10px] sm:text-xs font-medium" style={{ color: "var(--accent)" }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-dim)" }}>Supervisor</p>
                <p className="font-display font-bold text-sm sm:text-base">Mr. Amit Kumar Yadav</p>
                <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>Professor CSE, NIET Greater Noida</p>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <div className="text-center mb-10 sm:mb-16">
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Roadmap</p>
              <h2 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Future Enhancements</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {roadmap.map((r) => (
                <div
                  key={r.title}
                  className="p-5 sm:p-6 rounded-card border transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
                >
                  <div className="text-2xl sm:text-3xl mb-3">{r.icon}</div>
                  <h3 className="font-display font-bold text-sm sm:text-base mb-2">{r.title}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
