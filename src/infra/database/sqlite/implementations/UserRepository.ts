import { hash } from "bcrypt";
import Database from "../config";
import { User } from "../../../../entities/User";
import { User as UserSchema } from "../models/User";
import { Plan as PlanSchema } from "../models/Plan";
import {
  IUsersRepository,
  ResRegisterUser,
} from "../../../../repositories/UsersRepository";
import { sign } from "jsonwebtoken";

export class UserRepositorySqlite implements IUsersRepository {
  public async create(props: User): Promise<Error | ResRegisterUser> {
    const { id, username, email, password, name, cpfcnpj, plan } = props;

    const existUser = (await Database).getRepository(UserSchema);
    const isExistUser = await existUser.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    const isExistCpfCnpjUser = await existUser.findOne({
      where: {
        cpfcnpj: cpfcnpj,
      },
    });

    if (isExistUser) {
      return new Error("User already exists");
    }

    if (isExistCpfCnpjUser) {
      return new Error("Cpf or cnpj already exists");
    }

    const passwordHash = await hash(password, 8);

    const userRepository = (await Database).getRepository(UserSchema);
    const user = await userRepository.save({
      id,
      username: username.toLowerCase(),
      email,
      name,
      cpfcnpj,
      password: passwordHash,
      plan: plan,
    });

    const token = sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: "4h",
    });

    return { user: user, token: token };
  }

  public async find(): Promise<User[]> {
    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.find({
      select: {
        id: true,
        cpfcnpj: true,
        name: true,
        email: true,
        username: true,
        created_at: true,
      },
      relations: {
        plan: { benefits: true },
      },
    });

    return user;
  }

  public async appendPlan(props: {
    planName: string;
    userId: string;
  }): Promise<string | Error> {
    const { planName, userId } = props;

    const userRepository = (await Database).getRepository(UserSchema);

    const planRepository = (await Database).getRepository(PlanSchema);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) return new Error("This User not Exists!");

    const plan = await planRepository.findOne({
      where: { name: planName },
    });

    if (!plan) return new Error("This Plan not Exists!");

    user.plan = plan;

    await userRepository.save(user);

    return `The Plan ${plan.name} Has Been Assigned to user ${user.name}.`;
  }

  public async deletePlan(props: { userId: string }): Promise<string | Error> {
    const { userId } = props;

    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { plan: true },
    });

    if (!user) return new Error("This User not Exists!");

    if (user.plan === null)
      return new Error("The User is Already Out of Plan!");

    user.plan = null;

    await userRepository.save(user);

    return `The Plan Has Been Deleted from user ${user.name}`;
  }
}
