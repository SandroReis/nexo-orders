import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  products: { productId: number; quantity: number }[];

  @ApiProperty()
  clientId: number;
}
