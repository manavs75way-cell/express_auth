
import { Router } from "express";
import { registerUser, loginUser, getUser, updateUser, deleteUser } from "./user.controller";
import { createUserValidator, loginValidator, updateUserValidator } from "./user.validator";
import { authMiddleware } from "../common/middleware/auth.middleware";

const router = Router();

router.post("/register", createUserValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/me", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUserValidator, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
