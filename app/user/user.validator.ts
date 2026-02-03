
import { body, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import { createResponse } from "../common/helper/response.helper";

export const createUserValidator = [
    body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(createResponse(errors.array(), "Validation failed"));
            return;
        }
        next();
    }
];

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(createResponse(errors.array(), "Validation failed"));
            return;
        }
        next();
    }
];

export const updateUserValidator = [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(createResponse(errors.array(), "Validation failed"));
            return;
        }
        next();
    }
];
