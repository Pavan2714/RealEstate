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

// Define allowed origins explicitly
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://real-estate-frontend-zeta-blond.vercel.app",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  process.env.VITE_FRONTEND_URL,
].filter(Boolean);

// CORS must be first
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser (curl/Postman)
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Explicit OPTIONS handler (preflight)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  return res.sendStatus(204);
});

// Debug log middleware
app.use((req, res, next) => {
  console.log(
    `Request: ${req.method} ${req.path} Origin: ${req.headers.origin || "none"}`
  );
  next();
});

await connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) =>
  res.json({
    status: "OK",
    allowedOrigins,
    receivedOrigin: req.headers.origin || null,
  })
);

app.use("/api/user", Userrouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/buying", buyingRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || err.statusCode || 500;
  const message = err.message || "Something went wrong";
  console.error("Error:", message);
  res.status(statuscode).json({ success: false, status: statuscode, message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log("Allowed Origins:", allowedOrigins);
});
