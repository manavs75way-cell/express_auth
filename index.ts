/// <reference path="./app/common/types/express.d.ts" />
import express from "express";
import http from "http";
import cors from "cors";
import { loadConfig, config } from "./app/common/helper/config.helper";
import router from "./app/route";
import { initDB } from "./app/common/services/db.service";
import { initPassport } from "./app/common/services/passport.strategy";
import authRoutes from "./app/common/route/auth.route";
import passport from "passport";

loadConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);

const init = async (): Promise<void> => {
    const dbConnected = await initDB();
    if (!dbConnected) {
        process.exit(1);
    }
    initPassport();
    app.use(passport.initialize());
    app.use("/api", router);
    app.use("/api/auth", authRoutes);
    server.listen(config.port, () => {
        console.log(`Server is running on port ${config.port} in ${config.env} mode`);
    });
};

void init();
