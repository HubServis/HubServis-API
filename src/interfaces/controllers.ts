import {Response, Request} from 'express';

export interface IUserCotroller{
    create(req: Request, res: Response):Promise<Response>;
    find(req: Request, res: Response):Promise<Response>;
}