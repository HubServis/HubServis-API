"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserService = void 0;
class FindUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute() {
        const users = await this.usersRepository.find();
        return users;
    }
}
exports.FindUserService = FindUserService;
