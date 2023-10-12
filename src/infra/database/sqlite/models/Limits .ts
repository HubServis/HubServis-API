import { Column, ManyToMany, Entity, JoinTable } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Benefit } from "./Benefit";

@Entity("Limits")
export class Limits extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  value: number;

  @Column({ default: true })
  isControllable: boolean;
}
