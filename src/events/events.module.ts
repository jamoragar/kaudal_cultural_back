import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventImage } from './entities/event-image.entity';
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([Event, EventImage]),
    DbValidatorsModule.register({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwerty',
      database: 'kaudal',
    }),
  ],
})
export class EventsModule {}
