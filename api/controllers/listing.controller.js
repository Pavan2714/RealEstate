import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    // Extract imageUrls from request body
    const { imageUrls, ...otherData } = req.body;

    // Create listing with images stored as base64 strings in MongoDB
    const listing = await Listing.create({
      ...otherData,
      imageUrls: imageUrls || [], // Store base64 image strings directly
    });

    console.log(
      "Images stored in MongoDB:",
      listing.imageUrls.length,
      "images"
    );
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getAllListings = async (req, res) => {
  try {
    const { address, type, minPrice, maxPrice } = req.query;
    const filter = {};

    // Address filter - case-insensitive partial match
    if (address && address.trim()) {
      filter.address = { $regex: address.trim(), $options: "i" };
    }

    // Type filter - exact match
    if (type && type.trim()) {
      filter.type = type.trim();
    }

    // Price filter - range
    if (minPrice || maxPrice) {
      filter.regularPrice = {};
      if (minPrice) filter.regularPrice.$gte = Number(minPrice);
      if (maxPrice) filter.regularPrice.$lte = Number(maxPrice);
    }

    // Debug logs
    console.log("Query params received:", req.query);
    console.log("MongoDB filter being used:", filter);

    const listings = await Listing.find(filter);

    console.log("Listings found:", listings.length);
    console.log(
      "Listings:",
      listings.map((l) => ({ name: l.name, address: l.address, type: l.type }))
    );

    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings", error });
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("Fetching listing with ID:", id);

    const listing = await Listing.findById(id);

    if (!listing) {
      console.log("Listing not found for ID:", id);
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    console.log("Listing found:", listing.name);

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching listing by ID:", error);

    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    next(error);
  }
};
export const getListingsWithFilters = async (req, res, next) => {
  try {
    const {
      status, // 'sell' or 'rent'
      type,
      address,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      parking,
      furnished,
      offer,
      limit = 9,
      startIndex = 0,
    } = req.query;

    const filter = {};

    // Status filter (sell/rent)
    if (status && status !== "all") {
      filter.status = status;
    }

    // Type filter
    if (type && type !== "all") {
      filter.type = type;
    }

    // Address filter
    if (address && address.trim()) {
      filter.address = { $regex: address.trim(), $options: "i" };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.regularPrice = {};
      if (minPrice) filter.regularPrice.$gte = Number(minPrice);
      if (maxPrice) filter.regularPrice.$lte = Number(maxPrice);
    }

    // Bedrooms filter
    if (bedrooms) {
      filter.bedrooms = { $gte: Number(bedrooms) };
    }

    // Bathrooms filter
    if (bathrooms) {
      filter.bathrooms = { $gte: Number(bathrooms) };
    }

    // Boolean filters
    if (parking !== undefined) {
      filter.parking = parking === "true";
    }

    if (furnished !== undefined) {
      filter.furnished = furnished === "true";
    }

    if (offer !== undefined) {
      filter.offer = offer === "true";
    }
    console.log("Advanced filter being used:", filter);

    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));

    console.log("Filtered listings found:", listings.length);

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("Error fetching filtered listings:", error);
    next(error);
  }
};
