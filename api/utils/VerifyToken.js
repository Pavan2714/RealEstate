// utils/VerifyToken.js
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    // Headers can be case-insensitive; Node lowercases them, but be safe
    const rawAuth = (
      req.headers.authorization ??
      req.headers.Authorization ??
      ""
    ).trim();

    let token = null;
    if (rawAuth && /^Bearer\s+/i.test(rawAuth)) {
      token = rawAuth.replace(/^Bearer\s+/i, "").trim();
    }

    // Accept common cookie names in case your login route set a different one
    const c = req.cookies || {};
    token = token || c.access_token || c.token || c.jwt || c.session || null;

    if (!token) {
      // Optional: temporary debug to confirm what the server actually sees
      // console.log("Auth headers seen:", req.headers);
      // console.log("Cookies seen:", req.cookies);
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: token missing" });
    }

    if (!process.env.JWT_SECRET) {
      // This prevents opaque 500s if secret is missing in Render env
      return res.status(500).json({
        success: false,
        message: "Server misconfig: JWT_SECRET not set",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id || payload._id,
      role: payload.role,
      ...payload, // keep other claims if you need them
    };

    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: token invalid or expired",
    });
  }
};
