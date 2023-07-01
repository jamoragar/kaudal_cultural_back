import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventTickets } from './event-tickets.entity';
import { Event } from './event.entity';

@Entity()
export class EventDates {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('datetime')
  StartDate: string;

  @Column('datetime')
  EndDate: string;

  @ManyToOne(() => Event, (event) => event.Dates, { onDelete: 'CASCADE' })
  event: Event;

  @OneToMany(() => EventTickets, (eventTickets) => eventTickets.dates, {
    cascade: true,
    eager: true,
  })
  Tickets: EventTickets[];
}
