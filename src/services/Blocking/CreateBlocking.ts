import { IBlockingRepository } from "../../repositories/BlockingRepository";

export class CreateBlockingService {
	constructor(private benefitsRepository: IBlockingRepository) {}

	public async execute() {
		const blocking = await this.benefitsRepository.create();

		return blocking;
	}
}