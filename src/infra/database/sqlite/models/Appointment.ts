import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import Service from "./Service";
import { Professional } from "./Professional";
import Business from "./Business";

@Entity("appointments")
export class Appointment extends BaseEntity {
  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Business, (business) => business.appointments)
  business: Business;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @ManyToOne(() => Professional, (professional) => professional.appointments)
  professional: Professional;
}

export default Appointment;