import { Body, Controller, Get, Post } from '@nestjs/common';
import { createClientDto } from './dto/create-client.dto';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  getClients(): Promise<Client[]> {
    return this.clientService.getClients();
  }

  @Post()
  createClient(@Body() newClient: createClientDto) {
    return this.clientService.createClient(newClient);
  }
}
