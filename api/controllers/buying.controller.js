import Buying from "../models/buying.model.js";

export const createBuying = async (req, res, next) => {
  try {
    const { listingId, buyerId, offerPrice, transactionType, duration } = req.body;

    if (!listingId || !buyerId || !offerPrice || !transactionType) {
      return res.status(400).json({ message: "All fields are required" });
    }

      // Validate transactionType
      if (!["buy", "rent"].includes(transactionType)) {
        return res.status(400).json({ message: "Invalid transaction type" });
      }
  
      // If renting, ensure duration is provided
      if (transactionType === "rent" && !duration) {
        return res.status(400).json({ message: "Duration is required for rent" });
      }

    const buying = await Buying.create({ listingId, buyerId, offerPrice ,transactionType,duration: transactionType === "rent" ? duration : null});
    res.status(201).json({
      message: `${transactionType} transaction created successfully`,
      Buying,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllBuyings = async (req, res) => {
  try {
    const { buyerId, transactionType  } = req.query;//buyerId
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
    res.status(200).json(buyings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buyings", error });
  }
};
export const deleteBuying = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Buying.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Buying offer not found" });
    }
    res.status(200).json({ message: "Buying offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting buying offer", error });
  }
};
