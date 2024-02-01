import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import Service from "./Service";
import { Professional } from "./Professional";
import Appointment from "./Appointment";
import Category from "./Category";
import { Expedient } from "./Espedient";
import Blocking from "./Blocking";

@Entity("business")
export class Business extends BaseEntity {
	@Column()
	name: string;

	@OneToMany(() => Appointment, (appointment) => appointment.business)
	appointments: Appointment[];

	@OneToMany(() => Category, (category) => category.business)
	categories: Category[];

	@OneToOne(() => User, (user) => user.business)
	user: User;

	@OneToMany(() => Service, (service) => service.business, {
		cascade: true,
	})
	services: Service[];

	@OneToMany(() => Professional, (professional) => professional.business)
	professionals: Professional[];

	@OneToMany(() => Expedient, (expedient) => expedient.business)
	expediencys: Expedient[];

	@OneToMany(() => Blocking, (blocking) => blocking.business)
	blockings: Blocking[];
}

export default Business;
