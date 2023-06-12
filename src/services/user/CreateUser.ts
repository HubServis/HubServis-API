import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/UsersRepository";

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  // Pode fazer assim também
  // private usersRepository: IUsersRepository;
  // constructor(usersRepository: IUsersRepository){
  //     this.usersRepository = usersRepository;
  // }

  public async execute(props: User) {
    const user = await this.usersRepository.create(props);
    return user;
  }
}
