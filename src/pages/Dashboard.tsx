import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";
import { products } from "@/data/products";

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

const reviewCards = [
  { name: "Priya Shah", rating: 5, text: "The delivery was fast and the product quality matched the description." },
  { name: "Rohit Verma", rating: 4, text: "Great catalog experience. The dashboard makes order tracking simple." },
  { name: "Meera Joshi", rating: 5, text: "The platform feels polished and very responsive on mobile." },
];

const notificationCards = [
  { title: "New order placed", text: "Order #VV-7832 was placed 3 minutes ago." },
  { title: "Vendor approval", text: "TechZone India storefront verification is complete." },
  { title: "Low inventory", text: "Mechanical Keyboard stock is below the reorder threshold." },
];

const storeMetrics = [
  { label: "Store views", value: "12.8K" },
  { label: "Conversion", value: "4.6%" },
  { label: "Response time", value: "1h 12m" },
];

type DashboardActionInsight = {
  title: string;
  description: string;
  bullets: string[];
  primaryLabel?: string;
  primarySection?: string;
  primaryRoute?: string;
  secondaryLabel?: string;
  secondarySection?: string;
  secondaryRoute?: string;
};

function getActionInsight(action: string, role: UserRole): DashboardActionInsight {
  if (action.startsWith("Edit product:")) {
    const productName = action.replace("Edit product:", "").trim();
    const product = products.find((entry) => entry.name === productName);

    return {
      title: `Editing ${product?.name ?? productName}`,
      description: `Review listing details, pricing, and visibility for ${product?.vendor ?? "your catalog"}.`,
      bullets: [
        product ? `Current price: ₹${product.price.toLocaleString()}` : "Catalog item selected from the product grid.",
        product ? `Rating: ${product.rating} stars from ${product.reviews} reviews` : "Open the full listing editor to change media and stock.",
        "Changes now stay inside the dashboard flow instead of disappearing into a toast.",
      ],
      primaryLabel: "Open Products",
      primarySection: "Products",
      secondaryLabel: "Add new listing",
      secondarySection: "Products",
    };
  }

  if (action === "Add new listing" || action === "Create product") {
    return {
      title: "New product listing",
      description: "Start a new catalog item and keep it inside the product manager.",
      bullets: [
        "Use the product panel to review live listings before publishing.",
        "The catalog view already shows the current store inventory.",
        "This action now lands on a visible product workspace.",
      ],
      primaryLabel: "Open Products",
      primarySection: "Products",
      secondaryLabel: "View store",
      secondarySection: "My Store",
    };
  }

  if (action === "Fulfill orders" || action === "Review disputes" || action === "Track purchases") {
    return {
      title: role === "customer" ? "Purchase tracking" : "Order center",
      description: role === "customer" ? "Check order progress, delivery status, and vendor details." : "Process pending orders and resolve open issues.",
      bullets: role === "customer"
        ? ["The recent purchases table shows live order states.", "Open deliveries, processing items, and pending items from one place.", "Use the orders panel to keep everything visible."]
        : ["Pending orders are grouped with the latest fulfillment activity.", "Disputes and deliveries stay inside the order center.", "Order actions now open the actual orders workspace."],
      primaryLabel: "Open Orders",
      primarySection: "Orders",
      secondaryLabel: role === "customer" ? "Browse marketplace" : "Inspect revenue",
      secondaryRoute: role === "customer" ? "/products" : undefined,
      secondarySection: role === "customer" ? undefined : "Revenue",
    };
  }

  if (action === "View spending" || action === "Export earnings" || action === "Inspect platform GMV" || action === "Download report" || action === "Compare month" || action === "Review payouts") {
    return {
      title: "Revenue workspace",
      description: "Compare sales, export reports, and review earnings without leaving the dashboard.",
      bullets: [
        `Current store views: ${storeMetrics[0].value}.`,
        `Current conversion rate: ${storeMetrics[1].value}.`,
        "Revenue actions now jump to a real dashboard section instead of a dead button.",
      ],
      primaryLabel: "Open Revenue",
      primarySection: "Revenue",
      secondaryLabel: "Open Products",
      secondarySection: "Products",
    };
  }

  if (action === "Reply to reviews" || action === "Rate recent order" || action === "Audit feedback") {
    return {
      title: "Reviews workspace",
      description: role === "customer" ? "Rate recent purchases and see your feedback history." : "Reply to customer feedback and keep store ratings visible.",
      bullets: [
        "Recent review cards are now part of a dedicated section.",
        "You can inspect ratings without relying on a console message.",
        "This keeps review management inside the live dashboard.",
      ],
      primaryLabel: "Open Reviews",
      primarySection: "Reviews",
      secondaryLabel: "Open Notifications",
      secondarySection: "Notifications",
    };
  }

  if (action === "Read alerts" || action === "Check system alerts" || action === "View updates") {
    return {
      title: "Notifications center",
      description: role === "admin" ? "Monitor approvals, disputes, and system health." : "Track marketplace alerts and important updates.",
      bullets: [
        "Alerts are shown in the notifications section now.",
        "Order, approval, and stock messages stay visible in the UI.",
        "This action opens the notification workspace instead of doing nothing.",
      ],
      primaryLabel: "Open Notifications",
      primarySection: "Notifications",
      secondaryLabel: "Open Orders",
      secondarySection: "Orders",
    };
  }

  if (action === "Update profile" || action === "Security settings" || action === "Save changes" || action === "Change password" || action === "Update contact info" || action === "Manage notifications") {
    return {
      title: "Settings workspace",
      description: "Keep profile, security, and notification controls inside the dashboard.",
      bullets: [
        "Profile settings remain editable from the settings panel.",
        "Security and notification controls are grouped together.",
        "These actions now open content instead of a silent handler.",
      ],
      primaryLabel: "Open Settings",
      primarySection: "Settings",
      secondaryLabel: "Open Notifications",
      secondarySection: "Notifications",
    };
  }

  if (action === "Browse marketplace" || action === "Open wishlist") {
    return {
      title: action === "Browse marketplace" ? "Marketplace opened" : "Wishlist access",
      description: action === "Browse marketplace" ? "Jump into the product catalog from the customer dashboard." : "Review saved items inside the product catalog.",
      bullets: [
        "The products page now becomes the working destination.",
        "Use the catalog instead of a dead dashboard action.",
        "This keeps customer navigation concrete and visible.",
      ],
      primaryLabel: "Open Products",
      primaryRoute: "/products",
      secondaryLabel: "Back to overview",
      secondarySection: "Overview",
    };
  }

  if (action === "Open admin console") {
    return {
      title: "Admin console",
      description: "Overview, vendors, platform activity, and open tickets are all visible here.",
      bullets: [
        "Admin metrics are already wired into the overview and activities table.",
        "Open tickets and vendor approvals remain on the same page.",
        "This action now points to the actual admin workspace.",
      ],
      primaryLabel: "Open Overview",
      primarySection: "Overview",
      secondaryLabel: "Open Orders",
      secondarySection: "Orders",
    };
  }

  if (action === "Edit storefront") {
    return {
      title: "Storefront editor",
      description: "Update banners, categories, and shop identity from the store panel.",
      bullets: [
        "Store details and live metrics are already visible in the dashboard.",
        "Open the store section to change branding and layout.",
        "This button now leads to a visible workspace.",
      ],
      primaryLabel: "Open My Store",
      primarySection: "My Store",
      secondaryLabel: "Open Products",
      secondarySection: "Products",
    };
  }

  return {
    title: action,
    description: "This dashboard action is now linked to visible content.",
    bullets: [
      "Use the section buttons to continue the workflow.",
      "The dashboard no longer relies on console-only feedback.",
      "Each action now keeps the user inside a visible workflow.",
    ],
    primaryLabel: "Open Overview",
    primarySection: "Overview",
  };
}

