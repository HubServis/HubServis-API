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
import fs from "fs";
import { File } from "buffer";
import { upload } from "../../../aws";
import { config } from "dotenv";
import { log } from "console";

export class UserRepositoryPostgres implements IUsersRepository {
  public async create(props: User): Promise<Error | ResRegisterUser> {
    const { id, username, email, password, name, cpfcnpj, plan, image } = props;

    const userRepository = (await Database).getRepository(UserSchema);
    const planRepository = (await Database).getRepository(PlanSchema);

    const userExists = await userRepository.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (userExists) return new Error("User already exists");

    const userCpfCnfpExists = await userRepository.findOne({
      where: {
        cpfcnpj: cpfcnpj,
      },
    });

    if (userCpfCnfpExists) return new Error("Cpf or cnpj already exists");

    const defaultPlan = await planRepository.findOne({
      where: {
        name: "Default Plan",
      },
    });

    const passwordHash = await hash(password, 8);

    const user = await userRepository.save({
      id,
      username: username.toLowerCase(),
      email,
      name,
      cpfcnpj,
      password: passwordHash,
      plan: plan,
      image: null,
    });

    return { user: user };
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
        image: true,
      },
      relations: {
        plan: { benefits: true },
      },
    });

    return user;
  }

  public async findOneUser(props: { userId: string }): Promise<Error | User> {
    const { userId } = props;
    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        cpfcnpj: true,
        name: true,
        email: true,
        username: true,
        created_at: true,
      },
      relations: {
        plan: { benefits: true, limits: true },
        extras: true,
      },
    });

    if (!user) return new Error("User not found!");

    return user;
  }

  public async updateUser(props: {
    userId: string;
    formData: any;
  }): Promise<Error | User> {
    const { userId } = props;
    const userRepository = (await Database).getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        cpfcnpj: true,
        name: true,
        email: true,
        username: true,
        created_at: true,
        image: true,
      },
      relations: {
        plan: { benefits: true, limits: true },
        extras: true,
      },
    });

    if (!user) return new Error("User not found!");

    let newImageName = props.formData?.image?.name;

    if (newImageName) {
      try {
        const imageBuffer = Buffer.from(props.formData.image.content, "base64");

        const response = await upload(
          newImageName,
          props.formData?.image?.content,
          props.formData.image?.format,
        );
      } catch (err) {
        return new Error(`There had an error saving this image: ${err}`);
      }
    }

    //Dotenv
    config();

    user.name = (!!props.formData.name && props.formData.name) || user.name;
    user.email = (!!props.formData.email && props.formData.email) || user.email;
    user.cpfcnpj =
      (!!props.formData.cpfcnpj && props.formData.cpfcnpj) || user.cpfcnpj;
    user.username =
      (!!props.formData.username && props.formData.username) || user.username;
    user.password =
      (!!props.formData.password && props.formData.password) || user.password;
    user.plan = (!!props.formData.plan && props.formData.plan) || user.plan;
    user.image =
      (!!props.formData.image &&
        `${process.env.S3_URL}/${props.formData.image.name}`) ||
      user.image;

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

  public async getUserPermissions(props: {
    userId: string;
    requestedPermissions: string[];
  }): Promise<boolean | Error> {
    const userRepository = (await Database).getRepository(UserSchema);

    const userAccess = await userRepository.findOne({
      where: { id: props.userId },
      relations: {
        plan: {
          benefits: true,
        },
      },
    });

	console.log('userAccess on UserRepositoryPostgres (240)', userAccess)

	if(props.requestedPermissions?.length === 0) return true;

	console.log('not have permissions (244)');

    if (!userAccess || userAccess === null || !userAccess.plan) return false;

	console.log('this user have access?', userAccess);

    const planPermission = props.requestedPermissions.some(
      (permission) => permission === userAccess.plan.name,
    );

	console.log('this user have plan? and is permit access? (254)', planPermission);

    if (planPermission) return true;

    const hasPermission = props.requestedPermissions.some((permission) => {
      let valid = 0;

      userAccess.plan.benefits.forEach(
        (benefit) => benefit.role === permission && valid++,
      );

      return valid > 0 ? true : false;
    });

	console.log('this user have permission with the permissions requested? (268)', hasPermission)

    if (!hasPermission) return false;

    return true;
  }
}
