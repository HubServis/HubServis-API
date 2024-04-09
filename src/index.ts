import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
import { routes } from "./routes";

import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import "./infra/database/postgres/config";

config();

const app = express();
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.COOKIE_DOMAIN || "localhost";
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(helmet()); //add default headers for security
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use(cors({ credentials: true, origin: DOMAIN }));
app.use(
  NODE_ENV === "production"
    ? cookieParser(process.env.COOKIE_SECRET)
    : cookieParser(),
);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true }),
);

app.use(routes);

app.listen(3000, () =>
  console.log(`===== server is running on ${DOMAIN}:${PORT} =====`),
);

// captura os errors não tratados
// se não tiver ele o sistema quebra e para de receber requisições
process.on("uncaughtException", (error, origin) => {
  console.log(`\n${origin} signal received. \n${error}`);
});

// se nao tiver ele, o sistema joga um warn
process.on("unhandledRejection", (error) => {
  console.log(`\nunhandledRejection signal received. \n${error}`);
});
