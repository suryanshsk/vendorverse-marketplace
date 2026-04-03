import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";

const roleOptions: { label: string; value: UserRole }[] = [
  { label: "Customer", value: "customer" },
  { label: "Vendor", value: "vendor" },
  { label: "Admin", value: "admin" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "vendor" as UserRole,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signUp(form);
    if (!result.ok) {
      showToast(`❌ ${result.message}`);
      return;
    }
    showToast(`✅ Account created for ${form.role}.`);
    navigate("/dashboard");
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-24">
        <div className="max-w-[620px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              Join VendorVerse
            </p>
            <h1 className="font-display font-extrabold text-[clamp(1.5rem,4vw,2.1rem)]">Create Your Account</h1>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              Register as customer, vendor, or admin.
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                  placeholder="First Name"
                  style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
                />
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                  placeholder="Last Name"
                  style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
                />
              </div>

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                placeholder="Email Address"
                style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
              />

              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 rounded-card border text-sm outline-none focus:border-accent"
                placeholder="Password (min 6 characters)"
                style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}
              />

              <button
                type="submit"
                className="w-full py-3 rounded-card font-bold text-sm transition-all"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                Create Account →
              </button>
            </form>

            <div className="mt-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "var(--accent)" }}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
