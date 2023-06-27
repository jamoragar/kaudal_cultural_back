import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventImage } from './event-image.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  EventName: string;

  @Column('varchar')
  Sumary: string;

  @Column('varchar')
  Address: string;

  @Column('varchar')
  Categories: string[];

  @Column('varchar')
  City: string;

  @Column('json')
  Codes: Array<object>;

  @Column('varchar')
  Description: string;

  @Column('datetime')
  EndDate: string;

  //Queda pendiente la creacion de la imagen, ya que se debe relacionar a otra tabla...
  @OneToMany(() => EventImage, (eventImage) => eventImage.event, {
    cascade: true,
  })
  Imagenes?: EventImage[];

  @Column('varchar')
  Region: string;

  @Column('datetime')
  StartDate: string;

  @Column('json')
  Tickets: Array<object>;

  @Column('boolean', { default: true })
  active;
}
