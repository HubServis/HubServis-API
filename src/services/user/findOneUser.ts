import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/UsersRepository";

export class FindOneUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(props: {userId: string}): Promise<Error | User> {
    const user = await this.usersRepository.findOneUser(props);
    return user;
  }
}
