import { Extra } from "../../../../entities/Extra";
import { IExtraRepository } from "../../../../repositories/ExtraRepository";
import { Extra as ExtraSchema } from "../models/Extra";
import Database from "../config";

export class ExtraRepositorySqlite implements IExtraRepository{
    public async create(props: Extra): Promise<string | Extra | Error> {
        return new Error("Boa!");
    }
}