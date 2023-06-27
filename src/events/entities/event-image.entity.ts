import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class EventImage {
  @PrimaryColumn()
  id: number;

  @Column('varchar')
  url: string;

  @ManyToOne(() => Event, (event) => event.Imagenes)
  event: Event;
}
