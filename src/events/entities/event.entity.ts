import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventImage } from './event-image.entity';
import { EventDates } from './event-dates.entity';

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

  @Column('json')
  Categories: Array<string>;

  @Column('varchar')
  City: string;

  @Column('json')
  Codes: Array<object>;

  @Column('varchar')
  Description: string;

  //Queda pendiente la creacion de la imagen, ya que se debe relacionar a otra tabla...
  @OneToMany(() => EventImage, (eventImage) => eventImage.event, {
    cascade: true,
    eager: true,
  })
  Imagenes?: EventImage[];

  @OneToMany(() => EventDates, (eventDate) => eventDate.event, {
    cascade: true,
    eager: true,
  })
  Dates: EventDates[];

  @Column('varchar')
  Region: string;

  @Column('boolean', { default: true })
  active;

  @Column('varchar', { unique: true })
  slug: string;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.EventName;
    }
    this.slug = this.slug.toLowerCase().replaceAll(' ', '_');
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    if (this.EventName) {
      this.slug = this.EventName;
    }
    this.slug = this.slug.toLowerCase().replaceAll(' ', '_');
  }
}
