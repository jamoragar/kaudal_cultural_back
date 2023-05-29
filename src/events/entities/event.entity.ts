import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  title: string;
}
