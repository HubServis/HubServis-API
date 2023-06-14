import { IUsersRepository } from "../../repositories/UsersRepository";

export class AppendPlanUserService  {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(props: {
    planName: string;
    userId: string;
  }): Promise<string | Error> {
    const result = await this.usersRepository.appendPlan(props);

    return result;
  }
}
