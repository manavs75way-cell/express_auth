
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../helper/config.helper";
import { createResponse } from "../helper/response.helper";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json(createResponse(null, "Access denied. No token provided."));
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as Express.User;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json(createResponse(null, "Invalid token."));
    }
};
