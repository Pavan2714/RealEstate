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

const app = express(); // Create an Express application instance
const PORT = 3000;

app.use(
  cors({
    origin: [
      "https://real-estate-frontend-zeta-blond.vercel.app",
      "https://real-estate-backend-alpha-seven.vercel.app",
      "https://real-estate-backend-seven-gamma.vercel.app",
      "https://real-estate-nine-ecru.vercel.app",
    ],
    credentials: true,
  })
);

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
  const statuscode = err.statuscode || 500; // Default to 500 if no custom status code
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
// Export the Express app for use in other files (e.g., server.js)
