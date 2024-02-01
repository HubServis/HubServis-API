import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("extras")
export class Extra extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  value: number;

  @Column({ default: true })
  isControllable: boolean;

  @Column({ default: "" })
  role: string;

  @ManyToOne(() => User, (user) => user.extras)
  user: User;
}
