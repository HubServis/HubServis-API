"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositorySqlite = void 0;
const User_1 = require("../models/User");
const config_1 = __importDefault(require("../config"));
class UserRepositorySqlite {
    async create(props) {
        const { id, name, email, password } = props;
        const userRepository = (await config_1.default).getRepository(User_1.User);
        const user = await userRepository.save({ id, name, email, password });
        return user;
    }
    async find() {
        const userRepository = (await config_1.default).getRepository(User_1.User);
        const user = await userRepository.find();
        return user;
    }
}
exports.UserRepositorySqlite = UserRepositorySqlite;
