import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Connected to MongoDB")
    );
    mongoose.connection.on("error", (err) =>
      console.error("MongoDB connection error:", err)
    );
    await mongoose.connect(process.env.MONGO); // No options needed
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
