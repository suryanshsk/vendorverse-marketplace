import bcrypt from "bcryptjs";
import { sql, hasDatabaseUrl } from "../_lib/db.js";
import { createToken, setSessionCookie } from "../_lib/session.js";

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return send(res, 405, { message: "Method not allowed" });
  }

  if (!hasDatabaseUrl || !sql) {
    return send(res, 503, { message: "DATABASE_URL is not configured." });
  }

  const { firstName, lastName, email, password, role } = await new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  }).catch(() => ({}));

  if (!firstName || !lastName || !email || !password || !role) {
    return send(res, 400, { message: "All fields are required." });
  }

  if (String(password).length < 6) {
    return send(res, 400, { message: "Password must be at least 6 characters." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = await sql`
    SELECT id FROM users WHERE email = ${normalizedEmail} AND role = ${role} LIMIT 1
  `;

  if (existing.length > 0) {
    return send(res, 409, { message: "Account already exists for this role." });
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const rows = await sql`
    INSERT INTO users (first_name, last_name, email, password_hash, role)
    VALUES (${String(firstName).trim()}, ${String(lastName).trim()}, ${normalizedEmail}, ${passwordHash}, ${role})
    RETURNING id, first_name, last_name, email, role
  `;

  const user = rows[0];
  const token = createToken({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  });

  setSessionCookie(res, token);
  return send(res, 200, {
    message: "Account created successfully.",
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
}
