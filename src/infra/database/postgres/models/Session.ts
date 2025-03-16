import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  userId: string;

  @Column({ type: "bigint" })
  expiresAt: number;
}

export default Session;
