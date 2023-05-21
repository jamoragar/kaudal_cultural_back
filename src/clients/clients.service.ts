import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { createClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private clientRepository: Repository<Client>, private mailSvc: MailService) {}
    
    createClient(client: createClientDto){
        const newClient = this.clientRepository.create(client);
        this.mailSvc.sendMail(client.email, client.numberOfTickets);
        return this.clientRepository.save(newClient);
    }

    getClients() {
        return this.clientRepository.find();
    }
}
