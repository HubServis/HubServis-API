import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Business } from "./Business";
import Appointment from "./Appointment";

@Entity("service")
export class Service extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  duration: string;

  @Column()
  description: string;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[]

  @ManyToOne(() => Business, (business) => business.services, {
    onDelete: "CASCADE",
  })
  business: Business;
}

export default Service;
