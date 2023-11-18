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
	// find(props: string): Promise<Error | Espedient[]>;
	// patch(
	// 	props: IUpdateEspedient
	// ): Promise<Error | Espedient | CustomError | string>;
}
