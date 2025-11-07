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

/*
  CORS configuration:
  - allow known origins from env
  - allow localhost in non-production
  - enable credentials so cookies are sent
*/
const whitelist = [
  process.env.VITE_FRONTEND_URL,
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  // Add your production frontend URL as fallback
  "https://real-estate-frontend-zeta-blond.vercel.app",
  process.env.DEV_ORIGIN || "http://localhost:8081",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow non-browser requests like curl or server-to-server (no origin)
    if (!origin) {
      console.log("CORS: allowing request with no origin (server-to-server)");
      return callback(null, true);
    }

    // allow localhost in non-production
    if (process.env.NODE_ENV !== "production" && origin.includes("localhost")) {
      console.log("CORS: allowing localhost origin:", origin);
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      console.log("CORS: allowing whitelisted origin:", origin);
      return callback(null, true);
    }

    console.warn("CORS: rejecting origin:", origin, "| Whitelist:", whitelist);
    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
    "Cache-Control",
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Connect to MongoDB
await connectDB();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/user", Userrouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/buying", buyingRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

// Global error handler
app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith("CORS policy")) {
    return res.status(403).json({
      success: false,
      status: 403,
      message: err.message,
    });
  }

  const statuscode = err.statuscode || 500;
  const message = err.message || "Something went wrong";
  console.error(err.stack);
  return res.status(statuscode).json({
    success: false,
    status: statuscode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Allowed CORS origins:", whitelist);
});

export default app;
