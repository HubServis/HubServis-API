import { Response, Request } from 'express';
import { IUserCotroller } from '../interfaces/controllers';
import { User } from "../entities/User";
import { FindUserService } from "../services/user/findUsers";
import { CreateUserService } from "../services/user/CreateUser";
import { UserRepositoryMongoDB } from "../infra/database/mongodb/implementations/User";
import { UserRepositorySqlite } from "../infra/database/sqlite/implementations/UserRepository";

// const createUserService = new CreateUserService(new UserRepositoryMongoDB());
const createUserService = new CreateUserService(new UserRepositorySqlite());
const findUserService = new FindUserService(new UserRepositorySqlite());
// const findUserService = new FindUserService(new UserRepositoryMongoDB());

class UserController implements IUserCotroller{
    
    async create(req: Request, res: Response){
        const { name, email, password } = req.body;

        try {
            const user = new User({name, email, password});
            const createdUser = await createUserService.execute(user);
    
            return res.status(201).json(createdUser);
    
        } catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }

    async find(req: Request, res: Response){
        
        try {
            const users = await findUserService.execute();
            return res.status(201).json(users);
    
        } catch (err) {
            console.log(err.message);
            return res.status(500).json('Unexpected error');
        }
    }
}

export default new UserController();