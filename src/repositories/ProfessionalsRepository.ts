import { Professional } from "../entities/Professional";

export interface IProfessionalsRepository {
  add(props: Professional, userId: string): Promise<Error | Professional>;
  findAll(): Promise<Error | Professional[]>;
}
