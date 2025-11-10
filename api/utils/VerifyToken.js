import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const VerifyToken = (req, res, next) => {
  // ✅ ADD DETAILED LOGGING
  console.log("🔍 VerifyToken called for:", req.method, req.path);
  console.log("🔍 Headers:", JSON.stringify(req.headers, null, 2));
  console.log("🔍 Cookies received:", req.cookies);

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET not configured");
    return next(errorHandler(500, "JWT secret not configured"));
  }

  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const cookieToken = req.cookies?.access_token || null;

  console.log("🔍 Bearer token:", bearerToken ? "Present" : "Missing");
  console.log("🔍 Cookie token:", cookieToken ? "Present" : "Missing");

  const token = bearerToken || cookieToken;

  if (!token) {
    console.error("❌ No token found in request");
    return next(errorHandler(401, "Unauthorized: token missing"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("❌ Token verification failed:", err.name, err.message);
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(401, "Unauthorized: token expired"));
      }
      if (err.name === "JsonWebTokenError") {
        return next(errorHandler(403, "Forbidden: invalid token"));
      }
      return next(errorHandler(403, "Forbidden: token verification failed"));
    }

    const userId = payload.id || payload._id;
    if (!userId) {
      console.error("❌ Token missing user id");
      return next(errorHandler(400, "Invalid token payload: missing user id"));
    }

    req.user = {
      id: userId,
      role: payload.role || "buyer",
    };

    console.log(
      "✅ Token verified for user:",
      req.user.id,
      "role:",
      req.user.role
    );
    return next();
  });
};
