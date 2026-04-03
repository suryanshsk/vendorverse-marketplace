import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/Toast";
import { apiRequest } from "@/lib/api";

const contactInfo = [
  { icon: "📍", title: "Address", value: "NIET, Greater Noida, Uttar Pradesh, India" },
  { icon: "✉️", title: "Email", value: "vendorverse@niet.ac.in" },
  { icon: "🛠️", title: "Tech Stack", value: "React.js · Node.js · Express.js · MongoDB" },
  { icon: "👨‍🏫", title: "Supervisor", value: "Mr. Amit Kumar Yadav, Dept of CSE, NIET" },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: searchParams.get("subject") ?? "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await apiRequest<{ message: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (!result.ok) {
      showToast(`❌ ${result.message || "Failed to send message."}`);
      return;
    }

    showToast(result.message || "✅ Message sent successfully!");
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  };

  const inputStyle = {
    background: "var(--surface2)",
    borderColor: "var(--border-color)",
    color: "var(--text)",
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Contact</p>
            <h1 className="font-display font-extrabold text-[clamp(1.4rem,4vw,2.027rem)]">Get in touch</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Contact Info */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {contactInfo.map((c) => (
                <div key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl flex-shrink-0" style={{ background: "var(--accent-glow)" }}>
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm mb-0.5">{c.title}</p>
                    <p className="text-sm break-words" style={{ color: "var(--text-muted)" }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Form */}
            <div className="p-6 sm:p-10 rounded-[20px] border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                    className="px-4 py-3 rounded-card border text-sm outline-none transition-colors focus:border-accent"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                    className="px-4 py-3 rounded-card border text-sm outline-none transition-colors focus:border-accent"
                    style={inputStyle}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="px-4 py-3 rounded-card border text-sm outline-none transition-colors focus:border-accent"
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="px-4 py-3 rounded-card border text-sm outline-none transition-colors focus:border-accent"
                  style={inputStyle}
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="px-4 py-3 rounded-card border text-sm outline-none transition-colors resize-none focus:border-accent"
                  style={inputStyle}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-card font-bold text-sm transition-all duration-200"
                  style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(138,90,60,0.24)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
