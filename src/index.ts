import express from "express";

import { config } from 'dotenv';
import cors from 'cors';
import './infra/database/sqlite/config';
import { routes } from "./routes";

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(3000, () => console.log("server is running in http://localhost:3000"));
