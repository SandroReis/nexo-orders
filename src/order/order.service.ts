import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  ORDER_DICTIONARY = {
    canceled: 'CANCELED',
    concluded: 'CONCLUDED',
    pending: 'PENDING',
  };

  createOrder(body: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create({
      products: body.products,
      status: this.ORDER_DICTIONARY.pending,
    });

    return this.ordersRepository.save(newOrder);
  }
}
