import { IUsersRepository } from "../../repositories/UsersRepository";

export class GetUserPermissions {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(props): Promise<boolean | Error> {
    const result = await this.usersRepository.getUserPermissions(props);

    return result;
  }
}
