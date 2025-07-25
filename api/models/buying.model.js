import mongoose from "mongoose";

const buyingSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    duration: {
      type: String, // Only required for rent
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Buying = mongoose.model("Buying", buyingSchema);
export default Buying;
