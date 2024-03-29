import { Response, Request } from "express";

export interface IUserCotroller {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  findOneUser(req: Request, res: Response): Promise<Response>;
  appendPlan(req: Request, res: Response): Promise<Response>;
  deletePlan(req: Request, res: Response): Promise<Response>;
}

export interface IUserACLCotroller {
  create(req: Request, res: Response): Promise<Response>;
}

export interface IProductCotroller {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
}

export interface IRoleCotroller {
  create(req: Request, res: Response): Promise<Response>;
  createRolePermission(req: Request, res: Response): Promise<Response>;
}

export interface IPermissionController {
  create(req: Request, res: Response): Promise<Response>;
}

export interface IBusinessCotroller {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
}

export interface IServiceCotroller {
	create(req: Request, res: Response): Promise<Response>;
	find(req: Request, res: Response): Promise<Response>;
	findOne(req: Request, res: Response): Promise<Response>;
	delete(req: Request, res: Response): Promise<Response>;
	findServicesHighlight(req: Request, res: Response): Promise<Response>;
}

export interface IProfessionalCotroller {
  addToBusiness(req: Request, res: Response): Promise<Response>;
  findProfessionals(req: Request, res: Response): Promise<Response>;
}

export interface IPlansController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;

  appendBenefit(req: Request, res: Response): Promise<Response>;
  deleteBenefit(req: Request, res: Response): Promise<Response>;
  
  appendLimit(req: Request, res: Response): Promise<Response>;
  deleteLimit(req: Request, res: Response): Promise<Response>;
}

export interface IBenefitsController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
}

export interface ILimitsController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
}

export interface IExtrasController {
  create(req: Request, res: Response): Promise<Response>;
  // find(req: Request, res: Response): Promise<Response>;
  // delete(req: Request, res: Response): Promise<Response>;
  // patch(req: Request, res: Response): Promise<Response>;
}

export interface IAppointmentController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
  // delete(req: Request, res: Response): Promise<Response>;
}

export interface ICategoryController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  appendService(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  // patch(req: Request, res: Response): Promise<Response>;
}

export interface IRatingController {
  create(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
}