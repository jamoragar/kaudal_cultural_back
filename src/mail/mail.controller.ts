import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { sendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  sendMail(@Body() newEmail: sendMailDto): string {
    return this.mailService.sendMail(newEmail.email, newEmail.numberOfTickets);
  }
}
