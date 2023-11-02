import {
  Column,
  Entity,
  ManyToOne
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { v4 as uuid } from "uuid";
import Business from "./Business";

@Entity("expediencys")
export class Expedient extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	expediencysInfos: string;

	@ManyToOne(() => Business, (business) => business.expediencys)
	business: Business;

	// fazer relacionamento com professionals
}

export default Expedient;