"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
class CreateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    // Pode fazer assim também
    // private usersRepository: IUsersRepository;
    // constructor(usersRepository: IUsersRepository){
    //     this.usersRepository = usersRepository;
    // }
    async execute(props) {
        const user = await this.usersRepository.create(props);
        return user;
    }
}
exports.CreateUserService = CreateUserService;
