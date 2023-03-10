import {Response, Request} from 'express';

export interface IUserCotroller{
    create(req: Request, res: Response):Promise<Response>;
    find(req: Request, res: Response):Promise<Response>;
}

export interface IUserACLCotroller{
    create(req: Request, res: Response):Promise<Response>;
}

export interface IProductCotroller{
    create(req: Request, res: Response):Promise<Response>;
    find(req: Request, res: Response):Promise<Response>;
}

export interface IRoleCotroller{
    create(req: Request, res: Response):Promise<Response>;
}

export interface IPermissionController{
    create(req: Request, res: Response):Promise<Response>;
}