import { User as UserSchema } from "../models/User";
import { Service as ServiceSchema } from "../models/Service";
import Database from "../config";
import {
	IAppendCategoryService,
	ICategoryRepository,
	ICreateCategory,
	IDeleteCategory,
	IFindCategory,
  IListServicesCategory,
} from "../../../../repositories/CategoryRepository";
import { Category as CategorySchema } from "../models/Category";
import { Category } from "../../../../entities/Category";
import { In } from "typeorm";
import { Service } from "../../../../entities/Service";
import { formatStringForFieldLoweCase } from "../../../../utils/stringParse";
import { CustomError, IObjectCustomError } from "../../../../interfaces/errors";

export class CategoryRepositoryPostgres implements ICategoryRepository {
	public async create(props: ICreateCategory): Promise<Category | Error> {
		const { userId, name, description } = props;

		// A LOGICA ABAIXO FOI CRIADA USANDO COMO BASE O SEGUINTE CASO DE USO: O USUÁRIO É DONO DE UM NEGÓCIO MAS NÃO É ADMIN
		// LOGO AS CATEGORIAS FORAM CRIADAS COMO PRIVADAS

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
			nameId: formatStringForFieldLoweCase(name),
		});

		const categoryRepository = (await Database).getRepository(CategorySchema);

		const categoryExistis = await categoryRepository.find({
			where: {
				nameId: formatStringForFieldLoweCase(name),
			},
		});

		if (categoryExistis) return new Error("This category exists!");

		const category = await categoryRepository.save({
			...newCategory,
			business: user.business,
			owner: user,
		});

		return category;
	}

	public async find(props: IFindCategory): Promise<Category[] | Error> {
		const { showAll, showPrivateOnly } = props;

		if (showPrivateOnly) {
			const categoryRepository = (await Database).getRepository(CategorySchema);
			const categories = await categoryRepository.find({
				where: {
					isPrivated: true,
				},
			});

			return categories;
		}

		if (showAll) {
			const categoryRepository = (await Database).getRepository(CategorySchema);
			const categories = await categoryRepository.find({});

			return categories;
		}

		const categoryRepository = (await Database).getRepository(CategorySchema);
		const categories = await categoryRepository.find({
			where: {
				isPrivated: false,
			},
		});

		return categories;
	}

	public async appendService(
		props: IAppendCategoryService
	): Promise<Service | Error> {
		const { categories: categoriesId, service: serviceId } = props;

		const categoryRepository = (await Database).getRepository(CategorySchema);
		const categorysExists = await categoryRepository.findBy({
			id: In(categoriesId),
		});

		if (categorysExists.length == 0) {
			return new Error("Categories not found!");
		}

		const serviceRepository = (await Database).getRepository(ServiceSchema);
		const service = await serviceRepository.findOne({
			where: {
				id: serviceId,
			},
			relations: ["categories"],
		});

		if (!service) {
			return new Error("Service not found!");
		}

		service.categories = categorysExists.filter(
			(category) => !service.categories.includes(category)
		);

		await serviceRepository.save(service);

		return service;
	}

	public async delete(props: IDeleteCategory): Promise<string | Error> {
		const { category: categoryId, userId } = props;
		const categoryRepository = (await Database).getRepository(CategorySchema);
		const category = await categoryRepository.findOne({
			where: {
				id: categoryId,
			},
		});

		if (!category) return new Error("This Category not Exists");

		await categoryRepository.remove(category);

		return `Category with name ${category.name} removed!`;
	}

	public async listServicesCategory(
		props: IListServicesCategory
	): Promise<Error | Service[] | CustomError> {
    const { categoryNameId } = props;

		const categoryRepository = (await Database).getRepository(CategorySchema);
		const categoryExists = await categoryRepository.findBy({
			nameId: categoryNameId,
		});

		if (categoryExists.length == 0)
			return new CustomError({
				type: "error",
				message: "This category not exists!",
				statusCode: 404,
			});

    const serviceRepository = (await Database).getRepository(ServiceSchema);
    const servicesByCategory = await serviceRepository
      .createQueryBuilder("service")
      .leftJoinAndSelect("service.categories", "category")
      .where("category.nameId = :categoryNameId", { categoryNameId })
      .getMany();


		if (!servicesByCategory || servicesByCategory.length == 0)
			return new CustomError({
				type: "error",
				message: "Services with this category not found!",
				statusCode: 404,
			});

		return servicesByCategory;
	}
}
