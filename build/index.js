"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const cors_1 = __importDefault(require("cors"));
require("./infra/database/sqlite/config");
// MongoDB();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/user', UserController_1.default.create);
app.get('/users', UserController_1.default.find);
app.listen(3000, () => console.log("server is running in http://localhost:3000"));
