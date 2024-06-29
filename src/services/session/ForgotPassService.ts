// Implementar service de session
import { User } from "../../entities/User";
import {
  IForgotPassword,
  ISessionRepository,
} from "../../repositories/SessionRepository";

export class ForgotPasswordService {
  constructor(private sessionRepository: ISessionRepository) {}

  public async execute(props: IForgotPassword): Promise<any> {
    const result = await this.sessionRepository.forgotPassword(props);
    return result;
  }
}
