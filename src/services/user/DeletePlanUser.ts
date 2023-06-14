import { IUsersRepository } from "../../repositories/UsersRepository";

export class DeletePlanUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(props: { userId: string }): Promise<string | Error> {
    const result = await this.usersRepository.deletePlan(props);

    return result;
  }
}
