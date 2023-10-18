import { Business } from "../../entities/Business";
import { IBusinessRepository } from "../../repositories/BusinessRepository";

export class CreateBusinessService {
  constructor(private businessRepository: IBusinessRepository) {}

  // Pode fazer assim também
  // private usersRepository: IUsersRepository;
  // constructor(usersRepository: IUsersRepository){
  //     this.usersRepository = usersRepository;
  // }

  public async execute(props: Business, userId: string) {
    const business = await this.businessRepository.create(props, userId);
    return business;
  }
}
