import express from "express";

import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import "./infra/database/sqlite/config";
import { routes } from "./routes";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

config();

const app = express();

app.use(cors({
	credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.use(express.json({ limit: '1mb' }));
app.use(routes);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);

app.listen(3000, () =>
  console.log("server is running in http://localhost:3000")
);
