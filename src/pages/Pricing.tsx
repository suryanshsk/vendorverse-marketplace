import { useState } from "react";
import { useToast } from "@/components/Toast";
import { faqs } from "@/data/faqs";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/month",
    desc: "Perfect for getting started",
    features: [
      { label: "Up to 10 product listings", included: true },
      { label: "Basic vendor dashboard", included: true },
      { label: "Order management", included: true },
      { label: "Standard payment processing", included: true },
      { label: "Analytics", included: false },
      { label: "Priority listing", included: false },
      { label: "Dedicated support", included: false },
    ],
    cta: "Get Started Free",
    primary: false,
    popular: false,
  },
  {
    name: "Growth",
    price: "₹999",
    period: "/month",
    desc: "For growing vendors",
    features: [
      { label: "Up to 100 listings", included: true },
      { label: "Full dashboard", included: true },
      { label: "Analytics", included: true },
      { label: "Revenue graphs", included: true },
      { label: "Priority listing", included: true },
      { label: "Email support", included: true },
      { label: "Dedicated account manager", included: false },
    ],
    cta: "Start Growth Plan →",
    primary: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    period: "/month",
    desc: "For large scale operations",
    features: [
      { label: "Unlimited listings", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Custom storefront", included: true },
      { label: "Featured placement", included: true },
      { label: "Dedicated manager", included: true },
      { label: "24/7 support", included: true },
      { label: "API access", included: true },
    ],
    cta: "Contact Sales",
    primary: false,
    popular: false,
  },
];

export default function Pricing() {
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 68 }}>
      <section className="py-16 sm:py-24">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Pricing</p>
            <h1 className="font-display font-extrabold mb-4 text-[clamp(1.4rem,4vw,2.027rem)]">Simple, transparent pricing</h1>
            <p className="text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>Choose the plan that fits your vendor needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-5 sm:p-6 rounded-card border relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "sm:col-span-2 md:col-span-1" : ""}`}
                style={{
                  background: "var(--surface)",
                  borderColor: plan.popular ? "var(--accent-border)" : "var(--border-color)",
                  boxShadow: plan.popular ? "0 0 40px rgba(0,194,178,0.1)" : "none",
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-pill text-xs font-bold whitespace-nowrap"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}
                  >
                    MOST POPULAR
                  </span>
                )}
                <div className="mb-6 pt-2">
                  <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl">{plan.price}</span>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 text-sm">
                      <span style={{ color: f.included ? "var(--success)" : "var(--text-dim)" }}>{f.included ? "✓" : "✗"}</span>
                      <span style={{ color: f.included ? "var(--text)" : "var(--text-dim)" }}>{f.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => showToast(`${plan.name} plan selected!`)}
                  className="w-full py-3 rounded-card font-bold text-sm border transition-all duration-200"
                  style={{
                    background: plan.primary ? "var(--accent)" : "transparent",
                    color: plan.primary ? "var(--bg)" : "var(--text-muted)",
                    borderColor: plan.primary ? "var(--accent)" : "var(--border-color)",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.primary) e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,178,0.3)";
                    else { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.background = "var(--accent-glow)"; }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.primary) e.currentTarget.style.boxShadow = "none";
                    else { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "transparent"; }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-[640px] mx-auto">
            <h2 className="font-display font-extrabold text-center mb-6 sm:mb-8 text-[clamp(1.2rem,3vw,1.602rem)]">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-card border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-sm font-medium transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span
                      className="text-lg transition-transform duration-300 flex-shrink-0"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: "var(--accent)" }}
                    >
                      ↓
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openFaq === i ? 200 : 0 }}
                  >
                    <p className="px-4 sm:px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
