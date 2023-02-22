import express from "express";
import UserController from "./controllers/UserController";
import MongoDB from "./infra/database/mongodb/config";
import cors from 'cors';
import './infra/database/sqlite/config';

// MongoDB();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/user', UserController.create);
app.get('/users', UserController.find);

app.listen(3000, () => console.log("server is running in http://localhost:3000"));