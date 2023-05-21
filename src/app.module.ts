import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm'
//Entidades
import { Client } from './clients/client.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qwerty',
    database: 'kaudal',
    entities: [Client],
    synchronize: true
  }), EventModule, ClientsModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
