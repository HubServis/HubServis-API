import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/platform-log-request"; // remove this import if you don&#x27;t want log request

import { join } from "node:path";

import { Configuration } from "@tsed/di";

import { RedisStore } from "connect-redis";

import { application } from "@tsed/platform-http";

import { config } from "./config";
import { redisClient } from "./config/cache";
import { AUTORIZED_ORIGINS, NODE_ENV, PORT, SESSION_SECRET } from "./config/variables";

import session from "express-session";

import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import methodOverride from "method-override";
import bodyParser from "body-parser";

import { UserController } from "./controllers/UserController";
import { RoleController } from "./controllers/RoleController";
import { PlanController } from "./controllers/PlanController";
import { RatingController } from "./controllers/RatingController";
import { BenefitController } from "./controllers/BenefitController";
import { ScheduleController } from "./controllers/ScheduleController";
import { CategoryController } from "./controllers/CategoryController";
import { BusinessController } from "./controllers/BusinessController";
import { ProfessionalController } from "./controllers/ProfessionalController";
import { ExpedientController } from "./controllers/ExpedientController";
import { BlockingController } from "./controllers/BlockingController";

@Configuration({
    ...config,
    swagger: [
        {
            path: "/v3/docs",
            specVersion: "3.0.1",
        },
    ],
    multer: {
        dest: "upload",
        limits: {
            fieldSize: 1028,
            fileSize: 1028000,
        },
    },
    middlewares: [
        {
            use: "cors",
            options: {
                origin: AUTORIZED_ORIGINS,
                credentials: true,
                methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
            },
        },
        {
            use: "helmet",
            options: {
                hidePoweredBy: true,
                noSniff: true,
                xssFilter: true,
                contentSecurityPolicy: {
                    directives: {
                        defaultSrc: [`'self'`],
                        styleSrc: [`'self'`, `'unsafe-inline'`],
                        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
                        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                    },
                },
            },
        },
        {
            use: "express-session",
            options: {
                store: new RedisStore({ client: redisClient, ttl: 3200 }),
                proxy: true,
                secret: SESSION_SECRET,
                cookie: {
                    secure: NODE_ENV === "production" ? true : false,
                    httpOnly: true, //# Apenas servidor reconhece autenticidade de cookie
                    sameSite: NODE_ENV === "production" ? true : false,
                },
                resave: true,
                saveUninitialized: false,
            },
        },
        "compression",
        "method-override",
        "json-parser",
        { use: "urlencoded-parser", options: { extended: true } },
    ],
    acceptMimes: ["application/json", "multipart/form-data"],
    httpPort: "127.0.0.1:" + PORT || 8083,
    httpsPort: NODE_ENV, // CHANGE
    mount: {
        "/": [
            UserController,
            PlanController,
            RoleController,
            RatingController,
            BenefitController,
            CategoryController,
            ScheduleController,
            BusinessController,
            BlockingController,
            ExpedientController,
            ProfessionalController,
        ],
    },
    exclude: ["**/*.specs.ts"],
})
export class Server {
    protected app = application();

    $beforeRouteInit(): void {
        this.app.use("/uploads", express.static(join(process.cwd(), "uploads")));
    }
}
