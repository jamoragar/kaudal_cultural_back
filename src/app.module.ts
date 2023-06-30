import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//Entidades
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwerty',
      database: 'kaudal',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule,
    MailModule,
    EventsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
