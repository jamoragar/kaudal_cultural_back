import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//Entidades
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
