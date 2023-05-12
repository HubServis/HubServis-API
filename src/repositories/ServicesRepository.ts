import { Service } from "../entities/Service";

export interface IServiceRepository{
    create(props: Service):Promise<Error | any>;
}