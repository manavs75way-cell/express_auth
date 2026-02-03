
import { type Request, type Response } from "express";
import { createUser, getUserByEmail, getUserById, updateUser as updateUserService, deleteUser as deleteUserService } from "./user.services";
import { createResponse } from "../common/helper/response.helper";
import { generateToken } from "../common/helper/jwt.helper";
import { Role, type UserSchema } from "./user.dto";
import bcrypt from "bcryptjs";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json(createResponse(null, "Invalid email or password"));
            return;
        }

        const token = generateToken({ id: user._id, role: user.role });
        res.send(createResponse({ token }, "Login successful"));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(null, "Internal Server Error"));
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json(createResponse(null, "Authentication required"));
            return;
        }

        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json(createResponse(null, "User not found"));
            return;
        }
        res.send(createResponse(user, "User retrieved successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(null, "Internal Server Error"));
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const userRole = req.user?.role;
        const currentUserId = req.user?.id;

        if (!currentUserId || !userRole) {
            res.status(401).json(createResponse(null, "Authentication required"));
            return;
        }

        if (userRole !== Role.ADMIN && currentUserId !== userId) {
            res.status(403).json(createResponse(null, "Access denied"));
            return;
        }

        const updatedUser = await updateUserService(userId, req.body);
        if (!updatedUser) {
            res.status(404).json(createResponse(null, "User not found"));
            return;
        }
        res.send(createResponse(updatedUser, "User updated successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(null, "Internal Server Error"));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const userRole = req.user?.role;
        const currentUserId = req.user?.id;

        if (!currentUserId || !userRole) {
            res.status(401).json(createResponse(null, "Authentication required"));
            return;
        }

        if (userRole !== Role.ADMIN && currentUserId !== userId) {
            res.status(403).json(createResponse(null, "Access denied"));
            return;
        }

        await deleteUserService(userId);
        res.send(createResponse(null, "User deleted successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(null, "Internal Server Error"));
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json(createResponse(null, "User already exists"));
            return;
        }

        const newUser = await createUser({
            name,
            email,
            password,
            role: role || Role.USER,
        } as any);

        const token = generateToken({ id: newUser._id, role: newUser.role });
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json(createResponse({ user: userWithoutPassword, token }, "User registered successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(null, "Internal Server Error"));
    }
};