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

/* ✅ IMPORTANT on Render/Proxies: enables Express to see HTTPS and set Secure cookies correctly */
app.set("trust proxy", 1);

/* ✅ CORS: allow your FE origins, allow Authorization header, and credentials (for cookies if you use them) */
const ALLOWED_ORIGINS = [
  "https://real-estate-frontend-zeta-blond.vercel.app", // your frontend
  // Add other FRONTEND origins only. Do NOT add your backend domain here.
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow same-origin tools (like curl/Postman with no Origin)
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // <-- allow token header
    credentials: true, // needed only if you use cookies
  })
);

/* Some hosts require explicit OPTIONS handling for preflight */
app.options("*", cors());

/* ✅ Body & cookies */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

/* ✅ DB connect before routes */
await connectDB();

/* ✅ Routes */
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/user", Userrouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/buying", buyingRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

/* 🔎 Optional: debug endpoint to confirm what headers/cookies actually arrive */
app.get("/api/_debug", (req, res) =>
  res.json({ headers: req.headers, cookies: req.cookies })
);

/* ✅ Global error handler */
app.use((err, req, res, next) => {
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
});
