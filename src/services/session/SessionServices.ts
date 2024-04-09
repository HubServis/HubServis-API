// Implementar service de session
import { User } from "../../entities/User";

import {
  ISessionRepository,
  UserRequest,
} from "../../repositories/SessionRepository";

export class SessionService {
  constructor(private sessionRepository: ISessionRepository) {}

  public async create(props: UserRequest): Promise<User[]> {
    const userId = await this.sessionRepository.createSession(props);

    return userId;
  }

  public async hasToken(user: string): Promise<any> {
    const hasToken = await this.sessionRepository.hasToken(user);

    return hasToken;
  }

  public async remove(user: string): Promise<boolean | Error> {
    const isRemoved = await this.sessionRepository.removeSession(user);

    return isRemoved;
  }
}
