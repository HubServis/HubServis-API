import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { BaseEntity } from "./BaseEntity";
import Business from "./Business";
import { Professional } from "./Professional";
import { Plan } from "./Plan";
import Appointment from "./Appointment";
import Category from "./Category";
import Rating from "./Rating";
import { Extra } from "./Extra";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  cpfcnpj: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tokenResetPassword: string;

  @Column()
  resetPasswordExpires: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Extra, (extra) => extra.user)
  extras: Extra[];

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    nullable: true,
  })
  appointments: Appointment[];

  @OneToOne(() => Business, { nullable: true })
  @JoinColumn({})
  business: Business;

  @OneToOne(() => Professional, { nullable: true })
  @JoinColumn()
  professional: Professional;

  @OneToOne(() => Plan, { nullable: true })
  @JoinColumn()
  plan: Plan;

  @OneToOne(() => Category, { nullable: true })
  @JoinColumn()
  category: Category;
}
