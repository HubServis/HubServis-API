import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Business } from "./Business";
import Appointment from "./Appointment";
import Category from "./Category";
import Rating from "./Rating";

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

export default Service;
