import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Business } from "./Business";
import Appointment from "./Appointment";
import Category from "./Category";
import Rating from "./Rating";

@Entity("services")
export class Service extends BaseEntity {
	@Column()
	name: string;

	@Column()
	price: string;

	@Column()
	duration: string;

	@Column()
	description: string;

	@Column({ default: false })
	isPrivated: boolean;

	@Column("decimal", { default: 0 })
	averageRating: number; // avaliação média do serviço

	@Column({ default: 0 })
	totalRatings: number; // total de avaliações feitas para esse serviço

	@Column("decimal", { default: 0 })
	totalValueRating: number; // valor total das avaliações somadas

	@OneToMany(() => Appointment, (appointment) => appointment.service)
	appointments: Appointment[];

	@ManyToOne(() => Business, (business) => business.services, {
		onDelete: "CASCADE",
	})
	business: Business;

	@ManyToMany(() => Category, (category) => category.services)
	categories: Category[];

	@OneToMany(() => Rating, (rating) => rating.service)
	@JoinColumn()
	ratings: Rating[];
}
