import express from "express";
import UserController from "./controllers/UserController";
import { config } from 'dotenv';
import cors from 'cors';
import './infra/database/sqlite/config';
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import PermissionController from "./controllers/PermissionController";
import UserACLController from "./controllers/UserACLController";
import SessionController from "./controllers/SessionController";
import { routes } from "./routes";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("server is running in http://localhost:3000"));