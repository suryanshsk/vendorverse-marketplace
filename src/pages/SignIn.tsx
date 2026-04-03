import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";

const roleOptions: { label: string; value: UserRole }[] = [
  { label: "Customer", value: "customer" },
  { label: "Vendor", value: "vendor" },
  { label: "Admin", value: "admin" },
];

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "", role: "vendor" as UserRole });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signIn(form);
    if (!result.ok) {
      showToast(`❌ ${result.message}`);
      return;
    }
    showToast(`✅ Welcome back! Signed in as ${form.role}.`);
    navigate("/dashboard");
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-24">
        <div className="max-w-[560px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              Authentication
            </p>
            <h1 className="font-display font-extrabold text-[clamp(1.5rem,4vw,2.1rem)]">Sign In to VendorVerse</h1>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              Access customer, vendor, or admin dashboards.
            </p>
          </div>

          <div className="rounded-[20px] border p-8" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                  Role
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: role.value }))}
                      className="py-2 rounded-pill border text-xs font-semibold transition-all"
                      style={{
                        borderColor: form.role === role.value ? "var(--accent-border)" : "var(--border-color)",
                        color: form.role === role.value ? "var(--accent)" : "var(--text-muted)",
                        background: form.role === role.value ? "var(--accent-glow)" : "transparent",
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full mt-2 px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                  placeholder="you@example.com"
                  style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full mt-2 px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                  placeholder="Enter your password"
                  style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-card font-bold text-sm transition-all"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                Sign In →
              </button>
            </form>

            <div className="mt-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
              New here?{" "}
              <Link to="/signup" style={{ color: "var(--accent)" }}>
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
