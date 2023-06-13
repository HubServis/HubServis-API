import { Column, Entity, ManyToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Plan } from "./Plan";

@Entity("Benefit")
export class Benefit extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  max_value: number;
}
