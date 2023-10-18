import express from "express";

import { config } from "dotenv";
import cors from "cors";
import "./infra/database/sqlite/config";
import { routes } from "./routes";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);

app.listen(3000, () =>
  console.log("server is running in http://localhost:3000")
);

// captura os erros não tratados
// se não tiver ele o sistema quebra e para de receber requisições
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received. \n${error}`)
})

// se nao tiver ele, o sistema joga um warn
process.on('unhandledRejection', (error) => {
  console.log(`\nunhandledRejection signal received. \n${error}`)
})