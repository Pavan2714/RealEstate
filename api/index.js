import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Userrouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import { listingRouter } from "./routes/listing.route.js";
import buyingRouter from "./routes/Buying.routes.js";
import rentalRouter from "./routes/rental.routes.js";
import contactRouter from "./routes/contact.route.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for Vercel/Render
app.set("trust proxy", 1);

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://real-estate-frontend-zeta-blond.vercel.app",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

// ✅ CORS - MUST BE BEFORE OTHER MIDDLEWARE
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ CRITICAL for cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Handle preflight
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin, Cookie"
  );
  res.sendStatus(204);
});

// ✅ Cookie parser MUST be after CORS
app.use(cookieParser());

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Debug middleware (remove in production)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin || "none");
  console.log("Cookies:", req.cookies);
  next();
});

await connectDB();

// Routes
app.get("/", (req, res) =>
  res.json({
    status: "OK",
    allowedOrigins,
    cookies: req.cookies,
  })
);

app.use("/api/user", Userrouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/buying", buyingRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || err.statusCode || 500;
  const message = err.message || "Something went wrong";
  console.error("❌ Error:", message);
  res.status(statuscode).json({ success: false, status: statuscode, message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
  console.log("🔒 Allowed Origins:", allowedOrigins);
});
