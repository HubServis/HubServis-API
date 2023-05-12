import { Response, Request } from "express";


const createServiceService = new CreateServiceService(
new ServiceRepositorySqlite()
);
const findServiceService = new FindServiceService(
    new ServiceRepositorySqlite()
);

class ServiceController implements IServiceCotroller {
    async create(req: Request, res: Response) { }

    async find(req: Request, res: Response) { }
}

export default new ServiceController();