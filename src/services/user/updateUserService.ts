import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/UsersRepository";

export class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(props: {
    userId: string;
    formData: any;
  }): Promise<User | Error> {
    try {
      const result = await this.usersRepository.updateUser(props);

	  return result
    } catch (err) {
      return new Error("We had an error when updating. Reason: ", err);
    }
  }
}
