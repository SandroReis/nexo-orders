import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}
  create(createClientDto: CreateClientDto): Promise<Client> {
    const newUser = this.clientsRepository.create(createClientDto);

    return this.clientsRepository.save(newUser);
  }

  find(id: number): Promise<Client> {
    try {
      return this.clientsRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
