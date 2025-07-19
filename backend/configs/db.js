import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // ← no extra options
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};

export default connectDB;