import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const loadConfig = () => {
    // Environment variables are loaded at module level now.
};

export const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/express-auth",
    jwtSecret: process.env.JWT_SECRET || "qiC0xrir1q83WY1TePospyV0NeJIsKeJgRM8pgACjyO",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
