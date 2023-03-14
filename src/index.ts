import express from "express";
import UserController from "./controllers/UserController";
import MongoDB from "./infra/database/mongodb/config";
import { config } from 'dotenv';
import cors from 'cors';
import './infra/database/sqlite/config';
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import PermissionController from "./controllers/PermissionController";
import UserACLController from "./controllers/UserACLController";
import SessionController from "./controllers/SessionController";

// MongoDB();
config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', SessionController.handle);

app.post('/user', UserController.create);
app.get('/users', UserController.find);

app.post('/product', ProductController.create);
app.get('/products', ProductController.find);

app.post('/role', RoleController.create); //rota que será autenticada futuramente

app.post('/permission', PermissionController.create); //rota que será autenticada futuramente

app.post('/users/acl', UserACLController.create); //rota que será autenticada futuramente

app.post('/roles/:roleId', RoleController.createRolePermission); //rota que será autenticada futuramente

app.listen(3000, () => console.log("server is running in http://localhost:3000"));