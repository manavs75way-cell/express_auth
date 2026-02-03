import jwt from "jsonwebtoken";
import { config } from "./config.helper";

export const generateToken = (payload: object, expiresIn: string = "1h") => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};
