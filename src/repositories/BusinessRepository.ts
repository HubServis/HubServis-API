import { Business } from "../entities/Business";

export interface IBusinessRepository{
    create(props: Business):Promise<Business>;
    find(): Promise<Business[]>;
}