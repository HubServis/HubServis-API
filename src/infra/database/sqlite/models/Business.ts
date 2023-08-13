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

@Entity("business")
export class Business extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.business)
  appointments: Appointment[]

  @OneToOne(() => User, (user) => user.business)
  user: User;

  @OneToMany(() => Service, (service) => service.business, {
    cascade: true,
  })
  services: Service[];

  @OneToMany(() => Professional, (professional) => professional.business)
  professionals: Professional[];
}

export default Business;
