import { IBlockingRepository } from "../../../../repositories/BlockingRepository";

export class BlockingRepositorySqlite implements IBlockingRepository {
    public async create(): Promise<string | Error> {
        return "Sla";
    }   
}