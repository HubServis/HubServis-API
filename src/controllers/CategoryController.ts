import { Response, Request } from "express";
import { ICategoryController } from "../interfaces/controllers";
import { CategoryRepositorySqlite } from "../infra/database/sqlite/implementations/CategoryRepository";
import { CreateCategoryService } from "../services/Category/CreateCategory";
import { FindCategoryService } from "../services/Category/FindCategory";
import { AppendCategoryServiceService } from "../services/Category/AppendCategoryService";
import { DeleteCategoryService } from "../services/Category/DeleteCategory";
import { ListServicesCategoryService } from "../services/Category/ListServicesCategory";
import { CustomError } from "../interfaces/errors";

const createAppointmentService = new CreateCategoryService(
  new CategoryRepositorySqlite()
);

const findCategoryService = new FindCategoryService(
  new CategoryRepositorySqlite()
);

const appendCategoryServiceService = new AppendCategoryServiceService(
  new CategoryRepositorySqlite()
);

const deleteCategoryService = new DeleteCategoryService(
  new CategoryRepositorySqlite()
);

const listServicesCategoryService = new ListServicesCategoryService(
  new CategoryRepositorySqlite()
);

class CategoryController implements ICategoryController {
	async create(req: Request, res: Response) {
		const { name, description } = req.body;
		const userId = req.userReq.id;

		try {
			const result = await createAppointmentService.execute({
				name,
				description,
				userId,
			});

			if (result instanceof Error) {
				return res.status(400).json(result.message);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async find(req: Request, res: Response) {
		const { showPrivateOnly, showAll } = req.query;

		try {
			const result = await findCategoryService.execute({
				showPrivateOnly,
				showAll,
			});

			if (result instanceof Error) {
				return res.status(400).json(result.message);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async appendService(req: Request, res: Response) {
		const { service, categories } = req.body;

		try {
			const result = await appendCategoryServiceService.execute({
				service,
				categories,
			});

			if (result instanceof Error) {
				return res.status(400).json(result.message);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async delete(req: Request, res: Response) {
		const { categoryId } = req.params;
		const { id } = req.userReq;

		try {
			const result = await deleteCategoryService.execute({
				category: categoryId,
				userId: id,
			});

			if (result instanceof Error) {
				return res.status(400).json(result.message);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json("Unexpected error");
		}
	}

	async listServicesCategory(req: Request, res: Response) {
    const { categoryNameId } = req.query;

    if(!categoryNameId) return res.status(400).json("categoryNameId not informed!");

		try {
      const result = await listServicesCategoryService.execute({
        categoryNameId,
      });

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      if (result instanceof CustomError && result.type == "error") {
        return res.status(result.statusCode).json(result.message);
			}

      return res.status(201).json(result);
		} catch (err) {
      console.log(err.message);
			return res.status(500).json("Unexpected error");
    }
	}
}

export default new CategoryController();
