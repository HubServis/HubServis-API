import { compare, hash } from "bcrypt";
import Database from "../config";
import { sign } from "jsonwebtoken";
import { User } from "../../../../entities/User";
import { User as UserSchema } from "../models/User";
import {
  ISessionRepository,
  UserRequest,
} from "../../../../repositories/SessionRepository";
import { Token } from "../../../../utils/token";

export class SessionRepositorySqlite implements ISessionRepository {
  public async handle(props: UserRequest): Promise<Error | any> {
    const { username, password } = props;
    const repo = await (await Database).getRepository(UserSchema);

    const user = await repo.findOne({
      where: {
        username,
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

    return { token };
  }
}
