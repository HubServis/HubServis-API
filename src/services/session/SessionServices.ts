// Implementar service de session
import { User } from "../../entities/User";
import {
  ISessionRepository,
  UserRequest,
} from "../../repositories/SessionRepository";

export class SessionService {
  constructor(private sessionRepository: ISessionRepository) {}

  public async execute(props: UserRequest): Promise<User[]> {
    const users = await this.sessionRepository.handle(props);
    return users;
  }
}
