import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host: "kaudalcultural.cl",
        port: 465,
        auth: {
          user: "no-reply@kaudalcultural.cl",
          pass: "L8x!VSY+EXth"
        }
      }
    })
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
