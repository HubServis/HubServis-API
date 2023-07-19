import { Role } from "../entities/Role";

export interface IPermissionsRepository {
  create(props: Role): Promise<Error | Role>;
  // find(): Promise<Product[]>;
}
