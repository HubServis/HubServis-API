import { Response, Request } from "express";

export interface IUserCotroller {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
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
}

export interface IBenefitsController {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
}

export interface IAppointmentController {
  // create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  // delete(req: Request, res: Response): Promise<Response>;
  // patch(req: Request, res: Response): Promise<Response>;
}