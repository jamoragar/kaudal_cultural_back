import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { EventImage } from './entities/event-image.entity';

@Injectable()
export class EventsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventImage)
    private readonly eventImageRepository: Repository<EventImage>,
    private readonly dataSource: DataSource,
  ) {}

  async create(event: CreateEventDto) {
    const { Imagenes = [], ...eventDetails } = event;
    const newEvent = this.eventRepository.create({
      ...eventDetails,
      Imagenes: Imagenes.map((imagen) =>
        this.eventImageRepository.create({ url: imagen }),
      ),
    });
    await this.eventRepository.save(newEvent);
    return { ...newEvent, Imagenes };
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.eventRepository.find({
      take: limit,
      skip: offset,
      relations: {
        Imagenes: true,
      },
    });
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event)
      throw new NotFoundException(`Evento con el id ${id} no encontrado.`);
    return event;
  }

  async findOnePlain(term: string) {
    const { Imagenes = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: Imagenes.map((imagen) => imagen.url),
    };
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const { Imagenes, ...toUpdate } = updateEventDto;

    const event = await this.eventRepository.preload({
      id,
      ...toUpdate,
    });

    if (!event) throw new NotFoundException(`Event with id ${id} not found.`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (Imagenes) {
        await queryRunner.manager.delete(EventImage, { event: { id } });
        event.Imagenes = Imagenes.map((imagen) =>
          this.eventImageRepository.create({ url: imagen }),
        );
      }

      await queryRunner.manager.save(event);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    return await this.eventRepository.remove(event);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
