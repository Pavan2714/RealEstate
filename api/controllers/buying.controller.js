// ...existing code...
import Buying from "../models/buying.model.js";

// ...existing code...

export const createBuying = async (req, res, next) => {
  try {
    const { listingId, buyerId, offerPrice, transactionType, duration } =
      req.body;

    if (!listingId || !buyerId || !offerPrice || !transactionType) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!["buy", "rent"].includes(transactionType)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid transaction type" });
    }

    if (transactionType === "rent" && !duration) {
      return res
        .status(400)
        .json({ success: false, message: "Duration is required for rent" });
    }

    // Optional: prevent duplicate offers for same listing by same buyer
    const existing = await Buying.findOne({
      listingId,
      buyerId,
      transactionType,
    });
    if (existing) {
      return res
        .status(409)
        .json({
          success: false,
          message: "You already made an offer for this listing",
        });
    }

    const buying = await Buying.create({
      listingId,
      buyerId,
      offerPrice,
      transactionType,
      duration: transactionType === "rent" ? duration : null,
    });

    return res.status(201).json({
      success: true,
      message: `${transactionType} transaction created successfully`,
      data: buying,
    });
  } catch (error) {
    console.error("createBuying error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllBuyings = async (req, res) => {
  try {
    const { buyerId, transactionType } = req.query;
    const filter = {};
    if (buyerId) filter.buyerId = buyerId;
    if (transactionType) filter.transactionType = transactionType;

    const buyings = await Buying.find(filter)
      .populate({
        path: "listingId",
        select:
          "name description imageUrls regularPrice status type address bedrooms bathrooms parking furnished offer discountPrice",
      })
      .populate("buyerId", "username email");

    return res.status(200).json({ success: true, data: buyings });
  } catch (error) {
    console.error("getAllBuyings error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching buyings",
        error: error.message,
      });
  }
};

export const deleteBuying = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Buying.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Buying offer not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Buying offer deleted successfully" });
  } catch (error) {
    console.error("deleteBuying error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error deleting buying offer",
        error: error.message,
      });
  }
};
// ...existing code...
