
import { Router } from "express";
import passport from "passport";
import { generateToken } from "../helper/jwt.helper";
import { createResponse } from "../helper/response.helper";
import { type Request, type Response } from "express";

const router = Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], accessType: "offline", prompt: "consent" }));

// /api/auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            res.status(401).json(createResponse(null, "Authentication failed"));
            return;
        }

        const token = generateToken({ id: user.id, role: user.role });

        res.json(createResponse({ token, user }, "Google Login Successful"));
    }
);

export default router;
