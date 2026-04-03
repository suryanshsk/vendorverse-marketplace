import jwt from "jsonwebtoken";
import { parse, serialize } from "cookie";

const COOKIE_NAME = "vendorverse_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function createToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}

export function readToken(req) {
  const cookies = parse(req.headers.cookie || "");
  return cookies[COOKIE_NAME] || null;
}

export function getSessionUser(req) {
  const token = readToken(req);
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    })
  );
}

export function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  );
}
