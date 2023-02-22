"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const findUsers_1 = require("../services/user/findUsers");
const CreateUser_1 = require("../services/user/CreateUser");
const UserRepository_1 = require("../infra/database/sqlite/implementations/UserRepository");
// const createUserService = new CreateUserService(new UserRepositoryMongoDB());
const createUserService = new CreateUser_1.CreateUserService(new UserRepository_1.UserRepositorySqlite());
const findUserService = new findUsers_1.FindUserService(new UserRepository_1.UserRepositorySqlite());
// const findUserService = new FindUserService(new UserRepositoryMongoDB());
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = new User_1.User({ name, email, password });
            const createdUser = await createUserService.execute(user);
            return res.status(201).json(createdUser);
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
    async find(req, res) {
        try {
            const users = await findUserService.execute();
            return res.status(201).json(users);
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
}
exports.default = new UserController();
