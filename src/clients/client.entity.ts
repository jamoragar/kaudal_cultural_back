import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  lastNames: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cellPhone: string;

  @Column()
  numberOfTickets: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
