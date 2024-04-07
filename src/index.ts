import express from "express";

import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import "./infra/database/postgres/config";
import { routes } from "./routes";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import helmet from "helmet";

config();

const app = express();

//Reduce sniff chances to succecede
app.disable('x-powered-by')
app.use(cors({ credentials: true, origin: "http://hubservis.io" }));
/* use it when on server
	app.use(cookieParser('somekeycodetosecurecookiewithsomecaracters'));
*/
app.use(cookieParser());
app.use(express.urlencoded({ limit: '15mb', extended: true }))
app.use(express.json({ limit: '15mb' }));
app.use(helmet())
app.use(routes);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);

app.listen(3000, () =>
  console.log("server is running in http://localhost:3000")
);

// captura os errors não tratados
// se não tiver ele o sistema quebra e para de receber requisições
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received. \n${error}`)
})

// se nao tiver ele, o sistema joga um warn
process.on('unhandledRejection', (error) => {
  console.log(`\nunhandledRejection signal received. \n${error}`)
})
