import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

const app = express();

// CORS Configuration - MUST BE FIRST, BEFORE OTHER MIDDLEWARE
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://real-estate-frontend-zeta-blond.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

// CORS middleware - PLACE THIS FIRST
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

// Body parsing middleware - AFTER CORS
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `📡 ${req.method} ${req.path} - Origin: ${
      req.headers.origin || "No origin"
    }`
  );
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "API is running!",
    cors: "enabled",
    allowedOrigins: allowedOrigins,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("❌ Error:", {
    statusCode,
    message,
    path: req.path,
    method: req.method,
  });

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔒 CORS enabled for: ${allowedOrigins.join(", ")}`);
});

export default app;
