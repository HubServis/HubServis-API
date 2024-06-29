import { compare } from "bcrypt";
import Database from "../config";
import { User as UserSchema } from "../models/User";
import {
  IForgotPassword,
  ISessionRepository,
  UserRequest,
} from "../../../../repositories/SessionRepository";
import { Token } from "../../../../utils/token";
import {randomBytes} from 'crypto';

export class SessionRepositoryPostgres implements ISessionRepository {
  public async handle(props: UserRequest): Promise<Error | any> {
    const { email, password } = props;

    const repo = (await Database).getRepository(UserSchema);

    const user = await repo.findOne({
      where: { email: email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = new Token().sign(user);

    return { token, userId: user.id };
  }

  public async forgotPassword(props: IForgotPassword): Promise<Error | any> {
    const { email }: IForgotPassword = props;
    const userRepository = (await Database).getRepository(UserSchema);
    const userEmail = await userRepository.findOne({
      where: {
        email: email
      }
    });

    if(!userEmail){
      return new Error("Email provided is not registered in the system");
    }

    const token = randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1); // token expira em 1 hora

    
  }
}
