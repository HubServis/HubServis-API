import { Espedient } from "../entities/Espedient";

export interface ICreateExpedient {
	userId: string;
	name: string;
	description: string;
	expediencysInfos: [];
}

export interface IExpediencysRepository {
	create(props: ICreateExpedient): Promise<Error | string>;
    find(): Promise<Error | Espedient[]>;
}