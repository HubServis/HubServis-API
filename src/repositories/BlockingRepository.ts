import Blocking from "../infra/database/sqlite/models/Blocking";

export interface ICreateBlocking {
	DateTimeStart: string;
	DateTimeEnd: string;
	description: string;
	allDay: boolean;
	allProfessionals: boolean;
	professional?: string;
	businessId: string;
}

export interface IBlockingRepository {
	create(props: ICreateBlocking): Promise<Error | string>;
	find(): Promise<Blocking[] | Error>;
	// patch(
	// 	props: IUpdateEspedient
	// ): Promise<Error | Espedient | CustomError | string>;
}
