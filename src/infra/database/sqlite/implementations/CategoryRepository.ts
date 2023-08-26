import { User as UserSchema } from "../models/User";
import { Permission as PermissionSchema } from "../models/Permission";
import { Business as BusinessSchema } from "../models/Business";
import Database from "../config";
import {
  ICategoryRepository,
  ICreateCategory,
} from "../../../../repositories/CategoryRepository";
import { Category as CategorySchema } from "../models/Category";
import { Category } from "../../../../entities/Category";

export class CategoryRepositorySqlite implements ICategoryRepository {
  public async create(props: ICreateCategory): Promise<Category | Error> {
    const { userId, name, description } = props;

    // A LOGICA ABAIXO FOI CRIADA USANDO COMO BASE O SEGUINTE CASO DE USO: O USUÁRIO É DONO DE UM NEGÓCIO MAS NÃO É ADMIN

    const userRepository = (await Database).getRepository(UserSchema);
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["business"],
    });

    if (!user.business) {
      return new Error(
        "The user does not contain a company and is not an admin!"
      );
    }

    const newCategory = new Category({
      name,
      description,
      isPrivated: true, //privado se for criada por algum dono de negócio
    });

    const categoryRepository = (await Database).getRepository(CategorySchema);
    const category = await categoryRepository.save(
      {
        ...newCategory,
        business: user.business,
        owner: user,
      }
    );

    return category;
  }

  public async find(): Promise<Category[] | Error> {
    const categoryRepository = (await Database).getRepository(CategorySchema);
    const categories = await categoryRepository.find({});

    return categories;
  }
}