function DashboardActionBanner({
  action,
  role,
  onClose,
  onJumpSection,
  onJumpRoute,
}: {
  action: string;
  role: UserRole;
  onClose: () => void;
  onJumpSection: (section: string) => void;
  onJumpRoute: (route: string) => void;
}) {
  const insight = getActionInsight(action, role);

  return (
    <div className="mb-6 p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--accent-border)" }}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-display font-bold text-sm text-[var(--accent)]">{insight.title}</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{insight.description}</p>
        </div>
        <button onClick={onClose} className="text-xs font-bold px-3 py-1.5 rounded-pill border" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
          Close
        </button>
      </div>
      <div className="grid gap-2 mb-4">
        {insight.bullets.map((bullet) => (
          <div key={bullet} className="text-sm px-3 py-2 rounded-lg border" style={{ background: "var(--surface2)", borderColor: "var(--border-color)", color: "var(--text)" }}>
            {bullet}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {insight.primaryLabel && (
          <button
            onClick={() => {
              if (insight.primaryRoute) onJumpRoute(insight.primaryRoute);
              if (insight.primarySection) onJumpSection(insight.primarySection);
            }}
            className="px-4 py-2 rounded-card text-xs font-bold"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {insight.primaryLabel}
          </button>
        )}
        {insight.secondaryLabel && (
          <button
            onClick={() => {
              if (insight.secondaryRoute) onJumpRoute(insight.secondaryRoute);
              if (insight.secondarySection) onJumpSection(insight.secondarySection);
            }}
            className="px-4 py-2 rounded-card text-xs font-bold border"
            style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
          >
            {insight.secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function actionButtonLabel(role: UserRole, item: string) {
  if (role === "customer") {
    if (item === "Overview") return "Browse marketplace";
    if (item === "Orders") return "Track purchases";
    if (item === "Revenue") return "View spending";
    if (item === "My Store") return "Open wishlist";
    if (item === "Reviews") return "Rate recent order";
    if (item === "Notifications") return "Read alerts";
    if (item === "Settings") return "Update profile";
  }

  if (role === "admin") {
    if (item === "Overview") return "Open admin console";
    if (item === "Orders") return "Review disputes";
    if (item === "Revenue") return "Inspect platform GMV";
    if (item === "My Store") return "Manage vendors";
    if (item === "Reviews") return "Audit feedback";
    if (item === "Notifications") return "Check system alerts";
    if (item === "Settings") return "Security settings";
  }

  if (item === "Overview") return "Create product";
  if (item === "Products") return "Add new listing";
  if (item === "Orders") return "Fulfill orders";
  if (item === "Revenue") return "Export earnings";
  if (item === "My Store") return "Edit storefront";
  if (item === "Reviews") return "Reply to reviews";
  if (item === "Notifications") return "View updates";
  if (item === "Settings") return "Save changes";
  return "Open section";
}

function DashboardPanel({
  role,
  activeItem,
  onAction,
}: {
  role: UserRole;
  activeItem: string;
  onAction: (label: string) => void;
}) {
  if (activeItem === "Products") {
    return (
      <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="font-display font-bold text-sm">Product Management</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Listings backed by the catalog and dashboard data.</p>
          </div>
          <button
            onClick={() => onAction(actionButtonLabel(role, activeItem))}
            className="px-4 py-2 rounded-card text-xs font-bold transition-all"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="p-4 rounded-card border" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: "var(--accent-glow)" }}>{product.emoji}</div>
                  <div>
                    <p className="font-display font-bold text-sm">{product.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{product.vendor}</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>₹{product.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "var(--text-muted)" }}>Rating {product.rating} • {product.reviews} reviews</span>
                <button onClick={() => onAction(`Edited ${product.name}`)} className="text-[11px] font-bold" style={{ color: "var(--accent)" }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeItem === "Orders") {
    return (
      <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="font-display font-bold text-sm">Order Center</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Track, fulfill, and resolve orders across the platform.</p>
          </div>
          <button
            onClick={() => onAction(actionButtonLabel(role, activeItem))}
            className="px-4 py-2 rounded-card text-xs font-bold transition-all"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        <div className="grid gap-3">
          {role === "customer"
            ? stakeholderRows.customer.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 p-3 rounded-card border" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
                  <div>
                    <p className="font-display font-bold text-sm">{row.col3}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{row.col2} • {row.date}</p>
                  </div>
                  <span className="font-mono text-xs" style={{ color: statusColors[row.status] ?? "var(--accent)" }}>{row.status}</span>
                </div>
              ))
            : stakeholderRows.vendor.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 p-3 rounded-card border" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
                  <div>
                    <p className="font-display font-bold text-sm">{row.col2}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{row.col3} • {row.date}</p>
                  </div>
                  <span className="font-mono text-xs" style={{ color: statusColors[row.status] ?? "var(--accent)" }}>{row.col4}</span>
                </div>
              ))}
        </div>
      </div>
    );
  }

  if (activeItem === "Revenue") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="font-display font-bold text-sm">Revenue snapshot</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Recent sales and platform earnings</p>
            </div>
            <button onClick={() => onAction(actionButtonLabel(role, activeItem))} className="px-4 py-2 rounded-card text-xs font-bold" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
              {actionButtonLabel(role, activeItem)}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {storeMetrics.map((metric) => (
              <div key={metric.label} className="p-4 rounded-card border text-center" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
                <p className="font-display font-extrabold text-lg text-[var(--accent)]">{metric.value}</p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-display font-bold text-sm mb-3">Quick actions</p>
          <div className="flex flex-col gap-2">
            {[
              "Download report",
              "Compare month",
              "Review payouts",
            ].map((item) => (
              <button key={item} onClick={() => onAction(item)} className="text-left px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "My Store") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-display font-bold text-sm mb-3">Store details</p>
          <div className="space-y-3 text-sm">
            <p style={{ color: "var(--text-muted)" }}>Store name: <span style={{ color: "var(--text)" }}>VendorVerse Store</span></p>
            <p style={{ color: "var(--text-muted)" }}>Status: <span style={{ color: "var(--success)" }}>Verified</span></p>
            <p style={{ color: "var(--text-muted)" }}>Support response: <span style={{ color: "var(--text)" }}>Under 2 hours</span></p>
          </div>
          <button onClick={() => onAction(actionButtonLabel(role, activeItem))} className="mt-4 px-4 py-2 rounded-card text-xs font-bold" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-display font-bold text-sm mb-3">Store metrics</p>
          <div className="grid grid-cols-3 gap-3">
            {storeMetrics.map((metric) => (
              <div key={metric.label} className="p-3 rounded-card border text-center" style={{ background: "var(--surface2)", borderColor: "var(--border-color)" }}>
                <p className="font-display font-extrabold text-base" style={{ color: "var(--accent)" }}>{metric.value}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Reviews") {
    return (
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display font-bold text-sm">Customer feedback</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Recent ratings and review activity.</p>
          </div>
          <button onClick={() => onAction(actionButtonLabel(role, activeItem))} className="px-4 py-2 rounded-card text-xs font-bold" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        {reviewCards.map((review) => (
          <div key={review.name} className="p-4 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-bold text-sm">{review.name}</p>
              <span style={{ color: "var(--warning)" }}>{"★".repeat(review.rating)}</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{review.text}</p>
          </div>
        ))}
      </div>
    );
  }

  if (activeItem === "Notifications") {
    return (
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display font-bold text-sm">Notifications</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Marketplace alerts, approvals, and system updates.</p>
          </div>
          <button onClick={() => onAction(actionButtonLabel(role, activeItem))} className="px-4 py-2 rounded-card text-xs font-bold" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        {notificationCards.map((item) => (
          <div key={item.title} className="p-4 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
            <p className="font-display font-bold text-sm mb-1">{item.title}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.text}</p>
          </div>
        ))}
      </div>
    );
  }

  if (activeItem === "Settings") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-display font-bold text-sm mb-3">Profile settings</p>
          <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <p>Name: <span style={{ color: "var(--text)" }}>{roleTitle(role)}</span></p>
            <p>Email notifications: <span style={{ color: "var(--success)" }}>Enabled</span></p>
            <p>Security: <span style={{ color: "var(--text)" }}>JWT + HTTPS</span></p>
          </div>
          <button onClick={() => onAction(actionButtonLabel(role, activeItem))} className="mt-4 px-4 py-2 rounded-card text-xs font-bold" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
            {actionButtonLabel(role, activeItem)}
          </button>
        </div>
        <div className="p-4 sm:p-5 rounded-card border" style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}>
          <p className="font-display font-bold text-sm mb-3">Account actions</p>
          <div className="flex flex-col gap-2">
            {[
              "Change password",
              "Update contact info",
              "Manage notifications",
            ].map((item) => (
              <button key={item} onClick={() => onAction(item)} className="text-left px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

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
  const [activeItem, setActiveItem] = useState("Overview");
  const [activeAction, setActiveAction] = useState<string | null>(null);
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
      navigate("/signin");
      return;
    }
    setActiveAction(null);
    setActiveItem(label);
    setSidebarOpen(false);
  };

  const openDashboardSection = (label: string) => {
    setActiveItem(label);
    setSidebarOpen(false);
  };

  const jumpToSection = (label: string) => {
    setActiveAction(null);
    openDashboardSection(label);
  };

  const jumpToRoute = (route: string) => {
    setActiveAction(null);
    navigate(route);
  };

  const handlePanelAction = (label: string) => {
    setActiveAction(label);

    if (label === "Browse marketplace") {
      jumpToRoute("/products");
      return;
    }
    if (label === "Open wishlist") {
      jumpToRoute("/products");
      return;
    }
    if (label === "Open admin console") {
      jumpToSection("Overview");
      return;
    }
    if (label === "Edit storefront") {
      jumpToSection("My Store");
      return;
    }
    if (label === "Track purchases") {
      jumpToSection("Orders");
      return;
    }
    if (label === "Create product" || label === "Add new listing") {
      jumpToSection("Products");
      return;
    }
    if (label === "Fulfill orders" || label === "Review disputes") {
      jumpToSection("Orders");
      return;
    }
    if (label === "View spending" || label === "Export earnings" || label === "Inspect platform GMV") {
      jumpToSection("Revenue");
      return;
    }
    if (label === "Reply to reviews" || label === "Rate recent order" || label === "Audit feedback") {
      jumpToSection("Reviews");
      return;
    }
    if (label === "Read alerts" || label === "Check system alerts" || label === "View updates") {
      jumpToSection("Notifications");
      return;
    }
    if (label === "Update profile" || label === "Security settings" || label === "Save changes" || label === "Change password" || label === "Update contact info" || label === "Manage notifications") {
      jumpToSection("Settings");
      return;
    }
  };

  return (
    <div style={{ paddingTop: 68 }} className="flex min-h-screen relative">
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg"
        style={{ background: "var(--accent)", color: "var(--on-accent)" }}
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 self-start sm:self-auto" style={{ background: "var(--accent)", color: "var(--on-accent)" }}>
              {(currentUser?.firstName ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>

          {activeAction && (
            <DashboardActionBanner
              action={activeAction}
              role={currentRole}
              onClose={() => setActiveAction(null)}
              onJumpSection={jumpToSection}
              onJumpRoute={jumpToRoute}
            />
          )}

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

          <DashboardPanel role={currentRole} activeItem={activeItem} onAction={handlePanelAction} />

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
