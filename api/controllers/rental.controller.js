import Rental from "../models/rental.model.js";

export const createRental = async (req, res, next) => {
  try {
    const { listingId, renterId, offerPrice, transactionType, duration } =
      req.body;

    if (!listingId || !renterId || !offerPrice || !transactionType) {
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

    const rental = await Rental.create({
      listingId,
      renterId,
      offerPrice,
      transactionType,
      duration: transactionType === "rent" ? duration : null,
    });

    res.status(201).json({
      message: `${transactionType} transaction created successfully`,
      rental,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const { renterId, transactionType } = req.query;
    const filter = {};

    if (renterId) filter.renterId = renterId;
    if (transactionType) filter.transactionType = transactionType;

     const rentals = await Rental.find(filter)
      .populate({
        path: "listingId",
        select:
          "name description imageUrls regularPrice status type address bedrooms bathrooms parking furnished offer discountPrice",
      })
      .populate("renterId", "username email");

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rentals", error });
  }
};
export const deleteRental = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Rental.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Rental offer not found" });
    }
    res.status(200).json({ message: "Rental offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rental offer", error });
  }
};
