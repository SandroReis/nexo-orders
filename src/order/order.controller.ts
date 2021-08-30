import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from 'src/client/client.service';
import { ProductService } from 'src/product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('api/order')
export class OrderController {
  constructor(
    private ordersService: OrderService,
    private productsService: ProductService,
    private clientService: ClientService,
  ) {}

  @ApiCreatedResponse({ type: Order })
  @Post()
  async createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    const { products, clientId } = body;
    // verify if products exists in Body
    if (!products?.length) {
      throw new BadRequestException('Your order has no products');
    }
    // verify if the client exists if not will throw an exception
    try {
      await this.clientService.find(clientId);
    } catch (error) {
      throw new NotFoundException('Client not Found');
    }

    // verify if all products exist and hasInventory
    try {
      const isValidProducts = await this.productsService.isAllProductsValid(
        products,
      );
      if (!isValidProducts)
        throw new UnprocessableEntityException(
          'Please verify your products, maybe they do not exist or not has sufficient inventory',
        );

      return this.ordersService.createOrder(body);
    } catch (error) {
      throw error;
    }
  }
}
