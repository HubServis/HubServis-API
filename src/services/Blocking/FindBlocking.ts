import { IBlockingRepository, ICreateBlocking } from "../../repositories/BlockingRepository";

export class FindBlockingService {
	constructor(private blockingRepository: IBlockingRepository) {}

	public async execute() {
		const blockings = await this.blockingRepository.find();

		return blockings;
	}
}