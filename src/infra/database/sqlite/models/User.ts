import {
  Column,
  // ManyToMany,
  // JoinTable,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

// import Role from "./Role";
// import Permission from "./Permission";
import { BaseEntity } from "./BaseEntity";
import Business from "./Business";
import { Professional } from "./Professional";
import { Plan } from "./Plan";
import Appointment from "./Appointment";
import Category from "./Category";
import Rating from "./Rating";
import { Extra } from "./Extra";
import Permission from "./Permission";
import Role from "./Role";

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

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Extra, (extra) => extra.user)
  extras: Extra[];

  @Column({ nullable: true })
  image: string;

  @Column({ type: "simple-array", nullable: true })
  permissions: Permission[];

  @Column({ type: "simple-array", nullable: true })
  roles: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.user, { nullable: true })
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
