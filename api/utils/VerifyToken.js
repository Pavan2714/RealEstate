// ...existing code...
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    // Allow preflight requests to pass through
    if (req.method === "OPTIONS") return next();

    // Accept token from Authorization header (Bearer), cookie, x-access-token header, or query param (for debugging)
    const authHeader = (
      req.headers.authorization ||
      req.headers.Authorization ||
      ""
    )
      .toString()
      .trim();
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const bearerToken = bearerMatch ? bearerMatch[1] : null;
    const cookieToken = req.cookies?.access_token || null;
    const altHeader = req.headers["x-access-token"] || null;
    const queryToken = req.query?.token || null;

    const token = bearerToken || cookieToken || altHeader || queryToken;

    if (!token) {
      console.warn("VerifyToken: token missing", {
        origin: req.headers.origin,
        hasAuthHeader: !!authHeader,
        hasCookie: !!cookieToken,
        hasXAccess: !!altHeader,
      });
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: token missing" });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.warn("VerifyToken: token verification failed:", err.message);
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized: token invalid or expired",
        });
    }

    // Attach useful user info for downstream handlers
    req.user = {
      id: payload.id || payload._id || payload.sub,
      role: payload.role,
      ...payload,
    };

    return next();
  } catch (err) {
    console.error("VerifyToken unexpected error:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
// ...existing code...
