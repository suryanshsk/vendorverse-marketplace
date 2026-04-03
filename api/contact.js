import { sql, hasDatabaseUrl } from "./_lib/db.js";

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

  const payload = await new Promise((resolve, reject) => {
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

  const { firstName, lastName, email, subject, message } = payload;
  if (!firstName || !lastName || !email || !subject || !message) {
    return send(res, 400, { message: "All fields are required." });
  }

  await sql`
    INSERT INTO contact_messages (first_name, last_name, email, subject, message)
    VALUES (${String(firstName).trim()}, ${String(lastName).trim()}, ${String(email).trim().toLowerCase()}, ${String(subject).trim()}, ${String(message).trim()})
  `;

  return send(res, 200, { message: "Message sent successfully." });
}
