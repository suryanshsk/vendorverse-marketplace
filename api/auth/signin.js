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

  const { email, password, role } = await new Promise((resolve, reject) => {
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

  if (!email || !password || !role) {
    return send(res, 400, { message: "Email, password, and role are required." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const rows = await sql`
    SELECT id, first_name, last_name, email, role, password_hash
    FROM users
    WHERE email = ${normalizedEmail} AND role = ${role}
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) {
    return send(res, 401, { message: "Invalid credentials or role mismatch." });
  }

  const isValid = await bcrypt.compare(String(password), user.password_hash);
  if (!isValid) {
    return send(res, 401, { message: "Invalid credentials or role mismatch." });
  }

  const token = createToken({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  });

  setSessionCookie(res, token);
  return send(res, 200, {
    message: "Signed in successfully.",
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
}
