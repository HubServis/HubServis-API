export interface IBlockingRepository {
	create(): Promise<Error | string>;
	// find(props: string): Promise<Error | Espedient[]>;
	// patch(
	// 	props: IUpdateEspedient
	// ): Promise<Error | Espedient | CustomError | string>;
}
