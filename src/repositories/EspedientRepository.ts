import { Espedient } from "../entities/Espedient";
import { CustomError } from "../interfaces/errors";

export interface ICreateExpedient {
	userId: string;
	name: string;
	description: string;
	expediencysInfos: [];
}

export interface IUpdateEspedient {
	userId: string;
	name: string;
	description: string;
	expediencysInfos: [];
	espedientId: string;
}

export interface IExpediencysRepository {
	create(props: ICreateExpedient): Promise<Error | string>;
	find(props: string): Promise<Error | Espedient[]>;
	patch(props: IUpdateEspedient): Promise<Error | Espedient | CustomError | string>;
}