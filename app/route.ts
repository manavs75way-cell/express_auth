
import { Router } from "express";
import userRoutes from "./user/user.route";

const router = Router();

router.use("/users", userRoutes);



router.get("/health", (req, res) => {
    res.send({ status: "ok", uptime: process.uptime() });
});

export default router;
