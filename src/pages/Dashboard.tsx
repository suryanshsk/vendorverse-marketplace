import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";
import { apiRequest } from "@/lib/api";

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

const barData = [18000, 24000, 19000, 31000, 27000, 42000, 35000];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxBar = Math.max(...barData);

const vendorOrders = [
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

const roleKpis: Record<UserRole, { icon: string; label: string; value: string; change: string; positive: boolean }[]> = {
  vendor: [
    { icon: "💰", label: "Total Revenue", value: "₹2.4L", change: "↑ 18.2% vs last month", positive: true },
    { icon: "🛒", label: "Total Orders", value: "384", change: "↑ 12.5% vs last month", positive: true },
    { icon: "📦", label: "Products Listed", value: "47", change: "↑ 3 new this week", positive: true },
    { icon: "⭐", label: "Avg Rating", value: "4.8", change: "↓ 0.1 vs last month", positive: false },
  ],
  customer: [
    { icon: "🛍️", label: "Orders Placed", value: "26", change: "↑ 4 this month", positive: true },
    { icon: "❤️", label: "Wishlist Items", value: "18", change: "↑ 2 this week", positive: true },
    { icon: "💸", label: "Total Spent", value: "₹41,820", change: "↑ 8.3% vs last month", positive: true },
    { icon: "📦", label: "Active Deliveries", value: "3", change: "On track", positive: true },
  ],
  admin: [
    { icon: "👥", label: "Total Users", value: "12,431", change: "↑ 6.2% this month", positive: true },
    { icon: "🏬", label: "Active Vendors", value: "128", change: "↑ 9 approved", positive: true },
    { icon: "💼", label: "Platform GMV", value: "₹38.7L", change: "↑ 16.9% vs last month", positive: true },
    { icon: "⚠️", label: "Open Tickets", value: "14", change: "↓ 3 resolved today", positive: true },
  ],
};

const stakeholderRows: Record<UserRole, { col2: string; col3: string; col4: string; status: string; date: string; id: string }[]> = {
  vendor: vendorOrders.map((order) => ({
    id: order.id,
    col2: order.customer,
    col3: order.product,
    col4: order.amount,
    status: order.status,
    date: order.date,
  })),
  customer: [
    { id: "#ORD-9921", col2: "TechZone India", col3: "Wireless Earbuds Pro", col4: "₹2,499", status: "Delivered", date: "31 Mar 2026" },
    { id: "#ORD-9913", col2: "WearTech", col3: "Smart Watch Ultra", col4: "₹8,999", status: "Processing", date: "30 Mar 2026" },
    { id: "#ORD-9895", col2: "TechBooks India", col3: "Design Patterns Book", col4: "₹749", status: "Pending", date: "29 Mar 2026" },
  ],
  admin: [
    { id: "#ADM-201", col2: "Vendor Approval", col3: "Store: GreenCart", col4: "Priority", status: "Processing", date: "01 Apr 2026" },
    { id: "#ADM-198", col2: "Dispute", col3: "Order #VV-7741", col4: "Medium", status: "Pending", date: "31 Mar 2026" },
    { id: "#ADM-191", col2: "Payout Release", col3: "Vendor: TechZone India", col4: "Completed", status: "Delivered", date: "30 Mar 2026" },
  ],
};

function roleTitle(role: UserRole) {
  if (role === "vendor") return "Vendor Dashboard";
  if (role === "customer") return "Customer Dashboard";
  return "Admin Dashboard";
}

function roleSubtext(role: UserRole) {
  if (role === "vendor") return "Here's what's happening with your store today.";
  if (role === "customer") return "Track your orders, wishlist, and spending insights.";
  return "Manage users, vendors, platform health, and operations.";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { showToast } = useToast();
  const [activeItem, setActiveItem] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewRole, setPreviewRole] = useState<UserRole>("vendor");
  const [remoteOrders, setRemoteOrders] = useState(stakeholderRows.vendor);

  const currentRole = useMemo<UserRole>(() => {
    if (currentUser?.role) return currentUser.role;
    return previewRole;
  }, [currentUser?.role, previewRole]);

  useEffect(() => {
    void (async () => {
      const response = await apiRequest<{ orders: typeof stakeholderRows.vendor }>(`/api/dashboard?role=${currentRole}`);
      if (response.ok && response.data?.orders) {
        setRemoteOrders(response.data.orders);
      }
    })();
  }, [currentRole]);

  const handleSidebarClick = (label: string) => {
    if (label === "Logout") {
      signOut();
      showToast("✅ Logged out successfully");
      navigate("/signin");
      return;
    }
    setActiveItem(label);
    setSidebarOpen(false);
  };

  return (
    <div style={{ paddingTop: 68 }} className="flex min-h-screen relative">
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", top: 68 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
        {sidebarSections.map((section) => (
          <div key={section.label} className="px-3 mb-4">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
              {section.label}
            </p>
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSidebarClick(item.label)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 transition-all duration-200 mb-0.5"
                style={{
                  background: activeItem === item.label ? "var(--accent-glow)" : "transparent",
                  color: activeItem === item.label ? "var(--accent)" : "var(--text-muted)",
                  borderLeft: activeItem === item.label ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1200px] mx-auto">
          {!currentUser && (
            <div className="mb-6 p-4 rounded-card border flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: "var(--surface)", borderColor: "var(--accent-border)" }}>
              <div>
                <p className="font-display font-bold">You are viewing dashboard preview mode.</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Sign in to access your real role dashboard and account actions.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["customer", "vendor", "admin"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setPreviewRole(role)}
                    className="px-3 py-1.5 rounded-pill border text-xs font-semibold"
                    style={{
                      borderColor: previewRole === role ? "var(--accent-border)" : "var(--border-color)",
                      color: previewRole === role ? "var(--accent)" : "var(--text-muted)",
                      background: previewRole === role ? "var(--accent-glow)" : "transparent",
                    }}
                  >
                    {role.toUpperCase()}
                  </button>
                ))}
                <Link to="/signin" className="px-3 py-1.5 rounded-pill border text-xs font-semibold" style={{ borderColor: "var(--accent-border)", color: "var(--accent)" }}>
                  Sign In
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h1 className="font-display font-extrabold text-[clamp(1.2rem,3vw,1.802rem)]">
                Good morning, {currentUser?.firstName ?? "Avanish"} 👋
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
                {roleSubtext(currentRole)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
                {roleTitle(currentRole)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 self-start sm:self-auto" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              {(currentUser?.firstName ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {roleKpis[currentRole].map((kpi) => (
              <div key={kpi.label} className="p-3 sm:p-5 rounded-card border transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl">{kpi.icon}</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold" style={{ color: kpi.positive ? "var(--success)" : "var(--danger)" }}>
                    {kpi.change}
                  </span>
                </div>
                <p className="font-display font-extrabold text-lg sm:text-2xl mb-1">{kpi.value}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>

          {currentRole === "vendor" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="lg:col-span-2 p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <p className="font-display font-bold text-sm">Revenue (Last 7 Days)</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Daily revenue breakdown</p>
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>+34% MTD</span>
                </div>
                <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: 120 }}>
                  {barData.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-md transition-all duration-300 border hover:opacity-100 opacity-80 cursor-pointer"
                        style={{
                          height: `${(value / maxBar) * 100}%`,
                          background: "var(--accent-glow)",
                          borderColor: "var(--accent-border)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--accent-glow)";
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {days.map((day) => (
                    <span key={day} className="flex-1 text-center text-[10px]" style={{ color: "var(--text-dim)" }}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
                <p className="font-display font-bold text-sm mb-4">Order Status</p>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: "conic-gradient(var(--accent) 0% 55%, var(--warning) 55% 75%, var(--danger) 75% 88%, var(--surface2) 88% 100%)",
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
                  ].map((status) => (
                    <div key={status.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: status.color }} />
                        <span style={{ color: "var(--text-muted)" }}>{status.label}</span>
                      </div>
                      <span className="font-mono font-bold">{status.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
            <p className="font-display font-bold text-sm mb-4">
              {currentRole === "vendor" ? "Recent Orders" : currentRole === "customer" ? "Recent Purchases" : "Admin Activities"}
            </p>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border-color)" }}>
                    {["ID", currentRole === "customer" ? "Vendor" : currentRole === "admin" ? "Type" : "Customer", "Item", "Amount/Priority", "Status", "Date"].map((header) => (
                      <th key={header} className="text-left py-3 px-3 text-xs font-semibold" style={{ color: "var(--text-dim)" }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {remoteOrders.map((row) => (
                    <tr key={row.id} className="border-b transition-colors" style={{ borderColor: "var(--border-color)" }}>
                      <td className="py-3 px-3 font-mono font-bold text-xs sm:text-sm" style={{ color: "var(--accent)" }}>{row.id}</td>
                      <td className="py-3 px-3 text-xs sm:text-sm">{row.col2}</td>
                      <td className="py-3 px-3 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{row.col3}</td>
                      <td className="py-3 px-3 font-mono text-xs sm:text-sm">{row.col4}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-pill text-[10px] sm:text-xs font-medium whitespace-nowrap" style={{ background: `${statusColors[row.status] ?? "var(--accent)"}20`, color: statusColors[row.status] ?? "var(--accent)" }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[row.status] ?? "var(--accent)" }} />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs sm:text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{row.date}</td>
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
