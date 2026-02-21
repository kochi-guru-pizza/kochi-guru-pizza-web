// src/config/db.ts
import mongoose from "mongoose";
import config from "./index";

const connectDB = async () => {
  try {
    if (!config.MONGO_DB_URI) {
      throw new Error("MONGO_DB_URI is not defined");
    }

    await mongoose.connect(config.MONGO_DB_URI);

    console.log(`✅ MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
