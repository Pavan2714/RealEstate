import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  getListingsWithFilters,
} from "../controllers/listing.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.post("/create", VerifyToken, createListing);
router.get("/", getAllListings);
// Get listings with advanced filters
router.get("/search", getListingsWithFilters);

// Get single listing by ID (this should be last to avoid conflicts)
router.get("/:id", getListingById);

export const listingRouter = router;
