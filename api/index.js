// ...existing code...
import express from "express"; // Import Express framework // For MongoDB connection
import cors from "cors";
import dotenv from "dotenv"; // To load environment variables from .env file
import Userrouter from "./routes/user.route.js"; // Importing user routes
import authRouter from "./routes/auth.routes.js"; // Importing authentication routes
import { listingRouter } from "./routes/listing.route.js"; // Importing property listing routes
import cookieParser from "cookie-parser"; // To parse cookies from requests
import buyingRouter from "./routes/Buying.routes.js"; // Importing buying routes
import rentalRouter from "./routes/rental.routes.js";
import contactRouter from "./routes/contact.route.js";
import connectDB from "./config/db.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN =
  process.env.VITE_FRONTEND_URL || "http://localhost:5173";

// If running behind a proxy (Vercel/Render) and you want secure cookies to work:
app.set("trust proxy", 1);

// Accept multiple origins via comma-separated env var (fallback to FRONTEND_ORIGIN)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || FRONTEND_ORIGIN)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

console.log("Allowed CORS origins:", ALLOWED_ORIGINS);

const corsOptions = {
  origin: (origin, callback) => {
    // allow server-to-server or tools with no origin
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ensure preflight responses use the same options
app.options("*", cors(corsOptions));

// ✅ Connect to MongoDB
await connectDB(); // Connect to MongoDB using the config function

// ✅ Middlewares

// Increase JSON payload limit for base64 images (default is too small)
app.use(express.json({ limit: "10mb" })); // Allows large JSON requests (like images)
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Handles URL-encoded form data
app.use(cookieParser()); // Parses cookies from incoming requests

// ✅ Define API routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/user", Userrouter); // User-related routes (e.g., profile, update user)
app.use("/api/auth", authRouter); // Authentication routes (e.g., login, register)
app.use("/api/listing", listingRouter); // Property listing routes (CRUD for properties)
app.use("/api/buying", buyingRouter); // Routes for buying transactions
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || err.statusCode || 500; // normalize
  const message = err.message || "Something went wrong"; // Default message
  console.error(err.stack); // Log error stack trace for debugging
  return res.status(statuscode).json({
    success: false,
    status: statuscode,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
// ...existing code...
