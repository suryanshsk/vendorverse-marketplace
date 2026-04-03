import { sql, hasDatabaseUrl } from "./_lib/db.js";
import { seedProducts } from "./_lib/seed.js";

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return send(res, 405, { message: "Method not allowed" });
  }

  if (!hasDatabaseUrl || !sql) {
    return send(res, 200, { products: seedProducts });
  }

  const rows = await sql`
    SELECT id, name, vendor, price, original_price, category, emoji, rating, reviews, badge
    FROM products
    ORDER BY id ASC
  `;

  return send(res, 200, {
    products: rows.map((row) => ({
      id: Number(row.id),
      name: row.name,
      vendor: row.vendor,
      price: Number(row.price),
      original: Number(row.original_price),
      category: row.category,
      emoji: row.emoji,
      rating: Number(row.rating),
      reviews: Number(row.reviews),
      badge: row.badge,
    })),
  });
}
