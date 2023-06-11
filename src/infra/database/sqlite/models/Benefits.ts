import { Column, Entity } from "typeorm";

import { BaseEntity } from "./BaseEntity";

@Entity("Benefits")
export class Benefit extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  max_value: number;
}
