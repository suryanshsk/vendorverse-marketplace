import { useState } from "react";

const sidebarSections = [
  {
    label: "Main",
    items: [
      { icon: "📊", label: "Overview" },
      { icon: "📦", label: "Products" },
      { icon: "🛒", label: "Orders" },
      { icon: "💰", label: "Revenue" },
    ],
  },
  {
    label: "Store",
    items: [
      { icon: "🏬", label: "My Store" },
      { icon: "⭐", label: "Reviews" },
      { icon: "🔔", label: "Notifications" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: "⚙️", label: "Settings" },
      { icon: "🚪", label: "Logout" },
    ],
  },
];

const kpis = [
  { icon: "💰", label: "Total Revenue", value: "₹2.4L", change: "↑ 18.2%", desc: "vs last month", positive: true },
  { icon: "🛒", label: "Total Orders", value: "384", change: "↑ 12.5%", desc: "vs last month", positive: true },
  { icon: "📦", label: "Products Listed", value: "47", change: "↑ 3", desc: "new this week", positive: true },
  { icon: "⭐", label: "Avg Rating", value: "4.8", change: "↓ 0.1", desc: "vs last month", positive: false },
];

const barData = [18000, 24000, 19000, 31000, 27000, 42000, 35000];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxBar = Math.max(...barData);

const orders = [
  { id: "#VV-7821", customer: "Rahul Sharma", product: "Pro Headphones", amount: "₹3,299", status: "Delivered", date: "01 Apr 2026" },
  { id: "#VV-7820", customer: "Priya Mehta", product: "Smart Watch Pro", amount: "₹7,499", status: "Processing", date: "01 Apr 2026" },
  { id: "#VV-7819", customer: "Arjun Singh", product: "Air Max Runners", amount: "₹2,499", status: "Pending", date: "31 Mar 2026" },
  { id: "#VV-7818", customer: "Sanya Kapoor", product: "Smart Phone X12", amount: "₹18,999", status: "Delivered", date: "30 Mar 2026" },
  { id: "#VV-7817", customer: "Dev Patel", product: "Running Shorts", amount: "₹899", status: "Delivered", date: "30 Mar 2026" },
];

const statusColors: Record<string, string> = {
  Delivered: "var(--success)",
  Processing: "var(--accent)",
  Pending: "var(--warning)",
};

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ paddingTop: 68 }} className="flex min-h-screen relative">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", top: 68 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-[68px] left-0 z-40 flex flex-col w-60 flex-shrink-0 border-r h-[calc(100vh-68px)] overflow-y-auto transition-transform duration-300`}
        style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}
      >
        <div className="p-5">
          <p className="font-display font-extrabold text-sm">
            <span style={{ color: "var(--text)" }}>Vendor</span>
            <span style={{ color: "var(--accent)" }}>Verse</span>
          </p>
        </div>
        {sidebarSections.map((sec) => (
          <div key={sec.label} className="px-3 mb-4">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>{sec.label}</p>
            {sec.items.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveItem(item.label); setSidebarOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 transition-all duration-200 mb-0.5"
                style={{
                  background: activeItem === item.label ? "var(--accent-glow)" : "transparent",
                  color: activeItem === item.label ? "var(--accent)" : "var(--text-muted)",
                  borderLeft: activeItem === item.label ? "2px solid var(--accent)" : "2px solid transparent",
                }}
                onMouseEnter={(e) => { if (activeItem !== item.label) e.currentTarget.style.background = "var(--surface2)"; }}
                onMouseLeave={(e) => { if (activeItem !== item.label) e.currentTarget.style.background = "transparent"; }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h1 className="font-display font-extrabold text-[clamp(1.2rem,3vw,1.802rem)]">Good morning, Avanish 👋</h1>
              <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>Here's what's happening with your store today.</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 self-start sm:self-auto" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              A
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {kpis.map((k) => (
              <div key={k.label} className="p-3 sm:p-5 rounded-card border transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl">{k.icon}</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold" style={{ color: k.positive ? "var(--success)" : "var(--danger)" }}>{k.change}</span>
                </div>
                <p className="font-display font-extrabold text-lg sm:text-2xl mb-1">{k.value}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{k.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Bar Chart */}
            <div className="lg:col-span-2 p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <p className="font-display font-bold text-sm">Revenue (Last 7 Days)</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Daily revenue breakdown</p>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>+34% MTD</span>
              </div>
              <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: 100 }}>
                {barData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md transition-all duration-300 border hover:opacity-100 opacity-80 cursor-pointer"
                      style={{
                        height: `${(val / maxBar) * 100}%`,
                        background: "var(--accent-glow)",
                        borderColor: "var(--accent-border)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent-glow)"; }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {days.map((d) => (
                  <span key={d} className="flex-1 text-center text-[10px]" style={{ color: "var(--text-dim)" }}>{d}</span>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
              <p className="font-display font-bold text-sm mb-4">Order Status</p>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `conic-gradient(var(--accent) 0% 55%, var(--warning) 55% 75%, var(--danger) 75% 88%, var(--surface2) 88% 100%)`,
                    }}
                  />
                  <div className="absolute inset-3 rounded-full flex items-center justify-center flex-col" style={{ background: "var(--surface)" }}>
                    <span className="font-display font-extrabold text-lg sm:text-xl">384</span>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>orders</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Delivered", count: 211, color: "var(--accent)" },
                  { label: "Processing", count: 77, color: "var(--warning)" },
                  { label: "Pending", count: 50, color: "var(--danger)" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                    </div>
                    <span className="font-mono font-bold">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
            <p className="font-display font-bold text-sm mb-4">Recent Orders</p>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border-color)" }}>
                    {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left py-3 px-3 text-xs font-semibold" style={{ color: "var(--text-dim)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b transition-colors cursor-pointer"
                      style={{ borderColor: "var(--border-color)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface2)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-xs sm:text-sm" style={{ color: "var(--accent)" }}>{o.id}</td>
                      <td className="py-3 px-3 text-xs sm:text-sm">{o.customer}</td>
                      <td className="py-3 px-3 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{o.product}</td>
                      <td className="py-3 px-3 font-mono text-xs sm:text-sm">{o.amount}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-pill text-[10px] sm:text-xs font-medium whitespace-nowrap" style={{ background: `${statusColors[o.status]}20`, color: statusColors[o.status] }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[o.status] }} />
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
