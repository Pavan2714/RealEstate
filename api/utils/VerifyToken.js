import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const VerifyToken = (req, res, next) => {
  // accept cookie or Authorization: Bearer <token>
  const token =
    req.cookies?.access_token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1]);

  if (!token) return next(errorHandler(401, "Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return next(errorHandler(403, "Forbidden"));
  }
};
