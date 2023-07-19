import { Column, Entity } from "typeorm";

import { BaseEntity } from "./BaseEntity";

@Entity("Benefit")
export class Benefit extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  max_value: number;

  @Column({ default: true })
  isControllable: boolean;

  @Column({ default: "" })
  role: string;
}
