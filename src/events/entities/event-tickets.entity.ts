import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
import { EventDates } from './event-dates.entity';

@Entity()
export class EventTickets {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  TipoTicket: string;

  @Column('int')
  PrecioTicket: number;

  @Column('int')
  CantidadTicketTipo: number;

  @ManyToOne(() => EventDates, (eventDates) => eventDates.Tickets, {
    onDelete: 'CASCADE',
  })
  dates: EventDates;
}
