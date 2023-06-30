import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class EventImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  url: string;

  @ManyToOne(() => Event, (event) => event.Imagenes, { onDelete: 'CASCADE' })
  event: Event;
}
