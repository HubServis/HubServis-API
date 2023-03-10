import { User } from "../../entities/User";
import { IUsersACLRepository, UserACLRequest } from "../../repositories/UsersACLRepository";

export class CreateUserAccessControlListService{
    constructor(
        private usersACLRepository: IUsersACLRepository
    ){}

    public async execute(props: UserACLRequest){
        const user = await this.usersACLRepository.create(props);
        return user;
    }
}