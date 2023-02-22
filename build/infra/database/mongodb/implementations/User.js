"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryMongoDB = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserRepositoryMongoDB {
    async create(props) {
        const { id, name, email, password } = props;
        const user = await User_1.default.create({ id, name, email, password });
        return user;
    }
    async find() {
        const users = await User_1.default.find();
        return users;
    }
}
exports.UserRepositoryMongoDB = UserRepositoryMongoDB;
