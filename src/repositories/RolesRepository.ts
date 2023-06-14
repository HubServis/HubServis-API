import { Role } from "../entities/Role";

export interface IRolesRepository {
  create(props: Role): Promise<Error | Role>;
  // find(): Promise<Product[]>;
}
