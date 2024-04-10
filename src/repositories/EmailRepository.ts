// import Blocking from "../infra/database/postgres/models/Blocking";

// export interface ICreateBlocking {
// 	DateTimeStart: string;
// 	DateTimeEnd: string;
// 	description: string;
// 	allDay: boolean;
// 	allProfessionals: boolean;
// 	professional?: string;
// 	businessId: string;
// }

export interface IEmailRepository {
  resetPassword(): Promise<Error | string>;
  // create(props: ICreateBlocking): Promise<Error | string>;
  // find(): Promise<Blocking[] | Error>;
}
