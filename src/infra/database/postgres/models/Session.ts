import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("sessions")
export class Session extends BaseEntity {
  @Column()
  email: string;

  @Column()
  userId: string;

  @Column()
  expiresAt: number;
}

export default Session;
