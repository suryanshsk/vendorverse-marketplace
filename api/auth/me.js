import { sql, hasDatabaseUrl } from "../_lib/db.js";
import { getSessionUser } from "../_lib/session.js";

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
    return send(res, 503, { message: "DATABASE_URL is not configured." });
  }

  const sessionUser = getSessionUser(req);
  if (!sessionUser?.id) {
    return send(res, 401, { message: "Not authenticated." });
  }

  const rows = await sql`
    SELECT id, first_name, last_name, email, role
    FROM users
    WHERE id = ${sessionUser.id}
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) {
    return send(res, 401, { message: "Not authenticated." });
  }

  return send(res, 200, {
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
}
