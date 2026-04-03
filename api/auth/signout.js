import { clearSessionCookie } from "../_lib/session.js";

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return send(res, 405, { message: "Method not allowed" });
  }

  clearSessionCookie(res);
  return send(res, 200, { message: "Signed out successfully." });
}
