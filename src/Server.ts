import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/platform-log-request"; // remove this import if you don&#x27;t want log request

import { join } from "node:path";

import { Configuration, Inject } from "@tsed/di";

import { PlatformApplication } from "@tsed/platform-http";

import { config } from "./config";

import { AUTORIZED_ORIGINS, NODE_ENV, PORT, SERVER_URL } from "./config/variables";

import express from "express";

import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { RoleController } from "./controllers/RoleController";
import { PlanController } from "./controllers/PlanController";
import { RatingController } from "./controllers/RatingController";
import { BenefitController } from "./controllers/BenefitController";
import { PaymentController } from "./controllers/PaymentController";
import { ScheduleController } from "./controllers/ScheduleController";
import { CategoryController } from "./controllers/CategoryController";
import { BusinessController } from "./controllers/BusinessController";
import { BlockingController } from "./controllers/BlockingController";
import { ExpedientController } from "./controllers/ExpedientController";
import { ProfessionalController } from "./controllers/ProfessionalController";

import cors from "cors";

const rootDir = __dirname;

@Configuration({
    rootDir,
    ...config,
    swagger: [
        {
            path: "/v3/docs",
            specVersion: "3.0.1",
            spec: {
                servers: [{ url: `${SERVER_URL}:${PORT}`, description: "Main Server" }],
                components: {
                    securitySchemes: {
                        bearerHttpAuthentication: {
                            description: "Bearer Token Com JWT",
                            type: "http",
                            bearerFormat: "jwt",
                            scheme: "Bearer",
                        },
                        oauth2: {
                            description: "oauth2",
                            type: "oauth2",
                            flows: {
                                implicit: {
                                    authorizationUrl: `${SERVER_URL}:${PORT}/oauth/`,
                                    scopes: {
                                        openid: "OpenID access",
                                        email: "User e-mail",
                                        profile: "User profile info(img, name, etc...)",
                                    },
                                },
                            },
                        },
                    },
                },
            },
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
        "compression",
        "method-override",
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
        "json-parser",
        { use: "urlencoded-parser", options: { extended: true } },
    ],
    acceptMimes: ["application/json", "multipart/form-data"],
    httpPort: "127.0.0.1:" + PORT || 8083,
    httpsPort: NODE_ENV, // CHANGE
    mount: {
        "/": [
            AuthController,
            UserController,
            PlanController,
            BenefitController,
            RoleController,
            RatingController,
            CategoryController,
            ScheduleController,
            BusinessController,
            BlockingController,
            ExpedientController,
            ProfessionalController,
            PaymentController,
        ],
    },
    exclude: ["**/*.specs.ts"],
})
export class Server {
    @Inject()
    protected app: PlatformApplication;

    /**
     * This method let you configure the middlewares
     * @returns {Server}
     */
    $beforeRouteInit(): void | Promise<any> {
        this.app.use("/uploads", express.static(join(process.cwd(), "uploads"))).use(cors({}));
    }
}
