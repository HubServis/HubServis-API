import {
  Column,
  // ManyToMany,
  // JoinTable,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";

// import Role from "./Role";
// import Permission from "./Permission";
import { BaseEntity } from "./BaseEntity";
import Business from "./Business";
import { Professional } from "./Professional";
import { Plan } from "./Plan";

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

  // @ManyToMany(() => Role)
  // @JoinTable({
  //   name: "users_roles", //nome tabela pivo
  //   joinColumns: [{ name: "user_id" }],
  //   inverseJoinColumns: [{ name: "role_id" }],
  // })
  // roles: Role[];
  //
  // @ManyToMany(() => Permission)
  // @JoinTable({
  //   name: "users_permissions", //nome tabela pivo
  //   joinColumns: [{ name: "user_id" }],
  //   inverseJoinColumns: [{ name: "permission_id" }],
  // })
  // permissions: Permission[];

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;

  @OneToOne(() => Professional)
  @JoinColumn()
  professional: Professional;

  @OneToOne(() => Plan)
  @JoinColumn()
  plan: Plan;
}
