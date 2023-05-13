import { Service } from "../entities/Service";

export interface IServicesRepository{
    create(props: Service, userId: string):Promise<Error | Service>;
}