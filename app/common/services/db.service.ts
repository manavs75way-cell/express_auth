import mongoose from "mongoose";
import { config } from "../helper/config.helper";

export const initDB = async (): Promise<boolean> => {
    try {
        if (!config.mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(config.mongoUri);
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return false;
    }
};