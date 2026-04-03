import { sql, hasDatabaseUrl } from "./_lib/db.js";
import { seedVendorMetrics, seedRecentOrders } from "./_lib/seed.js";

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return send(res, 405, { message: "Method not allowed" });
  }

  const role = String(req.query?.role || "vendor").toLowerCase();

  if (!hasDatabaseUrl || !sql) {
    return send(res, 200, {
      role,
      metrics: seedVendorMetrics,
      orders: seedRecentOrders,
    });
  }

  const users = await sql`SELECT COUNT(*)::int AS total FROM users`;
  const vendors = await sql`SELECT COUNT(*)::int AS total FROM users WHERE role = 'vendor'`;
  const orders = await sql`
    SELECT order_code, customer_name, product_name, amount, status, created_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT 5
  `;

  return send(res, 200, {
    role,
    metrics: {
      totalUsers: users[0]?.total ?? 0,
      activeVendors: vendors[0]?.total ?? 0,
      totalRevenue: "₹2.4L",
      totalOrders: orders.length,
    },
    orders: orders.map((row) => ({
      id: row.order_code,
      customer: row.customer_name,
      product: row.product_name,
      amount: `₹${Number(row.amount).toLocaleString()}`,
      status: row.status,
      date: new Date(row.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    })),
  });
}
